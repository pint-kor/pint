import React, { useEffect, useRef } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setMapCenterType, setMapLocation } from "@/lib/features/map";
import { setFocusId, toggleFocusId } from "@/lib/features/search";

export default function GoogleMaps() {
  const { searchKeyword, searchResult, focusId } = useSelector(
    (state: RootState) => state.search
  );
  const ref = useRef<MapView>(null);

  const {
    mapLatitude,
    mapLongitude,
    mapLatitudeDelta,
    mapLongitudeDelta,
    myLatitude,
    myLongitude,
    mapCenterType,
  } = useSelector((state: RootState) => state.map);

  const dispatch = useDispatch();

  const onRegionChange = (region: any) => {
    dispatch(setMapLocation({
        mapLatitude: region.latitude,
        mapLongitude: region.longitude,
        mapLatitudeDelta: region.latitudeDelta,
        mapLongitudeDelta: region.longitudeDelta,
    }))
    dispatch(setMapCenterType({
        mapCenterType: "mapLocation",
    }));
  }

  const onMarkerPress = (placeId: string) => {
    dispatch(toggleFocusId(placeId));
  }

  useEffect(() => {
    if (mapCenterType === "myLocation") {
        ref.current?.animateToRegion({
            latitude: myLatitude,
            longitude: myLongitude,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
        });
    }
  }, [mapCenterType])

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onRegionChange={onRegionChange} ref={ref} showsMyLocationButton>
        {searchResult.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.location.latitude,
              longitude: place.location.longitude,
            }}
            title={place.displayName.text}
            onPress={() => onMarkerPress(place.id)}
          />
        ))}
        <Marker coordinate={{
            latitude: myLatitude,
            longitude: myLongitude,
        }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
