import { Dimensions, Pressable, ScrollView, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ProfileMyPosts from "./ProfileMyPosts";
import ProfileLikes from "./ProfileLikes";
import ProfileBookmarks from "./ProfileBookmarks";

export default function ProfileMyPostsContainer() {
    const { t } = useTranslation();
    const [menu, setMenu] = useState<"myposts" | "likes" | "bookmarks">("myposts")
    const colorScheme = useColorScheme() ?? "light";
    const scrollRef = useRef<ScrollView>(null);

    const menuColor = (target: "myposts" | "likes" | "bookmarks") => {
        return menu === target ? Colors[colorScheme].text : 'transparent'
    }

    const onPress = (menu: "myposts" | "likes" | "bookmarks") => {
        scrollRef.current?.scrollTo({ x: (Dimensions.get("screen").width - 40) * ["myposts", "likes", "bookmarks"].indexOf(menu), animated: true })
        setMenu(menu)
    }

    const onScroll = (e: any) => {
        const x = e.nativeEvent.contentOffset.x;
        const width = Dimensions.get("screen").width - 40;
        const page = Math.round(x / width);
        const menu = ["myposts", "likes", "bookmarks"][page] as "myposts" | "likes" | "bookmarks";
        setMenu(menu)
    }
    
    return (
        <View>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Pressable style={{ paddingVertical: 5, borderBottomWidth: 3, borderBottomColor: menuColor("myposts") }} onPress={() => onPress("myposts")}>
                    <ThemedText style={{ fontWeight: 800 }}>{t("profile.myposts")}</ThemedText>
                </Pressable>
                <Pressable style={{ padding: 5, borderBottomWidth: 3, borderBottomColor: menuColor("likes") }} onPress={() => onPress("likes")}>
                    <Ionicons name="heart" size={24} color={Colors[colorScheme].text} />
                </Pressable>
                <Pressable style={{ padding: 5, borderBottomWidth: 3, borderBottomColor: menuColor("bookmarks") }} onPress={() => onPress("bookmarks")}>
                    <Ionicons name="bookmark" size={24} color={Colors[colorScheme].text} />
                </Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled onMomentumScrollEnd={onScroll} ref={scrollRef} style={{
                height: 500,
            }}>
                <ProfileMyPosts />
                <ProfileLikes />
                <ProfileBookmarks />
            </ScrollView>
        </View>
    )
}