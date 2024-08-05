import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { uploadPost } from "@/lib/features/post";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function PostApplyButton() {
    const { t } = useTranslation();
    const colorScheme = useColorScheme() ?? "light";
    const insets = useSafeAreaInsets();
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleUploadPost = () => {
      dispatch(uploadPost())
    }

    const styles = useMemo(() => StyleSheet.create({
        container: {
            padding: 20,
            backgroundColor: Colors[colorScheme].text,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            marginBottom: insets.bottom,
            marginHorizontal: 20,
            opacity: isHovered ? 0.8 : 1
        },
        text: {
            color: Colors[colorScheme].background
        }
    }), [colorScheme, isHovered])

    return (
      <Pressable
        style={styles.container}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onPress={() => router.push("/post-preview")}
      >
        <Text style={styles.text}>{t("post.apply")}</Text>
      </Pressable>
    );
}