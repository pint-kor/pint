import LoadingComponent from "@/components/LoadingComponent";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DevAuthButton from "@/components/auth/DevAuthButton";
import KakaoAuthButton from "@/components/auth/KakaoAuthButton";
import KakaoLoginPage from "@/components/auth/KakaoLoginModal";
import { __development_login } from "@/lib/features/user";
import { RootState } from "@/lib/store";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { state } = useSelector((state: RootState) => state.user)
    const [kakaoModal, setKakaoModal] = useState(false);

    const devLogin = () => {
        dispatch(__development_login());
        router.replace("/")
    }

    const kakaoLogin = () => {
        
    }

    return (
        <ThemedView style={{flex: 1, paddingTop: insets.top, alignItems: 'center', justifyContent: 'center'}}>
            {state === "loading" && <LoadingComponent />}
            <DevAuthButton />
            <KakaoAuthButton />
            {/* <Pressable onPress={() => setKakaoModal(true)}>
                <ThemedText type="title">Kakao Login</ThemedText>
            </Pressable>
            {kakaoModal && <KakaoLoginPage />} */}
        </ThemedView>
    )
}