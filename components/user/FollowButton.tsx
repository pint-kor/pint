import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import * as Haptics from 'expo-haptics'

export default function FollowButton({
    userId,
    isFollowing = false,
}: {
    userId?: string;
    isFollowing?: boolean;
}) {
    const colorScheme = useColorScheme() ?? "light";
    const handlePress = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }

    const styles = useMemo(() => StyleSheet.create({
        container: {
            backgroundColor: Colors[colorScheme].text,
            padding: 10,
            borderRadius: 20,
        },
        text: {
            color: Colors[colorScheme].background,
            fontWeight: '600',
        }
    }), [colorScheme])

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <Text style={styles.text}>Follow</Text>
        </Pressable>
    )
}