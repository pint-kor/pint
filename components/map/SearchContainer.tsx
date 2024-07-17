import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Button, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import SearchFilter from "./SearchFilter";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { useCallback, useMemo, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useTranslation } from "react-i18next";
import { setIsOpenSearchModal } from "@/lib/features/search";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useRouter } from "expo-router";

export default function SearchContainer() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();
  const { focusId, searchKeyword } = useSelector(
    (state: RootState) => state.search
  );
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const onSearch = useCallback(() => {
    router.push("/search");
  }, [dispatch]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        searchBarContainer: {
          backgroundColor: Colors[colorScheme].background,
          padding: 10,
          borderRadius: 20,
          gap: 10,
          flexDirection: "row",
          alignItems: "center",
        },
      }),
    [colorScheme]
  );

  const top = useSharedValue(10 + insets.top);
  const opacity = useSharedValue(1);

  const pullUpSearchContainerStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
      opacity: withTiming(opacity.value, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  return (
    <>
      <Pressable style={styles.searchBarContainer} onPress={onSearch}>
        <Ionicons name="search" size={24} color={Colors[colorScheme].text} />
        <Text style={{ color: "gray" }}>
          {searchKeyword.length > 0 ? searchKeyword : t("map.search")}
        </Text>
      </Pressable>
      
    </>
  );
}
