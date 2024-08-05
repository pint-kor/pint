import BackButton from "@/components/BackButton";
import PostCompleteView from "@/components/blog/PostCompleteView";
import { initializeCurrentPost, uploadPost } from "@/lib/features/post";
import { AppDispatch, RootState } from "@/lib/store";
import { Redirect, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function PostPreviewScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const { currentPost } = useSelector((state: RootState) => state.post)
    const user = useSelector((state: RootState) => state.user.user)

    if (!user) {
        return <Redirect href="/login" />;
    }

    const userId = user.userId;

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => <BackButton onPress={() => router.back()} />,
            headerRight: () => <PostApplyButton />,
            headerTitle: "",
            // headerStyle: {
            //     backgroundColor: 'transparent',
            // },
            headerTransparent: true,
        })
    }, [])

    const currentDate = new Date().toISOString();

    return (
        <PostCompleteView post={{
            content: currentPost.content,
            images: currentPost.images,
            isPrivate: false,
            placeId: currentPost.place.id,
            _id: "id",
            bookmarkCount: 0,
            heartCount: 0,
            writer: userId,
            location: {
                type: "Point",
                coordinates: [currentPost.place.latitude, currentPost.place.longitude],
            },
            created_at: currentDate,
            updated_at: currentDate,
            visited_at: currentDate,
        }} />
    )
}

function PostApplyButton() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleUploadPost = async () => {
        await dispatch(uploadPost());
        dispatch(initializeCurrentPost());
        router.push("/");
    }

    return (
        <Pressable style={{
            backgroundColor: 'green',
            padding: 5,
            borderRadius: 20,
            paddingHorizontal: 10,
        }}
            onPress={handleUploadPost}
        >
            <Text style={{
                color: 'white',
                fontWeight: 'bold',
                lineHeight: 20,
            }}>post</Text>
        </Pressable>
    )
}