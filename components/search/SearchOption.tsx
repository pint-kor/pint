import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { searchWithProperties, setCenter, setSort } from '@/lib/features/search';
import { useTranslation } from 'react-i18next';

export default function SearchOption() {
    const { t } = useTranslation();
    const colorScheme = useColorScheme() ?? "light";
    const dispatch = useDispatch<AppDispatch>();
    const { sort, center } = useSelector((state: RootState) => state.search)

    const changeSort = useCallback(() => {
        dispatch(setSort(sort === "accuracy" ? "distance" : "accuracy"))
        dispatch(searchWithProperties())
      }, [dispatch, sort])
  
      const changeCenter = useCallback(() => {
        dispatch(setCenter(center === "my" ? "map" : "my"))
        dispatch(searchWithProperties())
      }, [dispatch, center])

    const styles = useMemo(() => StyleSheet.create({
        searchOptionContainer: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: 20,
            gap: 10,
        },
        searchOption: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
            borderColor: Colors[colorScheme].text,
            borderWidth: 1,
            padding: 5,
            borderRadius: 10,
        }
    }), [])

    return (
        <View style={styles.searchOptionContainer}>
        <View
          style={styles.searchOption}
        >
          <ThemedText
            onPress={() => changeSort()}
            style={{ userSelect: "none" }}
          >
            {t(`map.option.${sort}`)}
          </ThemedText>
        </View>
        <View
          style={styles.searchOption}
        >
          <ThemedText
            onPress={() => changeCenter()}
            style={{ userSelect: "none" }}
          >
            {t(`map.option.${center}`)}
          </ThemedText>
        </View>
      </View>
    );
}