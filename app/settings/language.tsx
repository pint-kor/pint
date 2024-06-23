import Animated from "react-native-reanimated";
import { SettingButton } from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useTranslation } from "react-i18next";
import { ThemedView } from "@/components/ThemedView";
import { LanguageType, setLanguage } from "@/lib/features/setup";

export default function Language() {
    const language = useSelector((state: RootState) => state.setup.language);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const dispatchLanguage = (language: LanguageType) => {
        dispatch(setLanguage(language));
    }

    return (
        <ThemedView style={{flex: 1}}>
            <Animated.ScrollView>
                <SettingButton title={t("settings.menu.language.en")} checked={language === "en"} onPress={() => dispatchLanguage("en")} />
                <SettingButton title={t("settings.menu.language.ko")} checked={language === "ko"} onPress={() => dispatchLanguage("ko")} />
            </Animated.ScrollView>
        </ThemedView>
    )
}