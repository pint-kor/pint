import { RootState } from "@/lib/store"
import { useSelector } from "react-redux"
import { ThemedView } from "../ThemedView"
import { Animated, Image, StyleSheet, Text, View } from "react-native"
import { ThemedText } from "../ThemedText"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Colors } from "@/constants/Colors"
import { useMemo } from "react"

export default function EventMain() {
    const { events } = useSelector((state: RootState) => state.event)
    const colorScheme = useColorScheme() ?? "light";

    const styles = useMemo(() => StyleSheet.create({
        calendarText: {
            color: Colors[colorScheme].text,
            fontSize: 12,
        },
        eventTitle: {
            fontSize: 12,
            fontWeight: 'bold',
            lineHeight: 16
        }
    }), [colorScheme])

    return (
      <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ThemedView style={{ gap: 20, flexDirection: "row" }}>
          {events.map((event) => {
            return (
              <View style={{ flexDirection: "column", gap: 10, width: 190 }}>
                <Image
                  source={{ uri: event.firstimage }}
                  style={{ width: '100%', height: 240, borderRadius: 10 }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <ThemedText style={styles.eventTitle}>
                    {event.title}
                  </ThemedText>
                  {/* <ThemedText type="defaultSemiBold">{event.addr1}</ThemedText> */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <AntDesign
                      name="calendar"
                      size={14}
                      color={Colors[colorScheme].text}
                    />
                    <Text style={styles.calendarText}>
                      {event.eventstartdate}
                    </Text>
                    <Text style={styles.calendarText}>~</Text>
                    <Text style={styles.calendarText}>
                      {event.eventenddate}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ThemedView>
      </Animated.ScrollView>
    );
}