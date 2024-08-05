import { Dimensions, StyleSheet, View } from "react-native";
import CommonTitle from "../CommonTitle";
import { useTranslation } from "react-i18next";
import ShowAll from "./ShowAll";
import ContentLoader from "react-content-loader";
import { Rect } from "react-native-svg";
import { SkeletonLoader } from "../SkeletonLoader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { searchFestival } from "@/lib/features/event";

export default function HotPlace() {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const { events } = useSelector((state: RootState) => state.event)
 
    console.log(events)

    useEffect(() => {
      // dispatch(searchFestival({ startDate: "20240705 "}))
    }, [])

    return (
      <View>
        <CommonTitle
          title={t("home.hotplace.title")}
          titleRight={<ShowAll href="/hotplace" />}
        />
        <View style={styles.hotPlace}>
          <HotPlaceLoader />
          {/* <HotPlaceLoader /> */}
        </View>
      </View>
    );
}

function HotPlaceLoader() {
  const width = Dimensions.get("window").width - 40;
  const height = 200;

  return (
    <SkeletonLoader height={height}>
      <Rect x="0" y="0" rx="5" ry="5" width={width} height={height} />
    </SkeletonLoader>
  )
}

const styles = StyleSheet.create({
  hotPlace: {
    marginTop: 10,
    gap: 20,
    // flexDirection: "row",
  }
})


