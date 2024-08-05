import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { ThemedText } from "../ThemedText";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { ThemedView } from "../ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FollowButton from "../user/FollowButton";
import ImageLocationIndicator from "../ImageLocationIndicator";
import { useEffect, useMemo, useRef, useState } from "react";
import PostHeart from "./PostHeart";
import PostBookMark from "./PostBookMark";
import PostUpdateButton from "./PostUpdateButton";
import PostDeleteButton from "./PostDeleteButton";
import { getPostById } from "@/lib/features/main";

interface Post {
  _id: string;
  content: string;
  placeId: string;
  location: {
    type: string;
    coordinates: number[];
  };
  isPrivate: boolean;
  writer: string;
  visited_at: string;
  created_at: string;
  updated_at: string;
  heartCount: number;
  bookMarkCount: number;
  images: string[];
}

// 블로그 포스트를 보여주는 화면
export default function PostCompleteView({ post }: {
  post: Post;
}) {

  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const { heartedPosts, bookmarkedPosts, userId } = useSelector((state: RootState) => state.user.user);
  const hasAuthorAccess = useMemo(() => post?.writer === userId, [userId, post?.writer]);
  const amIHearted = useMemo(() => post ? heartedPosts.includes(post._id) : false, [heartedPosts, post]);
  const amIBookmarked = useMemo(() => post ? bookmarkedPosts.includes(post._id) : false, [bookmarkedPosts, post]);

  const handleMomemtumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const index = Math.round(contentOffset.x / layoutMeasurement.width);
    setIndex(index);
  }

  const handleImageClick = () => {
    scrollRef.current?.scrollTo({
      x: (index + 1) * Dimensions.get("window").width,
      animated: true,
    })
  }

  return (
    <View>
      <ScrollView
        style={{
          flexDirection: "column",
        }}
        contentContainerStyle={{
          gap: 15,
        }}
      >
        {/* 이미지 뷰 */}
        <View>
          <ScrollView
            horizontal
            style={{
              borderRadius: 20,
              borderColor: "black",
            }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToStart
            onMomentumScrollEnd={handleMomemtumScrollEnd}
            ref={scrollRef}
          >
            {/* 이미지가 없을 때 */}
            {!post.images && (
              <View
                style={{
                  width: Dimensions.get("window").width,
                  height: 600,
                  backgroundColor: "gray",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
            {/* 이미지가 있을 때 */}
            {post.images &&
              (post.images as string[]).map((uri, idx) => {
                return (
                  <Pressable onPress={handleImageClick}>
                    <Image
                      key={idx}
                      source={{ uri }}
                      style={{
                        width: Dimensions.get("window").width,
                        height: 600,
                        borderLeftWidth: 5,
                        borderRightWidth: 5,
                        borderColor: "white",
                      }}
                    />
                  </Pressable>
                );
              })}
          </ScrollView>
          {post.images && (
            <ImageLocationIndicator
              count={post.images.length}
              index={index}
              style={{
                position: "absolute",
                bottom: 10,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
            />
          )}
        </View>

        <ThemedView
          style={{
            borderRadius: 15,
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          {/* 유저 프로필 */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "white",
                }}
                placeholder={""}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ThemedText
                type="defaultSemiBold"
                style={{ fontSize: 14, lineHeight: 18 }}
              >
                sdfsdfsdfsdf
              </ThemedText>
              <ThemedText
                type="default"
                style={{ fontSize: 10, lineHeight: 18 }}
              >
                {post.created_at.substring(0, 10)}
              </ThemedText>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <FollowButton />
            </View>
          </View>
          {/* 본문 */}
          <View
            style={{
              padding: 10,
            }}
          >
            <ThemedText type="defaultSemiBold">{post.content}</ThemedText>
          </View>
          {/* 좋아요, 북마크, 삭제, 수정 버튼 */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <PostHeart active={amIHearted} count={post.heartCount} />
            <PostBookMark active={amIBookmarked} count={post.bookMarkCount} />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 8,
              }}
            >
              {hasAuthorAccess && <PostDeleteButton />}
              {hasAuthorAccess && <PostUpdateButton />}
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </View>
  );

}
