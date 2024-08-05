import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "../ThemedView";

export default function PlanContainer({ children }: { children: React.ReactNode }) {
    const insets = useSafeAreaInsets();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            paddingTop: insets.top + 5,
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
        }
    }), [])

    return (
        <ThemedView style={styles.container}>
            {children}
        </ThemedView>
    )
}