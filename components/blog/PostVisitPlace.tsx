import { Ionicons } from "@expo/vector-icons";
import PostSetting from "./PostSetting";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import BottomSheet, { BottomSheetView, useBottomSheet } from "@gorhom/bottom-sheet";
import { Text, TextInput, View } from "react-native";
import { useRef, useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function PostVisitPlace() {
    const colorScheme = useColorScheme() ?? "light";
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const ref = useRef<BottomSheet>(null);

    return (
      <>
        <PostSetting title={t("blog.visit-place")}>
          <Ionicons
            name="location"
            size={24}
            color={Colors[colorScheme].text}
            onPress={() => setShow(true)}
          />
        </PostSetting>
        {show && (
          <BottomSheet
            snapPoints={["90%"]}
            containerStyle={{ zIndex: 999 }}
            handleStyle={{ backgroundColor: Colors[colorScheme].subBackground }}
            backgroundStyle={{
              backgroundColor: Colors[colorScheme].subBackground,
            }}
            enablePanDownToClose
            onClose={() => setShow(false)}
            ref={ref}
          >
            <BottomSheetView>
              <BottomSheetHeader />
              <BottomSheetSearchBar text={text} setText={setText} />
            </BottomSheetView>
          </BottomSheet>
        )}
      </>
    );
}

const BottomSheetHeader = () => {
    const colorScheme = useColorScheme() ?? "light";
    const { t } = useTranslation();
    const bottomSheet = useBottomSheet();

    return (
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <ThemedText
            type="default"
            style={{ fontSize: 17, fontWeight: "bold" }}
          >
            {t("blog.visit-place-search")}
          </ThemedText>
          <Ionicons
            name="close"
            size={24}
            color={Colors[colorScheme].text}
            onPress={() => bottomSheet.close()}
          />
        </View>
      </View>
    );
}

const BottomSheetSearchBar = ({ text, setText }: {
    text: string;
    setText: (text: string) => void;
}) => {
    const colorScheme = useColorScheme() ?? "light";

    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors[colorScheme].background,
          padding: 10,
          marginHorizontal: 15,
          marginVertical: 15,
          borderRadius: 20,
        }}
      >
        <Ionicons name="search" size={24} color={Colors[colorScheme].text} />
        <TextInput
          editable
          style={{
            flex: 1,
            marginHorizontal: 10,
            color: Colors[colorScheme].text,
          }}
          value={text}
          onChangeText={setText}
        />
        {text.length > 0 && (
            <Ionicons name="close" size={24} color={Colors[colorScheme].text} onPress={() => setText("")} />
        )}
      </View>
    );
}