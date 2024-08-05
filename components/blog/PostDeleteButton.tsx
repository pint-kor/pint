import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ThemedView } from "../ThemedView";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setIsPostDeleteModalOpen } from "@/lib/features/post";

export default function PostDeleteButton() {
    const colorScheme = useColorScheme() ?? "light";
    const dispatch = useDispatch<AppDispatch>();

    const handlePressDelete = () => {
        dispatch(setIsPostDeleteModalOpen(true));
    }

    return (
      <>
        <Pressable
          style={{
            backgroundColor: "red",
            padding: 8,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handlePressDelete}
        >
          <Ionicons name="trash" size={28} color={Colors[colorScheme].text} />
        </Pressable>
      </>
    );
}