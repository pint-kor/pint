import BackButton from "@/components/BackButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import KakaoIframe from "@/components/map/KakaoIframe";
import KakaoWebView from "@/components/map/KakaoWebView";
import RecentSearch from "@/components/search/RecentSearch";
import SearchResultContainer from "@/components/search/SearchResultContainer";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { addRecentSearch } from "@/lib/features/user";
import { RootState } from "@/lib/store";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useDebounceCallback } from "usehooks-ts";

const Search = React.memo(() => {
    const textInput = useRef<TextInput>(null)
    const mapRef = useRef<any>(null);
    const webViewRef = useRef<any>(null);

    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme() ?? "light"
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { history, user } = useSelector((state: RootState) => state.user)
    const reversedRecentSearch = useMemo(() => history.recentSearch.slice().reverse(), [history.recentSearch, history])

    const [search, setSearch] = useState<string>("")
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<any[]>([])

    if (!user) {
      return <Redirect href="/login" />
    }

    const onChangeText = useCallback((text: string) => {
      setSearch(text)
      postApi(text)
    }, [])

    const postApi = useDebounceCallback(useCallback((search: string) => {
        if (search === "") return
        
        const stringfied = JSON.stringify({ type: "KEYWORD_SEARCH", data: {
          keyword: search
        }})

        postMessage(stringfied)
    }, []), 500)

    const onAddRecentSearch = useCallback((search: string) => {
      if (search === "") return
      dispatch(addRecentSearch(search))
  }, [dispatch])

    const styles = useMemo(() => {
        return StyleSheet.create({
            header: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
                gap: 10
            },
            headerSearch: {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: Colors[colorScheme].subBackground,
                padding: 10,
                borderRadius: 20,
                flex: 1
            },
            recentSearchContainer: {
                flexDirection: "column",
                justifyContent: "center",
                paddingHorizontal: 20,
                gap: 10,
            },
            recentSearchHeader: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            },
            recentSearchTagContainer: {
                flexDirection: "row",
                gap: 10,
            },
            recentSearchTag: {
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderWidth: 1,
                borderColor: Colors[colorScheme].subBackground,
                borderRadius: 20,
                paddingHorizontal: 10,
            },
            recommendSearchContainer: {
                flexDirection: "column",
                justifyContent: "center",
                paddingHorizontal: 20,
                gap: 10,
            }
        })
    }, [colorScheme])

    const postMessage = useCallback((message: string) => {
      if (Platform.OS !== 'web') {
        webViewRef.current?.postMessage(message);
        return;
      }
      mapRef.current?.contentWindow.postMessage(message, "*");
    }, [])

    const onMessage = useCallback((event: any) => {
      try {
        const { type, data } = event.nativeEvent != undefined ? JSON.parse(event.nativeEvent.data) : JSON.parse(event.data);
        // console.log(type, data)
        if (type === "SEARCH_RESULT") {
          setSearchResult(data);
        }
      } catch (e) {

      }
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        textInput.current?.focus()
        if (Platform.OS !== 'web') return;
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
      }, [])
    )

    return (
      <ThemedView style={{ flex: 1, paddingTop: insets.top, gap: 10 }}>
        {/* Map */}
        <View style={{ display: "none" }}>
          {Platform.OS === "web" && <KakaoIframe ref={mapRef} />}
          {Platform.OS !== "web" && (
            <KakaoWebView onMessage={onMessage} ref={webViewRef} />
          )}
        </View>
        {/* Header */}
        <View style={styles.header}>
          {search.length === 0 ? (
            <BackButton />
          ) : (
            <BackButton onPress={() => setSearch("")} />
          )}
          <View style={styles.headerSearch}>
            <Ionicons
              name="search"
              size={24}
              color={Colors[colorScheme].text}
            />
            <TextInput
              ref={textInput}
              placeholder={t("map.search")}
              style={{
                marginLeft: 10,
                flex: 1,
                color: Colors[colorScheme].text,
              }}
              value={search}
              onChangeText={onChangeText}
              onBlur={() => onAddRecentSearch(search)}
            />
          </View>
        </View>
        {/* Recent Search */}
        {/* Search Recommend */}
        {search === "" ? (
          <>
            <RecentSearch search={search} setSearch={onChangeText} />
            <View style={styles.recommendSearchContainer}>
              <ThemedText style={{ fontSize: 13, fontWeight: 700 }}>
                {t("search.recommend")}
              </ThemedText>
            </View>
          </>
        ) : (
          <SearchResultContainer searchResult={searchResult} />
        )}
      </ThemedView>
    );
})

export default Search;