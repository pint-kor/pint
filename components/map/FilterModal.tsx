import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { Pressable, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { searchWithProperties, setCenter, setIsOpenFilterModal, setSearchResult, setSort } from '@/lib/features/search'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { AppDispatch, RootState } from '@/lib/store'
import { useTranslation } from 'react-i18next'

export default function FilterModal() {
    const { t } = useTranslation();
    const colorScheme = useColorScheme() ?? "light";
    const dispatch = useDispatch<AppDispatch>();
    const { isOpenFilterModal, sort, center } = useSelector((state: RootState) => state.search);
    const ref = useRef<BottomSheet>(null)

    useEffect(() => {
        if (isOpenFilterModal) {
          ref.current?.expand();
        } else {
          ref.current?.close();
        }
    }, [isOpenFilterModal])

    const onUpdateSort = useCallback((sort: "distance" | "accuracy") => {
        dispatch(setSort(sort));
        dispatch(setSearchResult([]));
        dispatch(searchWithProperties());
    }, [dispatch])

    const onUpdateCenter = useCallback((center: "my" | "map") => {
        dispatch(setCenter(center));
        dispatch(setSearchResult([]));
        dispatch(searchWithProperties());
    }, [dispatch])

    return (
      <BottomSheet
        snapPoints={["40%"]}
        handleIndicatorStyle={{
          backgroundColor: "transparent",
        }}
        handleStyle={{
          backgroundColor: "transparent",
        }}
        backgroundStyle={{
          backgroundColor: Colors[colorScheme].background,
        }}
        containerStyle={{
          backgroundColor: "transparent",
        }}
        ref={ref}
        index={-1}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <ThemedView style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: 20,
              }}
            >
              <Ionicons
                name="close"
                size={24}
                color={Colors[colorScheme].text}
                onPress={() => dispatch(setIsOpenFilterModal(false))}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FilterSubtitle>
                <ThemedText type="subtitle">{t("map.option.sortoption")}</ThemedText>
              </FilterSubtitle>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
              >
                <FilterElement
                  active={sort === "accuracy"}
                  onPress={() => onUpdateSort("accuracy")}
                >
                  <ThemedText>{t("map.option.accuracy")}</ThemedText>
                </FilterElement>
                <FilterElement
                  active={sort === "distance"}
                  onPress={() => onUpdateSort("distance")}
                >
                  <ThemedText>{t("map.option.distance")}</ThemedText>
                </FilterElement>
              </View>
            </View>

            <View
              style={{
                padding: 20,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FilterSubtitle>
                <ThemedText type="subtitle">{t("map.option.centerlocation")}</ThemedText>
              </FilterSubtitle>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
              >
                <FilterElement active={center === "my"} onPress={() => onUpdateCenter("my")}>
                  <ThemedText>{t("map.option.my")}</ThemedText>
                </FilterElement>
                <FilterElement active={center === "map"} onPress={() => onUpdateCenter("map")}>
                  <ThemedText>{t("map.option.map")}</ThemedText>
                </FilterElement>
              </View>
            </View>
          </ThemedView>
        </BottomSheetView>
      </BottomSheet>
    );
}

const FilterElement = ({children, active = false, onPress}: {children: React.ReactNode, active?: boolean, onPress?: () => void}) => {
  const colorScheme = useColorScheme() ?? "light";

  const styles = useMemo(() => StyleSheet.create({
    filterComponent: {
      flexDirection: 'row',
      borderRadius: 20,
      borderColor: active ? Colors[colorScheme].text : Colors[colorScheme].subBackground,
      borderWidth: 2,
      flex: 1,
      justifyContent: 'center',
      padding: 5,
    }
  }), [colorScheme, active])

  return (
    <Pressable
      style={{
        ...styles.filterComponent,
      }}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

const FilterSubtitle = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemedText type="subtitle" style={{ flexDirection: "row", paddingVertical: 15, paddingLeft: 5, }}>{children}</ThemedText>
  );
}

