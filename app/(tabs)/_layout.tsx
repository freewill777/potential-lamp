import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";

import { Tabs } from "expo-router";
import { useColorScheme, Image } from "react-native";

import { useUserInfo } from "../../src/lib/userContext";
import { SCREENS } from "../../src/constants/Screens";
import HeaderButtonsBar from "../../subcomponents/HeaderButtonsBar";
import { Text } from "../../src/components/Themed";
import { logoMainImage } from "../../src/components/AuthForm";
import Colors from "../../enums";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconTV(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { profile } = useUserInfo();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.TurquoiseLight,
        headerShadowVisible: false,
        headerBackgroundContainerStyle: { height: 10 },
      }}
    >
      <Tabs.Screen
        name={SCREENS.HOME}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => <HeaderButtonsBar />,
          headerLeft: () => (
            <Image
              source={logoMainImage}
              style={{ width: 70, height: 70, marginLeft: 10 }}
            />
          ),
          headerTitle: "",
        }}
      />
      <Tabs.Screen
        name={SCREENS.MESSAGES}
        options={{
          title: "Messenger",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="comment" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={SCREENS.PROFILE}
        options={{
          title: "Profile",
          headerTitle: profile?.username || "",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name={SCREENS.REEL}
        options={{
          title: "Reels",
          headerTransparent: true,
          headerTitle: "",
          tabBarIcon: ({ color }) => <TabBarIconTV name="tv" color={color} />,
        }}
      />
    </Tabs>
  );
}
