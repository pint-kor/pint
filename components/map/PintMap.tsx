
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Platform, Pressable, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import PlaceModal from "./PlaceModal";
import KakaoIframe from "./KakaoIframe";
import { useColorScheme } from "@/hooks/useColorScheme";
import KakaoWebView from "./KakaoWebView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchMyLocation, setMapCenterType, setMapLocation } from "@/lib/features/map";
import usePostMessage from "@/hooks/usePostMessage";
import { ModalSearch } from "../search/Search";
import { setFocusId, toggleFocusId } from "@/lib/features/search";
import SearchContainer from "./SearchContainer";
import FilterModal from "./FilterModal";
import SearchFilter from "./SearchFilter";
import { ThemedText } from "../ThemedText";
import SearchAtCurrentLocation from "./SearchAtCurrentLocation";
import MyLocation from "./MyLocation";
import GoogleMaps from "./GoogleMaps";

const EXPO_PUBLIC_PINT_MAP = process.env.EXPO_PUBLIC_PINT_MAP ?? ""

const PintMap = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme() ?? 'light';

    const webView = useRef<WebView>(null);
    const iframeView = useRef<HTMLIFrameElement>(null);
    
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
          {/* {Platform.OS === "web" && <KakaoIframe ref={iframeView} />}
          {Platform.OS !== "web" && (
            <KakaoWebView onMessage={onMessage} ref={webView} />
          )} */}
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

