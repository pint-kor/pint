import { Pressable, StyleSheet, Text } from "react-native";
import PostSetting from "./PostSetting";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useMemo, useRef, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPostDate } from "@/lib/features/post";
import { RootState } from "@/lib/store";

const todayDate = new Date();

export default function PostVisitDate() {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const colorScheme = useColorScheme() ?? "light";
    const dispatch = useDispatch();
    const { currentPost: { date: { day, month, year }} } = useSelector((state: RootState) => state.post);
    const currentDate = useMemo(() => new Date(year, month, day), [year, month, day]);

    const handleConfirm = (selectedDate: Date) => {
        const currentDate = selectedDate
        hideDatePicker();
        dispatch(setCurrentPostDate({
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            day: currentDate.getDate(),
        }));
    }

    const showDatePicker = () => {
        setShow(true);
    }

    const hideDatePicker = () => {
        setShow(false)
    }

    const styles = useMemo(() => StyleSheet.create({
        pressable: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        },
        calendarText: {
            color: Colors[colorScheme].text,
            fontWeight: 'bold',
            fontSize: 15,
        }
    }), [])

    return (
      <PostSetting title={t("blog.visit-date")}>
        <Pressable onPress={showDatePicker} style={styles.pressable}>
            <Text style={styles.calendarText}>{`${currentDate.getFullYear()}.${currentDate.getMonth() + 1}.${currentDate.getDate()}`}</Text>
            <Ionicons name="calendar" size={24} color={Colors[colorScheme].text} />
        </Pressable>
        <DateTimePickerModal 
            isVisible={show}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={todayDate}
        />
      </PostSetting>
    );
}