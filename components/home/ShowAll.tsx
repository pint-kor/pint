import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

export default function ShowAll({ href }: { href: string }) {
    const { t } = useTranslation();

    const showAll = () => {
        router.push(href)
    }

    return (
        <ThemedText style={styles.showAll} onPress={showAll}>
              {t("common.showall")}
        </ThemedText>
    )
}

const styles = StyleSheet.create({
    showAll: {
        fontSize: 13,
        fontWeight: "600"
    },
})