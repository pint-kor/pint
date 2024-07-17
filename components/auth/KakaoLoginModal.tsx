import WebView from "react-native-webview";
import { ThemedView } from "../ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { kakaoSignIn } from "@/lib/features/auth";
import { __development_login, loginUser, setUser, setUserState } from "@/lib/features/user";
import { router } from "expo-router";
import { AppDispatch, RootState } from "@/lib/store";

const REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI;
const PINT_BACKEND_URL = process.env.EXPO_PUBLIC_PINT_BACKEND_URL;

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function KakaoLoginModal({ uri }: { uri: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { state } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (state === "idle" && uri.length > 0) {
      bottomSheetRef.current?.expand(); 
    } else if (state === "succeeded" || state === "failed" || state === "loading") {
      bottomSheetRef.current?.close();
    }
  }, [state, uri])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["80%"]}
      index={-1}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {uri && <WebView
          style={{ flex: 1, width: "100%", height: "100%" }}
          originWhitelist={["*"]}
          source={{
            uri,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          // onLoadProgress={({ nativeEvent }) => console.log(nativeEvent)}
          onNavigationStateChange={({ url }) => {
            try {
              const code = url.split("code=")[1].split("&")[0];
              const state = url.split("state=")[1].split("&")[0];
              dispatch(setUserState("loading"));
  
              if (code && state) {
                axios
                  .get(
                    `${PINT_BACKEND_URL}/auth/kakao/callback?code=${code}&state=${state}`
                  )
                  .then(async (r) => {
                    const access_token = r.data.access_token;
                    await dispatch(
                      loginUser({
                        access_token,
                      })
                    );
                    dispatch(setUserState("succeeded"));
                  })
                  .catch(() => {
                    dispatch(setUserState("failed"));
                  })
              }
            } catch (e) {}
          }}
        />}
      </BottomSheetView>
    </BottomSheet>
  );
}
