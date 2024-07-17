import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMemo } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

export default function PostTextField() {
    const colorScheme = useColorScheme() ?? "light";

    const styles = useMemo(() => StyleSheet.create({
        textInput: {
            color: Colors[colorScheme].text,
            height: 200,
        }
    }), [colorScheme])

    return (
        <View style={{paddingHorizontal: 15 }}>
            <TextInput 
                editable
                multiline
                placeholder="test"
                style={styles.textInput}
            />
            <Button title="hi" color="white" />
        </View>
    )
}