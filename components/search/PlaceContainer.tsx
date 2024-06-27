import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { Line } from "react-native-svg";

export default function PlaceContainer({ searchResult }: { searchResult: any[] }) {
    const colorScheme = useColorScheme() ?? "light";
    const { t } = useTranslation();

    return (
      <View style={styles.container}>
        <ThemedText style={{ fontSize: 17, fontWeight: 800, }}>
          {t("search.searchresult.menu.place")}
        </ThemedText>
        <View
          style={{
            borderBottomColor: Colors[colorScheme].subBackground,
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.place_container}>
            {searchResult.map((place) => {
            return (
                <View key={place.id}>
                <ThemedText style={styles.place_title}>
                    {place.place_name}
                </ThemedText>
                <ThemedText style={{ ...styles.place_address }}>
                    {place.address_name}
                </ThemedText>
                </View>
            );
            })}

        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 10,
    },
    place_container: {
        gap: 15,
        marginVertical: 10,
    },
    place_title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    place_address: {
        fontSize: 15,
    },
})