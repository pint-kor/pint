import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTranslation } from "react-i18next";

export default function PlacePostBox() {
    const colorScheme = useColorScheme() ?? "light";
    const { t } = useTranslation();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'row',
            marginTop: 20,
        },
        postContainer: {
            flexDirection: 'column',
            flex: 1,
            // borderWidth: 2,
            // borderStyle: 'dotted',
            // borderRadius: 20,
            // borderColor: Colors[colorScheme].text,
            width: '90%',
            height: 150,
            alignItems: 'center',
            justifyContent: 'center',
        },
    }), [colorScheme])

    return (
        <View style={styles.container}>
            <Pressable style={styles.postContainer}>
                <ThemedText style={{ fontWeight: 800}}>{t("blog.no-blog")}</ThemedText>
                <ThemedText type="defaultSemiBold" style={{ fontWeight: 100, fontSize: 15, }}>{t("blog.write-first-blog")}</ThemedText>
            </Pressable>
        </View>
    )
}