import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const colorScheme = useColorScheme() ?? "light";
    const { t } = useTranslation();

    return (
      <ThemedView style={{ flex: 1 }}>
        {notifications.length === 0 && (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Ionicons name="notifications-outline" size={70} color={Colors[colorScheme].text} />
            <ThemedText>{t("notification.empty")}</ThemedText>
          </View>
        )}
      </ThemedView>
    );
}