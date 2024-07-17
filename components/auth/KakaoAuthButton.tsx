import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import KakaoLoginModal from "./KakaoLoginModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setUserState } from "@/lib/features/user";

const PINT_BACKEND_URL = process.env.EXPO_PUBLIC_PINT_BACKEND_URL

export default function KakaoAuthButton() { 
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const { state } = useSelector((state: RootState) => state.user)
  const [uri, setUri] = useState("");

  const onPress = async () => {
    try {
      const data = await axios.get(PINT_BACKEND_URL + "/auth/kakao/authorize")
      const url = data.data.authorization_url;
      setUri(url);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (state === 'succeeded') {
      router.replace('/')
      dispatch(setUserState("idle"))
    }
  }, [state])

  return (
    <>
      <Pressable onPress={onPress}>
        <ThemedText>Kakao Login</ThemedText>
      </Pressable>
      <KakaoLoginModal uri={uri} />
    </>
  );
}