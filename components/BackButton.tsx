import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, useColorScheme } from "react-native";

const BackButton = () => {
    const colorScheme = useColorScheme();

    const onPress = () => {
        router.dismiss();
    }

    return (
        <View style={{ backgroundColor: 'transparent' }}>
            <Ionicons name="chevron-back" size={24} color={Colors[colorScheme ?? "light"].text} onPress={onPress} />
        </View>
    )
}

export default BackButton