import BackButton from "@/components/BackButton";
import { Stack } from "expo-router";

export default function UpcomingLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerLeft: BackButton,
                headerTitle: "",
            }} />
        </Stack>
    )
}
