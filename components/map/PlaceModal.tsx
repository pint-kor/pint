import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemedView } from "../ThemedView";
import { Pressable, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSharedValue } from "react-native-reanimated";
import axios from "axios";
import PlacePostBox from "../blog/PlacePostBox";

export default function PlaceModal({ place, setPlace }: { place: any, setPlace: (place: any) => void}) {
    const colorScheme = useColorScheme() ?? "light";
    const ref = useRef<BottomSheet>(null);
    const { displayName } = place;

    const snapIndex = useSharedValue(0);

    const onPressBottomSheet = () => {
      if (snapIndex.value === 0) {
        ref.current?.snapToIndex(1);
      }
      else {
        ref.current?.snapToIndex(0);
      }
    }

    useEffect(() => {
      axios.get("http://192.168.0.59:8000/blog?place_id=" + place.id).then((res) => {
        console.log(res.data);
      })
    }, [place])

    return (
      <BottomSheet
        snapPoints={["25%", "70%"]}
        backgroundStyle={{
          backgroundColor: "transparent",
        }}
        handleStyle={{
          backgroundColor: "transparent",
        }}
        handleIndicatorStyle={
          {
            backgroundColor: "transparent",
          }
        }
        enablePanDownToClose={false}
        ref={ref}
        animatedIndex={snapIndex}
      >
        <BottomSheetView style={{ flex: 1, backgroundColor: "transparent" }} >
          <ThemedView
            style={{
              flex: 1,
              backgroundColor: Colors[colorScheme].background,
            }}
          >
            <Pressable style={{ padding: 15  }} onPress={onPressBottomSheet}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <ThemedText style={{ fontWeight: 800, fontSize: 13 }}>
                  {displayName.text}
                </ThemedText>
                {/* <Ionicons name="close" size={24} color={Colors[colorScheme].text} onPress={() => ref.current?.close()}/> */}
              </View>
              <ThemedText style={{ fontSize: 10, color: "gray" }}>
                {place.formattedAddress}
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
                <Link href={""} target="_blank">
                  <ThemedText
                    style={{ fontSize: 10, color: Colors[colorScheme].text }}
                  >
                    {place.place_url}
                  </ThemedText>
                </Link>
              </View>
              <PlacePostBox />
            </Pressable>
          </ThemedView>
        </BottomSheetView>
      </BottomSheet>
    );
}