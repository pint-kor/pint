import { RefObject, forwardRef } from "react";
import { Dimensions } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";

const EXPO_PUBLIC_PINT_MAP = process.env.EXPO_PUBLIC_PINT_MAP ?? ""

const KakaoWebView = forwardRef((props: { onMessage: (event: WebViewMessageEvent) => void}, ref: any) => {
    return (
        <WebView 
            originWhitelist={['*']}
            source={{ uri: EXPO_PUBLIC_PINT_MAP }}
            style={{
                flex: 1,
                position: "absolute",
                left: -10,
                top: -10,
                width: Dimensions.get("screen").width + 20,
                height: Dimensions.get("screen").height + 20,
              }}
            onMessage={props.onMessage} 
            ref={ref} 
        />
    )
})

export default KakaoWebView;