import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonProps, Image, Pressable, PressableProps, StyleProp, StyleSheet, View, ViewProps } from "react-native";

export default function ProfileCircle({
    style,
    ...props
}: PressableProps & { style?: StyleProp<ViewProps> }) {
    return (
        <Pressable style={[styles.circle, style]} {...props}>
            <Ionicons name="person" size={60} color="#ffffff" />
        </Pressable> 
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#f1f1f1",
        borderColor: "#000",
        borderWidth: 5,
        justifyContent: "center",
        alignItems: "center",
    }
})