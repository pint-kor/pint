
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import PlaceModal from "./PlaceModal";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchMyLocation, setMapCenterType } from "@/lib/features/map";
import SearchContainer from "./SearchContainer";
import FilterModal from "./FilterModal";
import SearchFilter from "./SearchFilter";
import SearchAtCurrentLocation from "./SearchAtCurrentLocation";
import MyLocation from "./MyLocation";
import GoogleMaps from "./GoogleMaps";

const EXPO_PUBLIC_PINT_MAP = process.env.EXPO_PUBLIC_PINT_MAP ?? ""

const PintMap = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme() ?? 'light';
    const [selectedPlace, setSelectedPlace] = useState<any>(null);

    const { searchKeyword, searchResult, focusId, isOpenSearchModal, isOpenFilterModal } = useSelector((state: RootState) => state.search);

    useEffect(() => {
      if (focusId) {
        setSelectedPlace(searchResult.find((place) => place.id === focusId))
      } else {
        setSelectedPlace(null)
      }
    }, [focusId, searchResult]);

    // 현재 위치로 이동
    const onCurrentLocation = useCallback(async () => {
      await dispatch(fetchMyLocation()).unwrap()
      dispatch(setMapCenterType({
        mapCenterType: "myLocation"
      }))
    }, []);

    const styles = useMemo(() => StyleSheet.create({
      searchContainer: {
        position: "absolute",
        flexDirection: "column",
        top: 10 + insets.top,
        left: 20,
        zIndex: 2,
        width: Dimensions.get("window").width - 40,
        gap: 10,
      },
      currentLocation: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors[colorScheme].background,
        padding: 10,
        borderRadius: 10,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
      searchAtCurrentLocationContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
      centeredView: {
        backgroundColor: Colors[colorScheme].background,
        borderRadius: 20,
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 2,
        flexDirection: "row",
        alignItems: "center",
      },
    }), [colorScheme]);

    return (
      <>
        {/* Search Modal */}
        {/* {isOpenSearchModal && <ModalSearch />} */}
        <View style={styles.searchContainer}>
          <SearchContainer />
          <SearchFilter />
          {searchKeyword.length > 0 && <SearchAtCurrentLocation />}
        </View>
        <View style={{ flex: 1 }}>
          <GoogleMaps />
        </View>
        {selectedPlace && (
          <PlaceModal place={selectedPlace} setPlace={setSelectedPlace} />
        )}
        <MyLocation onPress={onCurrentLocation} />
        <FilterModal />
      </>
    );
})

export default PintMap;

