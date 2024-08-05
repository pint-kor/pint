import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PlanButton({ text, onPress } : {text : string, onPress?: () => void}) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        backgroundColor: 'darkgreen',
        paddingVertical: 15,
        paddingHorizontal: 50,
    },
    text: {
        color: 'white',
        fontSize: 20,
    }
})