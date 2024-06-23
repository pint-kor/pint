import { View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function CommonTitle({ title="title", titleRight }: { title?: string, titleRight?: React.JSX.Element }) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, }}>
            <ThemedText style={{fontWeight: '800', fontSize: 15}}>{title}</ThemedText>
            {titleRight}
        </View>
    )
}