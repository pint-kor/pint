import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useColorScheme } from '@/hooks/useColorScheme';
import BackButton from '@/components/BackButton';
import { Pressable, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import WritePlacePostButton from '@/components/blog/WritePlacePostButton';
import PlacePostModal from '@/components/blog/PlacePostModal';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if (user.user.userId === '') {
    return <Redirect href="/login" />;
  }

  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light']?.text,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light']?.background,
          padding: 10,
          borderWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          tabBarButton: ({ children }) => <WritePlacePostButton>{children}</WritePlacePostButton>,
          title: '',
          tabBarIcon: ({ color, focused }) => (
            // Plus
            <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
    <PlacePostModal />
    </>
  );
}
