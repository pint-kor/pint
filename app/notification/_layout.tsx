import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function Notification() {
    const colorScheme = useColorScheme() ?? "light";

    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerLeft: () => <BackButton />,
            headerStyle: {
              backgroundColor: Colors[colorScheme].background,
            },
            headerTitle: ""
          }}
        />
      </Stack>
    );
}