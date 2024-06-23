import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Recommend() {
    const theme = useColorScheme() ?? 'light';
    const color = useThemeColor({ dark: '#f5f9ff', light: '#242424' }, 'background');
    
    return (
        <Pressable style={[styles.button, { backgroundColor: color }]}>
            <FontAwesome name="magic" size={24} color={theme === "dark" ? "black" : "white"} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 20,
        position: 'absolute',
        bottom: 20,
        right: 20
    }
})