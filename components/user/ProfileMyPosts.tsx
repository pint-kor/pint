import { fetchMyPosts, fetchUserInfo } from "@/lib/features/user"
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useMemo, useState } from "react"
import { Button, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemedText } from "../ThemedText";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { getPostById } from "@/lib/features/main";
import PostThumbnailView from "../blog/PostThumbnailView";
import ProfileVerticalScrollContainer from "./ProfileVerticalScrollContainer";

export default function ProfileMyPosts() {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const { myPosts } = useSelector((state: RootState) => state.user?.user)
    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // minHeight: 300,
            width: Dimensions.get("screen").width - 40,
            gap: 15,
        },
        button: {
            backgroundColor: Colors[colorScheme].text,
            padding: 15,
            borderRadius: 100,
        },
        buttonText: {
            color: Colors[colorScheme].background,
        }
    }), [colorScheme]);

    if (myPosts.length === 0) {
        return (
          <View style={styles.container}>
            <ThemedText>{t("profile.myposts-empty")}</ThemedText>
            <Pressable onPress={() => router.push("/post")} style={styles.button}>
              <Text style={styles.buttonText}>{t("profile.myposts-empty-button")}</Text>
            </Pressable>
          </View>
        );
    } else {
        return (
          <ProfileVerticalScrollContainer>
            {myPosts.map((post) => {
              return <PostThumbnailView key={post} post={post} />;
            })}
          </ProfileVerticalScrollContainer>
        );
    }
}

