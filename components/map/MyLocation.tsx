import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";

export default function MyLocation({ onPress }: { onPress: () => void }) {
    const colorScheme = useColorScheme() ?? "light";    

    return (
      <ThemedView style={styles.container}>
        <Pressable style={styles.button} onPress={onPress}>
            <FontAwesome6 name="location-arrow" size={20} color={Colors[colorScheme].text} />
        </Pressable>
      </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 10,
        borderRadius: 15,
    },
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
});