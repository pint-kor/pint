import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { __developement_logout } from "@/lib/features/user";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useDispatch } from "react-redux";

export default function Settings() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(__developement_logout());
        router.dismissAll();
        router.replace("/login")
    }

    const routeTheme = () => {
        router.push("/settings/theme")
    }

    const routeLanguage = () => {
        router.push("/settings/language")
    }

    return (
      <ThemedView style={{ flex: 1 }}>
        <Animated.ScrollView>
          <SettingButton title={t("settings.menu.profile_settings")} hasNext />
          <SettingButton title={t("settings.menu.account_settings")} hasNext />
          <HorizontalLine />
          <SettingButton title={t("settings.menu.screen_theme.title")} hasNext onPress={routeTheme} />
          <SettingButton title={t("settings.menu.language.title")} hasNext onPress={routeLanguage} />
          <HorizontalLine />
          <SettingButton title={t("settings.menu.logout")} onPress={logout} />
        </Animated.ScrollView>
      </ThemedView>
    );
}

export function SettingButton({
  title,
  hasNext = false,
  checked = false,
  ...props
}: { title: string; hasNext?: boolean; checked?: boolean } & PressableProps) {
  const colorScheme = useColorScheme();

  return (
    <Pressable style={[styles.button]} {...props}>
      <ThemedText type="defaultSemiBold" style={styles.text}>
        {title}
      </ThemedText>
      {hasNext && (
        <Ionicons
          name="chevron-forward-outline"
          size={18}
          color={Colors[colorScheme ?? "light"].text}
          style={styles.icon}
        />
      )}
      {checked && (
        <Ionicons
          name="checkmark"
          size={18}
          color={Colors[colorScheme ?? "light"].text}
          style={styles.icon}
        />
      )}
    </Pressable>
  );
}

function HorizontalLine() {
  const colorScheme = useColorScheme() ?? "light";

  const backgroundColor = colorScheme === "dark" ? "#242424" : "#f0f0f0";

    return (
        <View style={{height: 1, width: "100%", backgroundColor }}/>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 65,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    text: {
        fontSize: 15,
        marginLeft: 20
    },
    icon: {
        marginRight: 20
    },
})
