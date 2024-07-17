import { fetchMyLocation } from "@/lib/features/map";
import { AppDispatch } from "@/lib/store";
import { useFocusEffect } from "expo-router";
import React, { RefObject, useCallback } from "react";
import { Platform } from "react-native";
import WebView from "react-native-webview";
import { useDispatch } from "react-redux";

/**
 * 
 * @param webView 모바일에서 사용할 웹일
 * @param iframeView 웹에서 사용할 iframe
 * @param onMessage 메세지를 받을 함수 
 * @returns 
 */
export default function usePostMessage(webView: RefObject<WebView>, iframeView: RefObject<HTMLIFrameElement>, onMessage: (event: any) => void) {
    useFocusEffect(React.useCallback(() => {
        if (Platform.OS !== 'web') return;
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []))

    const postMessage = React.useCallback((message: string) => {
        if (Platform.OS !== 'web') {
            webView.current?.postMessage(message);
            return;
        }
        iframeView.current?.contentWindow?.postMessage(message, "*");
    }, []);

    const highlightSelectedPlace = useCallback((places: any[], placeId: string) => {
        const stringfied = JSON.stringify({
            type: 'HIGHLIGHT_SELECTED_PLACE',
            data: {
                places,
                placeId,
            }
        })

        postMessage(stringfied);
    }, [postMessage])

    const focusCurrentLocation = useCallback((lat: number, lng: number) => {
        const stringfied = JSON.stringify({
            type: 'CURRENT_LOCATION',
            data: {
                lat,
                lng,
            }
        })

        postMessage(stringfied);
    }, [postMessage])

    return {
        highlightSelectedPlace,   
        focusCurrentLocation,
    }
}
