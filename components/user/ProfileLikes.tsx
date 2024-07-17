import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default function ProfileLikes() {

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: Dimensions.get("screen").width - 40,
        }
    }), [])

    return (
        <View style={styles.container}>
            <Ionicons name="heart" size={24} color="white" />
        </View>
    )
}