import { Entypo } from "@expo/vector-icons";
import { useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useTranslation } from "react-i18next";
import * as ImagePicker from 'expo-image-picker';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setCurrentPostImages, setRepresentativeImage } from "@/lib/features/post";
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image'

export default function PostPhoto() {
    const { currentPost: { images } } = useSelector((state: RootState) => state.post)
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const colorScheme = useColorScheme() ?? "light";
    const imagePressTime = useRef<number>(0);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        })

        if (!result.canceled) {
            dispatch(setCurrentPostImages([...images, ...result.assets.map((asset) => asset.uri)]))
        }
    }

    const handleRepresentationImage = (idx: number) => {
        if (Date.now() - imagePressTime.current < 300) {
            dispatch(setRepresentativeImage(idx))
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }
        imagePressTime.current = Date.now();
    }

    const handleDeleteImage = (idx: number) => {
        dispatch(setCurrentPostImages(images.filter((_, i) => i !== idx)))
    }

    const styles = useMemo(() => StyleSheet.create({
        container: {
            padding: 20,
        },
        photoContainer: {
            borderStyle: "dashed",
            height: 100,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        photo: {
            width: 75,
            height: 100,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: Colors[colorScheme].text,
        }
    }), [])

    return (
      <View style={styles.container}>
        {images.length === 0 && (
          <Pressable style={styles.photoContainer} onPress={pickImage}>
            <Entypo name="images" size={24} color="gray" />
            <ThemedText
              style={{ fontWeight: 700, fontSize: 12, color: "gray" }}
            >
              {t("blog.attach-photo")}
            </ThemedText>
          </Pressable>
        )}
        {images.length > 0 && (
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              gap: 3,
              flexDirection: "row",
              paddingTop: 10,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {images
              .map((uri: string, index) => (
                <PhotoComponent
                  key={index}
                  uri={uri}
                  handleRepresentationImage={() =>
                    handleRepresentationImage(index)
                  }
                  handleDeleteImage={() => handleDeleteImage(index)}
                  isRepresentative={index === 0}
                />
              ))}
            <Pressable
              onPress={pickImage}
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
                marginLeft: 10,
                width: 75,
              }}
            >
              <Entypo name="plus" size={24} color="gray" />
            </Pressable>
          </ScrollView>
        )}
      </View>
    );
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const PhotoComponent = ({
  uri,
  key,
  handleRepresentationImage,
  handleDeleteImage,
  isRepresentative = false,
}: {
  uri: string;
  key: number;
  handleRepresentationImage: () => void;
  handleDeleteImage: () => void;
  isRepresentative?: boolean;
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const { t } = useTranslation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        photo: {
          width: 75,
          height: 100,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: Colors[colorScheme].text,
        },
      }),
    []
  );

  return (
    <View style={{ width: 75, height: 100, margin: 5 }}>
      {isRepresentative && (
        <View
          style={{
            backgroundColor: "green",
            position: "absolute",
            zIndex: 1,
            top: -6,
            left: -3,
            padding: 3,
            borderRadius: 8,
            borderColor: "white",
            borderWidth: 1,
          }}
        >
          <Text style={{ color: "white", fontSize: 8, fontWeight: 200 }}>
            {t("blog.representative")}
          </Text>
        </View>
      )}
      <Pressable
        onPress={handleDeleteImage}
        style={{
          position: "absolute",
          zIndex: 1,
          right: -6,
          top: -6,
          backgroundColor: "black",
          borderRadius: 50,
          borderColor: "white",
          borderWidth: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo name="cross" size={18} color="white" />
      </Pressable>
      <Pressable onPress={handleRepresentationImage}>
        <Image source={{ uri }} style={styles.photo} placeholder={{ blurhash }} contentFit="cover" transition={300} />
      </Pressable>
    </View>
  );
};