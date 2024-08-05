import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { deletePost, setIsPostDeleteModalOpen, setPostDeleteState } from "@/lib/features/post";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function PostDeleteModal() {
    const dispatch = useDispatch<AppDispatch>();
    const params = useLocalSearchParams();
    const router = useRouter();
    const { postDeleteState } = useSelector((root: RootState) => root.post);
    const { t } = useTranslation();

    useEffect(() => {
      dispatch(setPostDeleteState("idle"))
    }, [])

    const handleBlur = () => {
      dispatch(setIsPostDeleteModalOpen(false));
    }

    const handleDelete = () => {
      dispatch(deletePost(params?.id as string));
    }

    const handleReturn = () => {
      dispatch(setIsPostDeleteModalOpen(false));
      router.replace("/");
    }

    return (
      <>
        <View style={[styles.container, styles.background]}></View>
        <Pressable style={[styles.container]} onPress={handleBlur}>
          {/*  */}
          <ThemedView
            style={{
              width: 300,
              height: 200,
              opacity: 1,
              zIndex: 999,
              borderRadius: 10,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            {postDeleteState === "idle" && (
              <>
                <ThemedText type="defaultSemiBold">
                  {t("blog.ask-delete")}
                </ThemedText>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={[styles.button, { backgroundColor: "red" }]}
                    onPress={handleDelete}
                  >
                    <ThemedText type="defaultSemiBold">
                      {t("blog.delete")}
                    </ThemedText>
                  </Pressable>
                  <Pressable
                    style={[styles.button, { backgroundColor: "gray" }]}
                    onPress={handleBlur}
                  >
                    <ThemedText type="defaultSemiBold">
                      {t("blog.cancel")}
                    </ThemedText>
                  </Pressable>
                </View>
              </>
            )}
            {postDeleteState === "loading" && (
              <ActivityIndicator size="large" color="white" />
            )}
            {postDeleteState === "succeeded" && (
              <>
                <ThemedText type="defaultSemiBold">{t("blog.success-delete")}</ThemedText>
                <Pressable
                  style={[styles.button, { backgroundColor: "gray" }]}
                  onPress={handleReturn}
                >
                  <ThemedText onPress={handleReturn}>
                    {t("blog.return")}
                  </ThemedText>
                </Pressable>
              </>
            )}
            {postDeleteState === "failed" && (
              <>
                <ThemedText type="defaultSemiBold">{t("blog.fail-delete")}</ThemedText>
                <Pressable
                  style={[styles.button, { backgroundColor: "gray" }]}
                  onPress={handleReturn}
                >
                  <ThemedText onPress={handleReturn}>
                    {t("blog.return")}
                  </ThemedText>
                </Pressable>
              </>
            )}
          </ThemedView>
        </Pressable>
      </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 99,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    background: {
        opacity: 0.5,
        backgroundColor: 'black',
    },
    button: {
      padding: 8,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
})