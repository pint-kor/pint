import BackButton from "@/components/BackButton";
import PostSetting from "@/components/blog/PostSetting";
import PostTextField from "@/components/blog/PostTextField";
import TextField from "@/components/blog/PostTextField";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => <BackButton onPress={() => router.back()} />,
            headerTitle: "",
            headerStyle: {
                backgroundColor: Colors[colorScheme].background,
            }
        })
    }, [])

    return (
        <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
            <PostTextField />
            <HorizontalBar />
            <PostSetting title="공간 추가" />
            <PostSetting title="공간 추가" />
            <PostSetting title="공간 추가" />
        </ThemedView>
    )
}

function HorizontalBar() {
    const colorScheme = useColorScheme() ?? "light";

    return (
        <View style={{ height: 20, width: '100%', backgroundColor: Colors[colorScheme].subBackground }} />
    )
}