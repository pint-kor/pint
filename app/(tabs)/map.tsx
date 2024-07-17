import PintMap from "@/components/map/PintMap";
import { ThemedView } from "@/components/ThemedView";
import { RootState } from "@/lib/store";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

export default function ExploreScreen() {
    const user = useSelector((state: RootState) => state.user.user);

    if (!user) {
        return (
            <Redirect href="/login" />
        )
    }
    
    return (
      <ThemedView style={{ flex: 1, }}>
        {/* <KakaoMap /> */}
        <PintMap />
      </ThemedView>
    );
}