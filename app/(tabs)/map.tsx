import KakaoMap from "@/components/map/KakaoMap";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RootState } from "@/lib/store";
import { Redirect } from "expo-router";
import { useState } from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";

export default function ExploreScreen() {
    const user = useSelector((state: RootState) => state.user.user);

    if (!user) {
        return (
            <Redirect href="/login" />
        )
    }
    
    return (
      <ThemedView style={{ flex: 1, }}>
        <KakaoMap />
      </ThemedView>
    );
}