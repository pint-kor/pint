import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemedView } from "../ThemedView";
import { View, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef } from "react";

export default function MapBottomSheet({ place, setPlace }: { place: any, setPlace: (place: any) => void}) {
    const colorScheme = useColorScheme() ?? "light";
    const ref = useRef<BottomSheet>(null);
    const { place_name } = place.place;

    return (
      <BottomSheet
        snapPoints={["30%", "70%"]}
        style={{
          marginLeft: "2.5%",
          marginRight: "2.5%",
          borderRadius: 100,
        }}
        backgroundStyle={{
          backgroundColor: "transparent",
        }}
        handleStyle={{
          backgroundColor: "transparent",
        }}
        handleIndicatorStyle={
          {
            // backgroundColor: "transparent",
          }
        }
        enablePanDownToClose={true}
        onClose={() => setPlace(null)}
        ref={ref}
      >
        <BottomSheetView style={{ flex: 1, backgroundColor: "transparent" }}>
          <ThemedView
            style={{
              flex: 1,
              borderRadius: 15,
              backgroundColor: Colors[colorScheme].background,
              marginBottom: "2%",
            }}
          >
            <View style={{ padding: 20 }}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <ThemedText style={{ fontWeight: 800, fontSize: 13 }}>
                  {place_name}
                </ThemedText>
                <Ionicons name="close" size={24} color={Colors[colorScheme].text} onPress={() => ref.current?.close()}/>
              </View>
              <ThemedText style={{ fontSize: 10, color: "gray" }}>
                {place.place.address_name}
              </ThemedText>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                {/* link */}
                <Ionicons
                  name="link"
                  size={16}
                  color={Colors[colorScheme].text}
                />
                <Link href={place.place.place_url} target="_blank">
                  <ThemedText
                    style={{ fontSize: 10, color: Colors[colorScheme].text }}
                  >
                    {place.place.place_url}
                  </ThemedText>
                </Link>
              </View>
            </View>
          </ThemedView>
        </BottomSheetView>
      </BottomSheet>
    );
}