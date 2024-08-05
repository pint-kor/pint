import { Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import KakaoLoginModal from "./KakaoLoginModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { loginUser, setUserState } from "@/lib/features/user";

const PINT_BACKEND_URL = process.env.EXPO_PUBLIC_PINT_BACKEND_URL

export default function DevAuthButton() { 
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const { state } = useSelector((state: RootState) => state.user)

  const onPress = async () => {
    try {
      await dispatch(loginUser({
        username: "admin@pint.com",
        password: "pintadmin"
      }))      
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
        <ThemedText>DEV LOGIN</ThemedText>
      </Pressable>
    </>
  );
}