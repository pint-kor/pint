import { ScrollView, View } from "react-native";
import CommonTitle from "../CommonTitle";
import ShowAll from "./ShowAll";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import PostThumbnailView from "../blog/PostThumbnailView";
import { useEffect } from "react";
import { loadPosts } from "@/lib/features/main";

export default function DailyPosts() {
    const { posts } = useSelector((root: RootState) => root.main)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadPosts())
    }, [])

    return (
        <View>
            <CommonTitle title="오늘의 포스트" titleRight={<ShowAll href="/dailyposts" />} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
                marginTop: 10,
            }} contentContainerStyle={{
                gap: 10
            }}>
                {posts.slice(0, 10).map((post, idx) => {
                    return (
                        <PostThumbnailView key={idx} post={post} />
                    )
                })
                }
            </ScrollView>
        </View>
    )
}