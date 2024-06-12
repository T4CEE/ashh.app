import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Octicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Octicons name="home" size={22} color={focused
              ? (colorScheme === 'dark' ? "white" : "black") // color when focused
              : (colorScheme === 'dark' ? "gray" : "gray") // color when not focused
            } />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <EvilIcons name="search" size={27} color={focused
              ? (colorScheme === 'dark' ? "white" : "black") // color when focused
              : (colorScheme === 'dark' ? "gray" : "gray") // color when not focused
            } />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <EvilIcons name="user" size={24} color={focused
              ? (colorScheme === 'dark' ? "white" : "black") // color when focused
              : (colorScheme === 'dark' ? "gray" : "gray") // color when not focused
            } />
          ),
        }}
      />
    </Tabs>


  );
}
