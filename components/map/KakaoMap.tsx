
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import * as Location from "expo-location";
import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { router, useFocusEffect } from "expo-router";
import { ThemedText } from "../ThemedText";
import SearchFilter, { CategoryCodes } from "./SearchFilter";

import MapBottomSheet from "./MapBottomSheet";
import KakaoIframe from "./KakaoIframe";
import { useColorScheme } from "@/hooks/useColorScheme";
import KakaoWebView from "./KakaoWebView";

const EXPO_PUBLIC_PINT_MAP = process.env.EXPO_PUBLIC_PINT_MAP ?? ""

export default function KakaoMap() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme() ?? 'light';

    const webView = useRef<WebView>(null);
    const iframeView = useRef<HTMLIFrameElement>(null);
    const [locationPermission, setLocationPermission] = useState(false);
    const [filters, setFilters] = useState<string[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<any>(null);
    
    /** 웹뷰 통신 */
    const postMessage = useCallback((message: string) => {
      if (Platform.OS !== 'web') {
        webView.current?.postMessage(message)
        return;
      }
      iframeView.current?.contentWindow?.postMessage(message, "*");
    }, [])

    // pint-map 과 통신
    const onMessage = useCallback((event: any) => {
      try {
        const { type, data } = event.nativeEvent != undefined ? JSON.parse(event.nativeEvent.data) : JSON.parse(event.data);
        console.log("HELLO")
        if (type === 'CLICK_MARKER') {
          setSelectedPlace(data);
        }
      } catch (e) {

      }
    }, [])

    useFocusEffect(React.useCallback(() => {
      if (Platform.OS !== 'web') return;
      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    }, []))

    // 현재 위치로 이동
    const onCurrentLocation = useCallback(async () => {
      if (!locationPermission) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        setLocationPermission(true);
      }

      let location = await Location.getLastKnownPositionAsync();

      if (!location) {
        location = await Location.getCurrentPositionAsync({});
      }

      const stringfied = JSON.stringify({
        type: 'CURRENT_LOCATION',
        data: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }
      })
      
      postMessage(stringfied);
    }, [locationPermission]);

    // 카테고리로 검색
    const onCategorySearch = useCallback(() => {
      const codes = [];

      for (const filter of filters) {
        const category: string = CategoryCodes[filter];
        
        if (!category) {
          continue;
        }

        codes.push(category);
      }

      const stringfied = JSON.stringify({
        type: 'CATEGORY_SEARCH',
        data: {
          categories: codes,
          radius: 5000,
        }
      })

      postMessage(stringfied);
    }, [filters])

    const onSearch = useCallback(() => {
      router.push("/search")
    }, [])

    const styles = useMemo(() => StyleSheet.create({
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
      searchContainer: {
        position: 'absolute',
        flexDirection: 'column',
        top: 10 + insets.top,
        left: 20,
        zIndex: 100,
        width: Dimensions.get('window').width - 40,
        gap: 10
      },
      searchBarContainer: {
        backgroundColor: Colors[colorScheme].background,
        padding: 10,
        borderRadius: 20,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      searchFilterContainer: {
        flexDirection: 'row',
        gap: 8,
        padding: 0,
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
        flexDirection: 'row',
        alignItems: "center",
      }
    }), [colorScheme]);

    return (
      <View style={{ flex: 1, }}>
        <View style={{ flex: 1 }}>
          {/* Search Component */}
          <View style={styles.searchContainer}>
            {/* Search Bar */}
            <Pressable style={styles.searchBarContainer} onPress={onSearch}>
              <Ionicons
                name="search"
                size={24}
                color={Colors[colorScheme].text}
              />
              <Text style={{ color: "gray" }}>{t("map.search")}</Text>
            </Pressable>
            {/* Search Filter */}
            <SearchFilter filters={filters} setFilter={setFilters} />
            {/* Search At Current Location */}
            <Pressable style={styles.searchAtCurrentLocationContainer} onPress={onCategorySearch}>
              <View style={styles.centeredView}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={14}
                  color={Colors[colorScheme].text}
                />
                <ThemedText style={{ fontSize: 10, fontWeight: 800 }}>
                  {t("map.searchAtCurrentLocation")}
                </ThemedText>
              </View>
            </Pressable>
          </View>
          {/* Current Location Component */}
          <Pressable onPress={onCurrentLocation} style={styles.currentLocation}>
            <FontAwesome6
              name="location-arrow"
              size={24}
              color={Colors[colorScheme].text}
            />
          </Pressable>
          {/* Kakao Map */}
          {Platform.OS === 'web' && <KakaoIframe ref={iframeView} />}
          {Platform.OS !== 'web' && <KakaoWebView onMessage={onMessage} ref={webView} />}
        </View>
        {selectedPlace && <MapBottomSheet place={selectedPlace} setPlace={setSelectedPlace} />}
      </View>
    );
}

