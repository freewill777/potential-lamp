import { Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { SCREENS } from "../../src/constants/Screens";
import Colors from "../../enums";
import {
  HeaderButtonsBar,
  TabBarIcon,
  FloatingActionButton,
  logoMainImage,
} from "../../src/components";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.TurquoiseDark,
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name={SCREENS.HOME}
          options={{
            title: "Home",
            ...screenOptions,
          }}
        />
        <Tabs.Screen
          name={SCREENS.MESSAGES}
          options={{
            title: "Messenger",
            ...screenOptions,
          }}
        />
        <Tabs.Screen
          name={SCREENS.PROFILE}
          options={{
            title: "Profile",
            ...screenOptions,
          }}
        />
        <Tabs.Screen
          name={SCREENS.REEL}
          options={{
            title: "Reels",
            ...screenOptions,
            unmountOnBlur: true,
          }}
        />
      </Tabs>
      <FloatingActionButton />
    </>
  );
}

export const screenOptions = {
  tabBarIcon: ({ color }: any) => <TabBarIcon name="home" color={color} />,
  headerRight: () => <HeaderButtonsBar />,
  headerLeft: () => (
    <Image
      source={logoMainImage}
      style={{ width: 70, height: 70, marginLeft: 10 }}
    />
  ),
  headerTitle: "",
};
