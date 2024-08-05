import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import Recommend from "@/components/Recommend";
import UpComingEvents from "@/components/home/UpComingEvents";
import HotPlace from "@/components/home/HotPlace";
import PlacePostModal from "@/components/blog/PlacePostModal";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { use } from "i18next";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import DailyPosts from "@/components/home/DailyPosts";
import search from "@/lib/features/search";
import MapCurrentLocation from "@/components/home/MapCurrentLocation";
import TodayRecommendPlace from "@/components/home/TodayRecommendPlace";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {}, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          gap: 25,
        },
        content: {
          flex: 1,
          paddingHorizontal: 20,
          gap: 25,
        },
      }),
    []
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* <HomeHeader /> */}
      <ThemedView style={styles.container}>
        <ScrollView>
          <HomeLogo />
          <HomeHeaderMenu />
          <View style={styles.content}>
            <HomeSearchBar />
            <MapCurrentLocation />
            <TodayRecommendPlace />
            <DailyPosts />
            {/* <HotPlace /> */}
            <UpComingEvents />
          </View>
        </ScrollView>
      </ThemedView>
      <Recommend />
    </ThemedView>
  );
}

function HomeLogo() {
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "column",
          backgroundColor: "darkgreen",
          paddingTop: insets.top + 30,
          paddingBottom: 60,
          paddingHorizontal: 20,
          gap: 10,
        },
        logo: {
          fontSize: 28,
          fontWeight: "bold",
          color: "white",
        },
      }),
    []
  );

  const LogoText = ({ text }: { text: string }) => (
    <Text style={styles.logo}>{text}</Text>
  );

  return (
    <View style={styles.container}>
      <LogoText text="즐거움의" />
      <LogoText text="핀트를" />
      <LogoText text="핀트에서 !" />
    </View>
  );
}

function HomeHeaderMenu() {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();
  const { t } = useTranslation();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          top: -35,
          left: 0,
          // backgroundColor: "red",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        },
        menu: {
          borderRadius: 100,
          width: 75,
          height: 75,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors[colorScheme].background,
        },
        icon: {
          fontSize: 32,
          color: "green",
        },
        menuName: {
          position: "absolute",
          fontSize: 10,
          fontWeight: 'light',
          bottom: -15,
        },
      }),
    [colorScheme]
  );

  const MenuButton = ({
    children,
    onPress,
  }: {
    children: React.ReactNode;
    onPress?: () => void;
  }) => {
    return (
      <Pressable style={styles.menu} onPress={onPress}>
        {children}
      </Pressable>
    );
  };

  const MenuName = ({ name }: { name: string }) => {
    return <ThemedText style={styles.menuName}>{name}</ThemedText>;
  };

  return (
    <View style={styles.container}>
      <MenuButton onPress={() => router.push("/notification")}>
        <Ionicons name="notifications" style={styles.icon} />
        <MenuName name={t("home.menu.notification")} />
      </MenuButton>
      <MenuButton>
        <Feather name="feather" style={styles.icon} />
        <MenuName name={t("home.menu.blog")} />
      </MenuButton>
      <MenuButton onPress={() => router.push("/plan/place")}>
        <AntDesign name="filetext1" style={styles.icon} />
        <MenuName name={t("home.menu.ai-plan")} />
      </MenuButton>
      <MenuButton>
        <MaterialIcons name="emergency" style={styles.icon} />
        <MenuName name={t("home.menu.emergency")} />
      </MenuButton>
    </View>
  );
}

function HomeSearchBar() {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();

  const onPressSearch = () => {
    router.push("/search");
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        searchInput: {
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "green",
          width: "100%",
          height: 50,
          paddingHorizontal: 15,
          gap: 10,
        },
      }),
    []
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.searchInput} onPress={onPressSearch}>
        <Ionicons name="search" size={24} color="green" />
        <Text style={{ color: Colors[colorScheme].subBackground, flexGrow: 1 }}>
          search
        </Text>
        <Feather name="mic" size={24} color="green" />
      </Pressable>
    </View>
  );
}
