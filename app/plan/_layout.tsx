import BackButton from "@/components/BackButton";
import { Stack, useRouter } from "expo-router";

export default function PlanLayout() {
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
            {/* <Stack.Screen name="index" options={headerOptions} /> */}
            <Stack.Screen name="place" options={headerOptions} />
            <Stack.Screen name="period" options={headerOptions} />
            <Stack.Screen name="withwho" options={headerOptions} />
        </Stack>
    )
}