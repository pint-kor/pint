import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { getPostById } from "@/lib/features/main";
import { useEffect, useRef, useState } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Pressable, View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "../ThemedText";

const IMAGE_WIDTH = 185;

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

interface Post {
    images: string[];
    userId: string;
    _id: string;
}

export default function PostThumbnailView ({ post }: { post: Post | string }) {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoaded, setIsLoaded] = useState(false);
    const data = useRef<Post>();

    useEffect(() => {
        if (typeof post === 'string') {
            setIsLoaded(false);
            dispatch(getPostById(post)).then(result => {
                const p = result.payload;
                if (p)
                    data.current = {
                        _id: p._id,
                        images: p.images,
                        userId: p.userId,
                    } as Post
                setIsLoaded(true);
            })
        } else {
            data.current = post;
            setIsLoaded(true);
        }
    }, [post])

    
    const router = useRouter();

    if (isLoaded) {
        if (!data.current) return null;

        const { images, userId, _id } = data.current as Post;
        
        const handleClick = () => {
            router.push("/post/" + _id);
        }
        
        return (
            // <PostThumbnailViewSkeleton />
            <Pressable onPress={handleClick}>
                {<Image source={(images as any[])?.at(0)} style={{
                    width: IMAGE_WIDTH,
                    height: IMAGE_WIDTH * 1.618,
                }} placeholder={{ blurhash }}/>}
                <ThemedText style={{
                    lineHeight: 20,
                    fontWeight: 700,
                    fontSize: 9,
                    bottom: 8,
                    position: 'absolute',
                    left: 5,
                }}>
                    @{userId}
                </ThemedText>
            </Pressable>
        )
    } else {
        return (
            <PostThumbnailViewSkeleton />
        )
    }
}

const IMAGE_HEIGHT = IMAGE_WIDTH * 1.618;

export function PostThumbnailViewSkeleton() {
    return (
      <View style={{
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      }}>
        <ContentLoader width="100%" height="100%" viewBox={`0 0 ${IMAGE_WIDTH} ${IMAGE_HEIGHT}`} backgroundColor="#777" foregroundColor="#aaa">
          <Rect x="0" y="0" width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
        </ContentLoader>
      </View>
    );
}