import PlanButton from "@/components/plan/PlanButton";
import PlanContainer from "@/components/plan/PlanContainer";
import PlanList from "@/components/plan/PlanList";
import PlanTitle from "@/components/plan/PlanTitle";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const withwho = [
    "solo", "friends", "couple", "family", "parents", "other"
]

export default function PlanWithWho() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";
    const { t } = useTranslation();

    return (
        <PlanContainer>
        <PlanTitle icon={<Octicons name="people" size={24} color={Colors[colorScheme].text} />} title="여행 기간은?" />
        <PlanList>
            {withwho.map((who) => {
                return <PlanButton key={who} text={t(`plan.withwho.${who}`)} onPress={() => {
                    console.log(who);
                    router.push("/plan/withwho")
                }} />;
            })}
        </PlanList>
    </PlanContainer>
    )
}