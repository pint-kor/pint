import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RootState } from "@/lib/store";
import { useCallback, useMemo } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { addRecentSearch, clearRecentSearch, removeRecentSearch } from "@/lib/features/user";

export default function RecentSearch({ search, setSearch }: { search: string, setSearch: (search: string) => void}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const colorScheme = useColorScheme() ?? "light";
    const { history } = useSelector((state: RootState) => state.user);
    const reversedRecentSearch = useMemo(() => history.recentSearch.slice().reverse(), [history.recentSearch, history])

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

    const styles = useMemo(() => {
        return StyleSheet.create({
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

    if (reversedRecentSearch.length === 0) {
        return null
    }

    return (
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
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
    );
}