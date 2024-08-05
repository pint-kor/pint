import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useState } from "react";
import { subscribePostBookmark, unsubscribePostBookmark } from "@/lib/api/posts";
import { setUser } from "@/lib/features/user";

export default function PostBookMark({
  active = false,
  count = 0,
}: {
  active?: boolean;
  count?: number;
}) {

  const { id } = useLocalSearchParams();
  const { user } = useSelector((root: RootState) => root.user)
  const [state, setState] = useState({
    active,
    count
  });
  const dispatch = useDispatch<AppDispatch>();

  const onPressBookMark = () => {
    if (id && typeof id === "string" && user && user.access_token) {
      if (state.active) {
        unsubscribePostBookmark({
          postId: id,
          access_token: user?.access_token
        })
        dispatch(setUser({
          ...user,
          bookmarkedPosts: user.bookmarkedPosts.filter((postId) => postId !== id)
        }))
        setState(s => ({
          active: false,
          count: s.count - 1
        }))
      } else {
        subscribePostBookmark({
          postId: id,
          access_token: user?.access_token
        })
        dispatch(setUser({
          ...user,
          bookmarkedPosts: [...user.bookmarkedPosts, id]
        }))
        setState(s => ({
          active: true,
          count: s.count + 1
        }))
      }
    }
  }

  return (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    }}>
      <Ionicons
        name={state.active ? "bookmark" : "bookmark-outline"}
        size={32}
        color="cyan"
        onPress={onPressBookMark}
      />
      <ThemedText style={{ color: 'cyan', fontWeight: 600 }}>{state.count}</ThemedText>
    </View>
  );
}