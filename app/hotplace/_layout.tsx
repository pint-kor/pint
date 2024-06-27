import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function HotPlaceLayout() {
    const colorScheme = useColorScheme()

    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle: "",
                headerStyle: {
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                },
                headerLeft: () => <BackButton />
            }} />
        </Stack>
    )
}