import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import KakaoMapWeb from "@/components/map/KakaoMapWeb";
import { useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
    const insets = useSafeAreaInsets();

    return (
        <ThemedView style={{ flex: 1, paddingTop: insets.top}}>
            <iframe src="http://localhost:3000" style={{
                width: "100%",
                height: "100%",
                border: "none"
            }} sandbox="allow-scripts" />
        </ThemedView>
    );
}