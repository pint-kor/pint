import { useMemo } from "react"
import { StyleSheet, View } from "react-native"
import { ThemedText } from "../ThemedText"

export default function PlanTitle({ icon, title }: {
    icon: React.ReactNode,
    title: string
}) {

    const styles = useMemo(() => StyleSheet.create({
        title: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
        },
    }), [])

    return (
        <View style={styles.title}>
            {icon}
            <ThemedText type="subtitle">{title}</ThemedText>
        </View>    
    )

}