import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchWithProperties, setFocusId, setIsOpenSearchModal, setPage } from "@/lib/features/search";
import { AppDispatch, RootState } from "@/lib/store";
import { FlashList } from "@shopify/flash-list";
import { ThemedView } from "../ThemedView";
import { useRouter } from "expo-router";

export default function PlaceContainer({
  canLoadInfinite = false,
  result,
}: {
  canLoadInfinite?: boolean;
  result: any[];
}) {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { searchResult, searchPage } = useSelector(
    (state: RootState) => state.search
  );

  const stickyHeaderIndices = useMemo(() => {
    const ret = []
    for (let i=0; i<result.length; i++) {
      if (typeof result[i] !== "string") continue
      if ((result[i] as string).startsWith("sticky_header")) {
        ret.push(i);
      }
    }
    return ret;
  }, [result])

  // place를 클릭하면 해당 place로 focus
  const focusPlace = useCallback((placeId: number) => {
    // dispatch(setIsOpenSearchModal(false));
    dispatch(setFocusId(placeId));
    router.push("/map")
  }, [dispatch]);

  const onEndReached = () => {
    console.log("end");
    dispatch(setPage(searchPage + 1));
    dispatch(searchWithProperties());
  };

  return (
    <View style={styles.container}>
      <View style={styles.place_container}>
        <FlashList
          data={result}
          renderItem={({ item }) => {
            if (item === "sticky_header_place") {
              return (
                <ThemedView style={styles.sticky_header}>
                  <ThemedText
                    style={{ fontSize: 17, fontWeight: 800 }}
                    key={"sticky_header_place"}
                  >
                    {t("search.searchresult.menu.place")}
                  </ThemedText>
                </ThemedView>
              );
            }

            return <Pressable key={item.id} onPress={() => focusPlace(item.id)}>
              <ThemedText style={styles.place_title}>
                {item.displayName.text}
              </ThemedText>
              <ThemedText style={{ ...styles.place_address }}>
                {item.formattedAddress}
              </ThemedText>
            </Pressable>
          }}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.9}
          stickyHeaderIndices={stickyHeaderIndices}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 10,
        height: "100%",
    },
    place_container: {
        gap: 15,
        width: Dimensions.get('window').width - 40,
        height: "100%",
    },
    place_title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    place_address: {
        fontSize: 15,
    },
    sticky_header: {
      paddingVertical: 10,
    }
})