import { fetchMyLocation } from "@/lib/features/map";
import { AppDispatch } from "@/lib/store";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useDispatch } from "react-redux";

export default function MiniMap() {
    const dispatch = useDispatch<AppDispatch>();
    const ref = useRef<MapView>(null);

    useEffect(() => {
        dispatch(fetchMyLocation()).unwrap().then((data) => {
            const { myLatitude, myLongitude } = data;
            ref.current?.animateToRegion({
                latitude: myLatitude,
                longitude: myLongitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
            });
        });
    }, [])

    const styles = StyleSheet.create({
        map: {
            width: "100%",
            height: 300,
        }
    })

    return (
        <MapView style={styles.map} ref={ref}>

        </MapView>
    )
}