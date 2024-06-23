import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import Recommend from '@/components/Recommend';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { kakaoSignIn } from '@/lib/features/auth';
import { useEffect } from 'react';
import UpComingEvents from '@/components/home/UpComingEvents';
import HotPlace from '@/components/home/HotPlace';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <Animated.ScrollView>
        <ThemedView style={styles.content}>
          <ThemedText type="title">Pint</ThemedText>
          <UpComingEvents />
          <HotPlace />
        </ThemedView>
      </Animated.ScrollView>
      <Recommend />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 20,
        gap: 25,

    }
})
