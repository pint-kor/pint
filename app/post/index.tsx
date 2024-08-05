import BackButton from "@/components/BackButton";
import PostTextField from "@/components/blog/PostTextField";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { initializeCurrentPost, setCurrentPostContent } from "@/lib/features/post";
import PostPhoto from "@/components/blog/PostPhoto";
import PostApplyButton from "@/components/blog/PostApplyButton";
import PostVisitDate from "@/components/blog/PostVisitDate";
import PostVisitPlace from "@/components/blog/PostVisitPlace";

export default function PostScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";
    const [active, setActive] = useState(false);
    const { currentPost: { content } } = useSelector((state: RootState) => state.post)
    const dispatch = useDispatch();
    const textInputRef = useRef<TextInput>(null);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => <BackButton onPress={() => {
              router.back()
              dispatch(initializeCurrentPost())
            }} />,
            headerTitle: "",
            headerStyle: {
                backgroundColor: Colors[colorScheme].background,
            }
        })
    }, [])

    useEffect(() => {
      if (active) {
        textInputRef.current?.focus();
      }
    }, [active])

    const handleChangeText = (text: string) => {
      dispatch(setCurrentPostContent(text));
    }

    const styles = StyleSheet.create({
      container: {
        backgroundColor: "red",
      },
      textInput: {
        width: "90%",
        height: "70%",
        // flex: 1,
        marginTop: 20,
        color: Colors[colorScheme].text,
        // backgroundColor: 'red',
        
      },
      textInputBtn: {
        // bottom: insets.bottom + 70,
        top: 15,
        height: 50,
        borderRadius: 50,
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      },
    });

    return (
      <>
        {active && (
          <KeyboardAvoidingView
            style={{ flex: 1, }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ThemedView
              style={{
                flexDirection: "column",
                height: Dimensions.get("window").height,
                flex: 1,
                alignItems: "center",
              }}
            >
              <TextInput
                multiline
                placeholder="test" 
                style={styles.textInput}
                ref={textInputRef}
                value={content}
                onChangeText={handleChangeText}
                onBlur={() => setActive(false)}
              />
              <Pressable
                style={styles.textInputBtn}
                onPress={() => setActive(false)}
              >
                <Text>완료</Text>
              </Pressable>
            </ThemedView>
          </KeyboardAvoidingView>
        )}
        {!active && (
          <ThemedView style={{ flex: 1 }}>
            <PostTextField setActive={setActive} />
            <HorizontalBar />
            <PostPhoto />
            <PostVisitPlace />
            <PostVisitDate />
            <PostApplyButton />
          </ThemedView>
        )}
      </>
    );

}

function HorizontalBar() {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <View style={{ height: 10, width: '100%', backgroundColor: Colors[colorScheme].subBackground }} />
    )
}