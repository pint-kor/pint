import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { loginUser } from "@/lib/features/user";
import { AppDispatch } from "@/lib/store";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";

export default function AuthKakaoResultPage() {
    const location = useLocalSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        axios
          .get(
            `http://localhost:8000/auth/kakao/callback?code=${location.code}&state=${location.state}`
          )
          .then(async (r) => {
            const access_token = r.data.access_token;
            await dispatch(
              loginUser({
                access_token,
              })
            );
            router.replace('/')
          });
    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>RESULT</Text>
        </View>
    )
}