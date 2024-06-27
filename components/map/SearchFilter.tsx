import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";

type CategoryCodeType = {
    [key: string]: string
}

export const CategoryCodes: CategoryCodeType = {
    "cafe": "CE7",
    "restaurant": "FD6",
    "accomodation": "AD5",
    "attraction": "AT4",
    "shopping": "MT1",
    "culture": "CT1",
    //"bar": "?" // No code
}

export default function SearchFilter({ filters, setFilter }: { filters: string[], setFilter: (filter: string[]) => void })  {
    const { t } = useTranslation();

    const styles = useMemo(() => {
        return StyleSheet.create({
            searchFilterContainer: {
                flexDirection: 'row',
                gap: 8,
                padding: 0,
                alignItems: 'center',
            }
        })
    }, [])

    const onPress = (filter: string) => {
        if (filters.includes(filter)) {
            setFilter(filters.filter(f => f !== filter));
        } else {
            setFilter([...filters, filter]);
        }
    }

    const isInFilter = useCallback((filter: string) => filters.includes(filter), [filters])

    return (
      <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.searchFilterContainer}>
          <FilterTag isMenu title={t("map.filter.title")} />
          <FilterTag title={t("map.filter.cafe")} onPress={() => onPress("cafe")} enabled={isInFilter("cafe")} />
          <FilterTag title={t("map.filter.restaurant")} onPress={() => onPress("restaurant")} enabled={isInFilter("restaurant")} />
          <FilterTag title={t("map.filter.accomodation")} onPress={() => onPress("accomodation")} enabled={isInFilter("accomodation")} />
          <FilterTag title={t("map.filter.attraction")} onPress={() => onPress("attraction")} enabled={isInFilter("attraction")} />
          <FilterTag title={t("map.filter.shopping")} onPress={() => onPress("shopping")} enabled={isInFilter("shopping")} />
          <FilterTag title={t("map.filter.culture")} onPress={() => onPress("culture")} enabled={isInFilter("culture")} />
          <FilterTag title={t("map.filter.bar")} onPress={() => onPress("bar")} enabled={isInFilter("bar")} />
        </View>
      </Animated.ScrollView>
    );
}

function FilterTag({ title, onPress, isMenu=false, enabled=false }: { title: string, onPress?: () => void, isMenu?: boolean, enabled?: boolean }) {
    const color = useColorScheme() ?? 'light';
  
    const styles = useMemo(() => StyleSheet.create({
      container: {
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 13,
        paddingVertical: 0,
        backgroundColor: enabled ? "#2299C8" : Colors[color].background,
        borderRadius: 20,
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowColor: 'black',
        shadowOpacity: 0.1,
      }
    }), [color, enabled]);
  
    return (
      <Pressable style={styles.container} onPress={onPress}>
        {isMenu && <FontAwesome5 name="filter" size={16} color={Colors[color].text} />}
        <ThemedText style={{fontSize: 10, fontWeight: 800}}>{title}</ThemedText>
      </Pressable>
    )
  }