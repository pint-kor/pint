import PostCompleteView from "@/components/blog/PostCompleteView";
import { ThemedText } from "@/components/ThemedText";
import { getPostById } from "@/lib/features/main";
import { AppDispatch, RootState } from "@/lib/store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Post from "../(tabs)/post";
import PostDeleteModal from "@/components/blog/PostDeleteModal";

export default function PostById() {
    const { id } = useLocalSearchParams();
    const [post, setPost] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();
    const { isPostDeleteModalOpen } = useSelector((root: RootState) => root.post);

    useEffect(() => {
        dispatch(getPostById(id as string)).then(result => {
            const p = result.payload;
            if (p)
                setPost(p);
        })
    }, [id])

    if (post) {
        return (
            <>
                <PostCompleteView post={post} />
                {isPostDeleteModalOpen && <PostDeleteModal />}
            </>
        )
    }

}