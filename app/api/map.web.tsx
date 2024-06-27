import { ThemedView } from "@/components/ThemedView";
import KakaoMap from "@/components/map/KakaoMap";
import { Stack, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Map() {
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

    return (
      <ThemedView style={{ flex: 1 }}>
        <KakaoMap />
      </ThemedView>
    );
}