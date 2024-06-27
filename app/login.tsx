import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import KakaoLoginPage from "@/components/auth/KakaoLoginPage";
import { __development_login } from "@/lib/features/user";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function Login() {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const [kakaoModal, setKakaoModal] = useState(false);

    const devLogin = () => {
        dispatch(__development_login());
        router.replace("/")
    }

    const kakaoLogin = () => {
        
    }

    return (
        <ThemedView style={{flex: 1, paddingTop: insets.top, alignItems: 'center', justifyContent: 'center'}}>
            <Pressable onPress={devLogin}>
                <ThemedText type="title">임시 로그인</ThemedText>
            </Pressable>
            {/* <Pressable onPress={() => setKakaoModal(true)}>
                <ThemedText type="title">Kakao Login</ThemedText>
            </Pressable>
            {kakaoModal && <KakaoLoginPage />} */}
        </ThemedView>
    )
}