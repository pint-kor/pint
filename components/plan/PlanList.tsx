import { useMemo } from "react"
import { StyleSheet, View } from "react-native"

export default function PlanList({ children }: { children: React.ReactNode }) {

    const styles = useMemo(() => StyleSheet.create({
        list: {
            marginTop: 30,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
        }
    }), [])

    return (
        <View style={styles.list}>
            {children}
        </View>
    )
}