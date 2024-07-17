import { setIsPostModalOpen } from "@/lib/features/post";
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";

export default function WritePlacePostButton({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    return (
        <Pressable style={{ flex: 1 }} onPress={() => dispatch(setIsPostModalOpen(true))}>
            {children}
        </Pressable>
    )
}