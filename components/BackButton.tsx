import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";

const BackButton = ({ onPress }: { onPress?: () => void }) => {
    const colorScheme = useColorScheme();

    if (!onPress) {
        onPress = () => {
            router.dismiss();
        }
    }

    return (
        <View style={{ backgroundColor: 'transparent' }}>
            <Ionicons name="chevron-back" size={24} color={Colors[colorScheme ?? "light"].text} onPress={onPress} />
        </View>
    )
}

export default BackButton