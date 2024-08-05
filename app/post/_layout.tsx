import BackButton from "@/components/BackButton";
import { Stack, useRouter } from "expo-router";

export default function PostLayout() {
    const router = useRouter();

    const headerOptions = {
        headerTransparent: true,
        headerLeft: () => <BackButton onPress={() => {
            router.back();
        }} />,
        headerTitle: "",
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={headerOptions} />
        </Stack>
    )
}