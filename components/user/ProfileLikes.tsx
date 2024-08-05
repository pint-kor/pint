import { RootState } from "@/lib/store";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import ProfileVerticalScrollContainer from "./ProfileVerticalScrollContainer";
import PostThumbnailView from "../blog/PostThumbnailView";

export default function ProfileLikes() {
    const { heartedPosts } = useSelector((root: RootState) => root.user.user)

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: Dimensions.get("screen").width - 40,
        }
    }), [])

    if (heartedPosts.length === 0) {
      return (
        <View style={styles.container}>
          <Ionicons name="heart" size={24} color="white" />
        </View>
      );
    } else {
      return (
        <ProfileVerticalScrollContainer>
          {heartedPosts.map((post) => {
            return <PostThumbnailView key={post} post={post} />;
          })}
        </ProfileVerticalScrollContainer>
      );
    }

}