import BackButton from "@/components/BackButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { addRecentSearch, clearRecentSearch, removeRecentSearch } from "@/lib/features/user";
import { RootState } from "@/lib/store";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, NativeSyntheticEvent, Pressable, StyleSheet, TextInput, TextInputSubmitEditingEventData, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme() ?? "light";
    const { t } = useTranslation();
    const { history } = useSelector((state: RootState) => state.user)
    const reversedRecentSearch = useMemo(() => history.recentSearch.slice().reverse(), [history.recentSearch, history])

    const [search, setSearch] = useState<string>("")
    const textInput = useRef<TextInput>(null)

    const dispatch = useDispatch();

    const onSearch = useCallback(() => {
        onAddRecentSearch(search)
    }, [search])

    const onAddRecentSearch = useCallback((search: string) => {
        if (search === "") return
        dispatch(addRecentSearch(search))
    }, [dispatch])

    const onClearRecentSearch = useCallback(() => {
        dispatch(clearRecentSearch())
    }, [dispatch])

    const onRemoveRecentSearch = useCallback((index: number) => {
        dispatch(removeRecentSearch(index))
    }, [dispatch])

    useEffect(() => {
        textInput.current?.focus()
    }, [])

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

    return (
      <ThemedView style={{ flex: 1, paddingTop: insets.top, gap: 10 }}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
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
              onChangeText={setSearch}
              onSubmitEditing={onSearch}
            />
          </View>
        </View>
        {/* Recent Search */}
        {reversedRecentSearch.length !== 0 && (
          <View style={styles.recentSearchContainer}>
            {/* Recent Search Header */}
            <View style={styles.recentSearchHeader}>
              <ThemedText style={{ fontSize: 13, fontWeight: 700 }}>
                {t("search.recent")}
              </ThemedText>
              <Pressable onPress={onClearRecentSearch}>
                <ThemedText style={{ fontSize: 13, fontWeight: 400 }}>
                  {t("search.clear")}
                </ThemedText>
              </Pressable>
            </View>
            {/* Recent Search Tags */}
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.recentSearchTagContainer}>
                {reversedRecentSearch.map((item, index) => (
                  <View key={index} style={styles.recentSearchTag}>
                    <ThemedText
                      style={{ fontSize: 12, fontWeight: 200 }}
                      onPress={() => {
                        setSearch(item);
                        onAddRecentSearch(item);
                      }}
                    >
                      {item}
                    </ThemedText>
                    <Ionicons
                      name="close"
                      size={18}
                      color={Colors[colorScheme].text}
                      onPress={() =>
                        onRemoveRecentSearch(
                          reversedRecentSearch.length - index - 1
                        )
                      }
                    />
                  </View>
                ))}
              </View>
            </Animated.ScrollView>
          </View>
        )}
        {/* Search Recommend */}
        <View style={styles.recommendSearchContainer}>
          <ThemedText style={{ fontSize: 13, fontWeight: 700 }}>
            {t("search.recommend")}
          </ThemedText>
        </View>
      </ThemedView>
    );
}

