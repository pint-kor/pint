import { RootState } from "@/lib/store"
import { useDispatch, useSelector } from "react-redux"
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ThemedView } from "../ThemedView"
import { useEffect, useMemo, useRef } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"
import { ThemedText } from "../ThemedText"
import { setIsPostModalOpen } from "@/lib/features/post"
import { useRouter } from "expo-router"

// 하단 탭에서 글쓰기 버튼을 누르면 글쓰기 모달이 나타나는 컴포넌트
export default function PlacePostModal() {
    const { isPostModalOpen } = useSelector((state: RootState) => state.post)
    const colorScheme = useColorScheme() ?? "light";
    const dispatch = useDispatch();
    const ref = useRef<BottomSheet>(null)
    const router = useRouter();

    useEffect(() => {
        if (isPostModalOpen) {
            ref.current?.expand()
        } else {
            ref.current?.close()
        }
    }, [isPostModalOpen])

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }), [colorScheme])

    return (
      <>
        {/* Background drop */}
        {isPostModalOpen && (
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onPress={() => dispatch(setIsPostModalOpen(false))}
          />
        )}
        <BottomSheet
          snapPoints={["20%"]}
          index={-1}
          ref={ref}
          backgroundStyle={{
            backgroundColor: Colors[colorScheme].background,
          }}
          handleIndicatorStyle={{
            backgroundColor: "transparent",
          }}
          handleStyle={{
            backgroundColor: "transparent",
          }}
        >
          <BottomSheetView>
            <Pressable style={styles.container} onPress={() => router.push("/post")}>
              {/* write icon */}
              <Ionicons name="add" size={24} color={Colors[colorScheme].text} />
              {/* write text */}
              <ThemedView>
                <ThemedText>글쓰기</ThemedText>
              </ThemedView>
            </Pressable>
          </BottomSheetView>
        </BottomSheet>
      </>
    );
}