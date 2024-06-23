
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View, useColorScheme } from "react-native";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

export default function SettingLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  const headerOptions = {
    headerBackTitle: t("settings.title"),
    headerTintColor: Colors[colorScheme ?? "light"].text,
    headerTitle: "",
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: Colors[colorScheme ?? "light"].background,
    }
  }

    return (
      <Stack>
        <Stack.Screen name="index" options={{...headerOptions, headerLeft: CloseButton, }} />
        <Stack.Screen name="theme" options={headerOptions} />
        <Stack.Screen name="language" options={headerOptions} />
      </Stack>
    );
}

function CloseButton() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const onPress = () => {
    router.dismiss();
  }

  return (
    <View style={{ backgroundColor: 'transparent',}}>
      <Ionicons name="close" size={28} color={Colors[colorScheme ?? "light"].text} onPress={onPress} />
    </View>
  );
}