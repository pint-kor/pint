import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { subscribePostHeart, unsubscribePostHeart } from "@/lib/api/posts";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useState } from "react";
import { fetchUserInfo, setUser } from "@/lib/features/user";

export default function PostHeart({
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

  const onPressHeart = () => {
    if (id && typeof id === "string" && user && user.access_token) {
      if (state.active) {
        unsubscribePostHeart({
          postId: id,
          access_token: user?.access_token
        })
        dispatch(setUser({
          ...user,
          heartedPosts: user.heartedPosts.filter((postId) => postId !== id)
        }))
        setState(s => ({
          active: false,
          count: s.count - 1
        }))
      } else {
        subscribePostHeart({
          postId: id,
          access_token: user?.access_token
        })
        dispatch(setUser({
          ...user,
          heartedPosts: [...user.heartedPosts, id]
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
        name={state.active ? "heart" : "heart-outline"}
        size={32}
        color="red"
        onPress={onPressHeart}
      />
      <ThemedText style={{ color: 'red', fontWeight: 600 }}>{state.count}</ThemedText>
    </View>
  );
}