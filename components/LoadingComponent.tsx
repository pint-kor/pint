import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingComponent() {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors[colorScheme].text} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})