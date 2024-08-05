import PlanButton from "@/components/plan/PlanButton";
import PlanContainer from "@/components/plan/PlanContainer";
import PlanList from "@/components/plan/PlanList";
import PlanTitle from "@/components/plan/PlanTitle";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const periods = [
    "0", "1", "2", "3", "4", "5", "other",
]

export default function PlanPeriod() {
    const colorScheme = useColorScheme() ?? "light";
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <PlanContainer>
            <PlanTitle icon={<AntDesign name="calendar" size={24} color={Colors[colorScheme].text} />} title="여행 기간은?" />
            <PlanList>
                {periods.map((period) => {
                    return <PlanButton key={period} text={t(`plan.period.${period}`)} onPress={() => {
                        console.log(period);
                        router.push("/plan/withwho")
                    }} />;
                })}
            </PlanList>
        </PlanContainer>
    )
}