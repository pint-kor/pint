import { View } from "react-native";
import CommonTitle from "../CommonTitle";
import ShowAll from "./ShowAll";

export default function TodayRecommendPlace() {
    return (
        <View>
            <CommonTitle title="오늘의 추천 장소" titleRight={<ShowAll href="/recommend-place" />}/>
        </View>
    )
}