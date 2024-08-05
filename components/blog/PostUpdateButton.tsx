import { Pressable, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";

export default function PostUpdateButton() {
    const colorScheme = useColorScheme() ?? "light";
    const { t } = useTranslation();
    
    return (
      
        <Pressable style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            backgroundColor: Colors[colorScheme].subBackground,
            padding: 8,
            borderRadius: 10,
        }}>
          <FontAwesome
            name="pencil"
            size={24}
            color={Colors[colorScheme].text}
          />
          <ThemedText style={{ fontSize: 12, fontWeight: 800 }}>
            {t("blog.edit-blog")}
          </ThemedText>
        </Pressable>
    );
}