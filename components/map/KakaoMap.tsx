
import { useCallback, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import WebView from "react-native-webview";
import * as Location from "expo-location";
import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { ThemedText } from "../ThemedText";

const EXPO_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY = process.env.EXPO_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY

const html = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${EXPO_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY}"></script> 
    </head>
    <body>
        <div id="map" style="width:100vw;height:100vh;"></div>    

        <script type="text/javascript">
          const container = document.getElementById('map');
          const options = { //지도를 생성할 때 필요한 기본 옵션
              center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
              level: 3 //지도의 레벨(확대, 축소 정도)
          };
          var map = new kakao.maps.Map(container, options);
          const geocoder = new kakao.maps.services.Geocoder();
        </script>
    </body>
</html>   
`;

const runFirst = `
  alert("hello world")

  const listener = (event) => {
    const { data, type } = JSON.parse(event.data);

    switch (type) {
      case 'test': {
        console.log('test', data);
        break;
      }
      case 'CURRENT_LOCATION': {
        const { latitude, longitude } = data;
        
        const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
        map.panTo(moveLatLon)

        break;
      }
    }
  }

  /** android */
  document.addEventListener('message', listener);
  
  /** ios */
  window.addEventListener('message', listener);
`;

export default function KakaoMap() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme() ?? 'light';
    const webView = useRef<WebView>(null);
    const [locationPermission, setLocationPermission] = useState(false);

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

      webView.current?.postMessage(
        JSON.stringify({
          type: 'CURRENT_LOCATION',
          data: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
        })
      )
    }, [locationPermission]);

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
        width: Dimensions.get('screen').width - 40,
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
        gap: 10,
        padding: 5,
        // zIndex: 100,
        alignItems: 'center',
      }
    }), [colorScheme]);

    return (
      <View style={{ flex: 1 }}>
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
            <Animated.ScrollView horizontal>
              <View style={styles.searchFilterContainer}>
                <FilterTag isMenu title={t("map.filter.title")} />
                <FilterTag title={t("map.filter.cafe")} />
                <FilterTag title={t("map.filter.restaurant")} />
                <FilterTag title={t("map.filter.accomodation")} />
                <FilterTag title={t("map.filter.attraction")} />
                <FilterTag title={t("map.filter.shopping")} />
                <FilterTag title={t("map.filter.culture")} />
                <FilterTag title={t("map.filter.bar")} />
              </View>
            </Animated.ScrollView>
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
          <WebView
            originWhitelist={["*"]}
            source={{ html: html }}
            style={{
              flex: 1,
              position: "absolute",
              left: -10,
              top: -10,
              width: Dimensions.get("screen").width + 20,
              height: Dimensions.get("screen").height + 20,
            }}
            onMessage={({ nativeEvent }) => {
              const { type, data } = JSON.parse(nativeEvent.data);
              console.log(type, data);
            }}
            ref={webView}
            injectedJavaScript={runFirst}
          />
        </View>
      </View>
    );
}

function FilterTag({ title, onPress, isMenu=false }: { title: string, onPress?: () => void, isMenu?: boolean }) {
  const color = useColorScheme() ?? 'light';

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 1,
      backgroundColor: Colors[color].background,
      borderRadius: 20,
      alignItems: 'center',
    }
  }), [color]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {isMenu && <FontAwesome5 name="filter" size={16} color={Colors[color].text} />}
      <ThemedText style={{fontSize: 12, fontWeight: 800}}>{title}</ThemedText>
    </Pressable>
  )
}

