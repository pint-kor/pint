import { Dimensions, StyleSheet, Text, View } from "react-native";
import CommonTitle from "../CommonTitle";
import { ThemedText } from "../ThemedText";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import ContentLoader, { Rect, Circle, Instagram } from "react-content-loader/native";
import ShowAll from "./ShowAll";
import { SkeletonLoader } from "../SkeletonLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import EventMain from "../upcomingevent/EventMain";

export default function UpComingEvents() {
    const { t } = useTranslation();
    // const { fulfilled, loading } = useSelector((state: RootState) => state.event);

    return (
      <View>
        <CommonTitle
          title={t("home.upcomingevent.title")}
          titleRight={
            <ShowAll href="/upcoming" />
          }
        />
        <View style={styles.eventContainer}>
          {/* {loading && <EventComponent />}
          {fulfilled && <EventMain />} */}
        </View>
      </View>
    );
}

function EventComponent() {
    return (
      <>
        <UpComingEventLoader />
        <UpComingEventLoader />
        <UpComingEventLoader />
      </>
      
    )
}


function UpComingEventLoader() {
  const windowWidth = Dimensions.get("window").width;

  const getRandomWidth = () => {
      // 150 ~ windowWidth - 100
      return Math.floor(Math.random() * (windowWidth - 100 - 150 + 1)) + 150;
  }

  return (
    <SkeletonLoader
      height={90}
      speed={1}
    >
      <Rect x="0" y="0" rx="5" ry="5" width="90" height="90" />
      <Rect x="100" y="17" rx="3" ry="3" width={getRandomWidth()} height="13" />
      <Rect x="100" y="40" rx="3" ry="3" width={getRandomWidth()} height="13" />
    </SkeletonLoader>
  );
}

const styles = StyleSheet.create({
    showAll: {
        fontSize: 13,
        fontWeight: "600"
    },
    eventContainer: {
        marginHorizontal: 5,
        marginTop: 10,
        gap: 15
    },
    eventComponent: {
        backgroundColor: "gray",
        width: 200,
        height: 200,
        borderRadius: 10
    }
})
