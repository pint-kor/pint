import WebView from "react-native-webview";
import { ThemedView } from "../ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";
import { kakaoSignIn } from "@/lib/features/auth";
import { __development_login, setUser } from "@/lib/features/user";
import { router } from "expo-router";

const REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI;

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function KakaoLoginPage() {
  const dispatch = useDispatch();

  const getCode = (target: any) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      console.log("requestCode : " + requestCode)
      requestToken(requestCode);
    }
  };

  const requestToken = async (code: string) => {
    let access_token = "none";
    axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      params: {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        // redirect_uri: REDIRECT_URI,
        code: code,
      },
    })
      .then((response) => {
        access_token = response.data.access_token;

        console.log(access_token);

        axios({
          method: "GET",
          url: "https://kapi.kakao.com/v2/user/me?property_keys=[\"kakao_account.profile\"]",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }).then((response) => {
          console.log(response.data);
          const kakaoProfile = response.data.kakao_account.profile
          dispatch(setUser({ username: kakaoProfile.nickname }))
          router.replace("/")
          
        }).catch((error) => {
          console.log(error);
        });

        // dispatch(kakaoSignIn({ access_token }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={(index) => console.log("index", index)}
      snapPoints={["80%"]}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1, width: "100%", height: "100%" }}
          originWhitelist={["*"]}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={(event) => {
            const data = event.nativeEvent.url;
            getCode(data);
          }}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
