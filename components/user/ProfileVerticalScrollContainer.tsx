import { Dimensions, ScrollView } from "react-native";

export default function ProfileVerticalScrollContainer({ children }: {
    children: React.ReactNode
}) {
    return (
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={{
            paddingTop: 10,
            width: Dimensions.get("screen").width - 40,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            {children}
          </ScrollView>
    )
}