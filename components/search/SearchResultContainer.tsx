import { useMemo, useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Animated, FlatList, Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";
import PlaceContainer from "./PlaceContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { FlashList } from "@shopify/flash-list";

type Menu = "all" | "place" | "event" | "user";

export default function SearchResultContainer() {
  const [menu, setMenu] = useState<Menu>("all");
  const { searchResult } = useSelector((state: RootState) => state.search)

  const result: any[] = useMemo(() => {
    const ret = []
      if (menu === "all" || menu === "place") {
        ret.push("sticky_header_place")
        ret.push(...searchResult);
      }
      return ret;
  }, [searchResult, menu])

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={styles.menuHeader}>
        <Menu menu={menu} setMenu={setMenu} type="all" />
        <Menu menu={menu} setMenu={setMenu} type="place" />
        <Menu menu={menu} setMenu={setMenu} type="event" />
        <Menu menu={menu} setMenu={setMenu} type="user" />
      </View>
      <View style={styles.content}>
        {(menu === "all" || menu === "place") && <PlaceContainer result={result} />}
      </View>
    </ThemedView>
  );
}

const Menu = ({
  menu,
  setMenu,
  type,
}: {
  menu: Menu;
  setMenu: (menu: Menu) => void;
  type: Menu;
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const { t } = useTranslation();

  return (
    <Pressable
      style={{
        ...styles.menu,
        backgroundColor: Colors[colorScheme].background,
        borderBottomColor:
          menu === type
            ? Colors[colorScheme].text
            : Colors[colorScheme].subBackground,
      }}
      onPress={() => setMenu(type)}
    >
      {type === "all" && (
        <MenuText>{t("search.searchresult.menu.all")}</MenuText>
      )}
      {type === "place" && (
        <MenuText>{t("search.searchresult.menu.place")}</MenuText>
      )}
      {type === "event" && (
        <MenuText>{t("search.searchresult.menu.event")}</MenuText>
      )}
      {type === "user" && (
        <MenuText>{t("search.searchresult.menu.user")}</MenuText>
      )}
    </Pressable>
  );
};

const MenuText = ({ children }: { children: string }) => {
  return (
    <ThemedText
      selectable={false}
      style={{
        fontSize: 15,
        fontWeight: 800,
      }}
    >
      {children}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  menuHeader: {
    flexDirection: "row",
    padding: 0,
    alignItems: "center",
    marginHorizontal: 10,
    borderBottomColor: "transparent",
  },
  menu: {
    flex: 1,
    width: 50,
    height: 50,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 10,
    flexDirection: 'column'
  }
});
