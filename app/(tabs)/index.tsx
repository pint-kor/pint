import { StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import Recommend from '@/components/Recommend';
import UpComingEvents from '@/components/home/UpComingEvents';
import HotPlace from '@/components/home/HotPlace';
import PlacePostModal from '@/components/blog/PlacePostModal';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { use } from 'i18next';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {

  }, [])

  const styles = useMemo(() => StyleSheet.create({
    content: {
        flex: 1,
        padding: 20,
        gap: 25,
    },

}), [])

  return (
    <ThemedView style={{ flex: 1, }}>
      <HomeHeader />
      <Animated.ScrollView>
        <ThemedView style={styles.content}>
          <UpComingEvents />
          <HotPlace />
        </ThemedView>
      </Animated.ScrollView>
      <Recommend />
    </ThemedView>
  );
}

function HomeHeader() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();

  const styles = useMemo(() => StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: insets.top,
      marginTop: 5,
      marginHorizontal: 20,
    },
    headerRight: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    headerLeft: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    }
  }), [colorScheme])

  return (
    <ThemedView style={styles.header}>
      <View style={styles.headerLeft}></View>
      <View style={styles.headerRight}>
        <Ionicons
          name="notifications"
          size={28}
          color={Colors[colorScheme].text}
          onPress={() => router.push("/notification")}
        />
        <Ionicons name="search" size={28} color={Colors[colorScheme].text} onPress={() => router.push("/search")} />
      </View> 
    </ThemedView>
  );
}