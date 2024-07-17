import BackButton from "@/components/BackButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RecentSearch from "@/components/search/RecentSearch";
import SearchResultContainer from "@/components/search/SearchResultContainer";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { initializeSearch, searchWithProperties, setCenter, setIsOpenSearchModal, setSearchProperties, setSort } from "@/lib/features/search";
import { addRecentSearch } from "@/lib/features/user";
import { AppDispatch, RootState } from "@/lib/store";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useDebounceCallback } from "usehooks-ts";
import SearchOption from "./SearchOption";

const Search = React.memo(() => {
    const textInput = useRef<TextInput>(null)

    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme() ?? "light"
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    const { history, user } = useSelector((state: RootState) => state.user)
    const reversedRecentSearch = useMemo(() => history.recentSearch.slice().reverse(), [history.recentSearch, history])

    const { searchResult, searchKeyword, sort, center } = useSelector((state: RootState) => state.search)
    const [search, setSearch] = useState<string>(searchKeyword)
    const [isOpenSearchOption, setIsOpenSearchOption] = useState<boolean>(false)

    if (!user) {
      return <Redirect href="/login" />
    }

    const onChangeText = useCallback((text: string) => {
      setSearch(text)
      postApi(text)
    }, [])

    const postApi = useDebounceCallback(useCallback(async (search: string) => {
        if (search === "") return
        dispatch(setSearchProperties({
          searchKeyword: search,
          searchType: "keyword"
        }))
        dispatch(searchWithProperties())
    }, []), 500)

    const onAddRecentSearch = useCallback((search: string) => {
      if (search === "") return
      dispatch(addRecentSearch(search))
  }, [dispatch])

    const onInitialize = useCallback(() => {
      dispatch(initializeSearch())
    }, [dispatch])

    const styles = useMemo(() => {
        return StyleSheet.create({
            header: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 10,
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
            },
            
        })
    }, [colorScheme])

    return (
      <>
        <ThemedView style={{ flex: 1, paddingTop: insets.top, gap: 10 }}>
          <View style={styles.header}>
            {search.length === 0 ? (
              <BackButton
                onPress={() => {
                  router.back();
                }}
              />
            ) : (
              <BackButton
                onPress={() => {
                  setSearch("");
                  onInitialize();
                }}
              />
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
            <>
              {/* Search Option */}
              <SearchOption />
              {/* Search Result */}
              <SearchResultContainer />
            </>
          )}
        </ThemedView>
        {/* {isOpenSearchOption && (
          <SearchOption setIsOpenSearchOption={setIsOpenSearchOption} />
        )} */}
      </>
    );
})

export const ModalSearch = () => {
    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 5,
          width: "100%",
          height: "100%",
        }}
      >
        <Search />
      </View>
    );
}

export default Search;