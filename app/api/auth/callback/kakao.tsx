import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function AuthKakaoResultPage() {
    return (
        <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ThemedText>RESULT</ThemedText>
        </ThemedView>
    )
}