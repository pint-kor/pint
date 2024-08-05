import { Pressable, StyleSheet, View } from "react-native";
import CommonTitle from "../CommonTitle";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import MiniMap from "./MiniMap";
import { useRouter } from "expo-router";

export default function MapCurrentLocation() {
    const { t } = useTranslation();
    const router = useRouter();
    const [startPos, setStartPos] = useState({ x: 0, y: 0})

    const handleMouseDown = (e: any) => {
        setStartPos({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY })
    }

    const handleMouseUp = (e: any) => {
        const x = e.nativeEvent.locationX
        const y = e.nativeEvent.locationY

        if (Math.abs(startPos.x - x) < 1 && Math.abs(startPos.y - y) < 1) {
            onPressMap()
        }
    }

    const onPressMap = () => {
        router.push("/map")
    }

    const styles = useMemo(() => StyleSheet.create({
        container: {
            gap: 10,
        },
        mapContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            flex: 1,
        }
    }), [])

    return (
      <View style={styles.container}>
        <CommonTitle title={t("home.current-location.title")} />
        <Pressable
          style={styles.mapContainer}
          onPressIn={handleMouseDown}
          onPressOut={handleMouseUp}
        >
          <MiniMap />
        </Pressable>
      </View>
    );
}