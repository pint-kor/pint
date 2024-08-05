import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RootState } from "@/lib/store";
import { useMemo, useState } from "react";
import { TextInput, StyleSheet, Button, Pressable, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Dimensions, View } from "react-native";
import { useSelector } from "react-redux";

export default function PostTextField({ setActive }: { setActive: (active: boolean) => void }) {
    const colorScheme = useColorScheme() ?? "light";
    const { currentPost: { content }} = useSelector((state: RootState) => state.post)

    const styles = useMemo(() => StyleSheet.create({
        textInput: {
            color: Colors[colorScheme].text,
            width: "90%",
            height: 100,
            marginTop: 20,
        }
    }), [colorScheme])

    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          editable
          multiline
          placeholder="test"
          style={styles.textInput}
          value={content}
          onFocus={() => setActive(true)}
        />
      </View>
    );

    
}