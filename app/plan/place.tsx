import PlanButton from "@/components/plan/PlanButton";
import PlanContainer from "@/components/plan/PlanContainer";
import PlanList from "@/components/plan/PlanList";
import PlanTitle from "@/components/plan/PlanTitle";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const places = [
    "강릉", "가평", "부산", "제주",
    "상하이", "베이징", "홍콩", "타이베이",
    "오사카", "나고야", "도쿄", "후쿠오카",
    "나트랑", "푸꾸옥", "세부", "발리", 
]

export default function PlanPage() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";

    return (
      <PlanContainer>
        <PlanTitle
          icon={<Ionicons name="airplane" size={24} color={Colors[colorScheme].text} />}
          title="떠나고 싶은 도시는?"
        />
        <PlanList>
          {places.map((place) => {
            return <PlanButton key={place} text={place} onPress={() => {
                console.log(place);
                router.push("/plan/period")
            }}/>;
          })}
        </PlanList>
      </PlanContainer>
    );
}