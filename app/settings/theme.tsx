import { ThemedView } from "@/components/ThemedView";
import Animated from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { ThemeType, setTheme } from "@/lib/features/setup";
import { SettingButton } from ".";
import { Platform } from "react-native";

export default function ScreenTheme() {
    const { t } = useTranslation();
    const theme = useSelector((state: RootState) => state.setup.theme);
    const dispatch = useDispatch();

    const dispatchTheme = (theme: ThemeType) => {
        dispatch(setTheme(theme));
    }

    return (
      <ThemedView style={{ flex: 1 }}>
        <Animated.ScrollView>
          <SettingButton
            title={t("settings.menu.screen_theme.light")}
            checked={theme === "light"}
            onPress={() => dispatchTheme("light")}
          />
          <SettingButton
            title={t("settings.menu.screen_theme.dark")}
            checked={theme === "dark"}
            onPress={() => dispatchTheme("dark")}
          />
          {Platform.OS !== "web" && (
            <SettingButton
            title={t("settings.menu.screen_theme.auto")}
            checked={theme === "auto"}
            onPress={() => dispatchTheme("auto")}
          />)}
        </Animated.ScrollView>
      </ThemedView>
    );
}