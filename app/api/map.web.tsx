import { ThemedView } from "@/components/ThemedView";
import PintMap from "@/components/map/PintMap";
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
        <PintMap />
      </ThemedView>
    );
}