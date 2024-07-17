import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function PostSetting({ title, description }: {
    title: string;
    description?: string;
}) {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 }}>
            <ThemedText type="defaultSemiBold">{title}</ThemedText>
            <Ionicons name="chevron-forward" size={24} color={colorScheme === "light" ? "black" : "white"} />
        </View>
    )
}