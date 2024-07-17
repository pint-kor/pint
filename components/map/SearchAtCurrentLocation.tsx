import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { searchWithProperties, setCenter, setSearchResult } from "@/lib/features/search";

export default function SearchAtCurrentLocation() {
    const colorScheme = useColorScheme() ?? "light";
    const dispatch = useDispatch<AppDispatch>();

    const onPress = () => {
        dispatch(setCenter("map"))
        dispatch(setSearchResult([]))
        dispatch(searchWithProperties())
    }

    const styles = useMemo(() => StyleSheet.create({
        container: {
            justifyContent: 'center',
            flexDirection: 'row',
        },
        button: {
            backgroundColor: Colors[colorScheme].background,
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
        }
    }), [colorScheme])

    return (
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={onPress}>
          <ThemedText style={{ fontSize: 15, fontWeight: 800 }}>지도 중심에서 검색</ThemedText>
        </Pressable>
      </View>
    );
}