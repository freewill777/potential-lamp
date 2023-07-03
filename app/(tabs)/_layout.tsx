import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../src/constants/Colors";
import { useUserInfo } from "../../src/lib/userContext";
import { SCREENS } from "../../src/constants/Screens";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { profile } = useUserInfo()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name={SCREENS.HOME}
        options={{
          title: "Inicio",
          headerTitle: "Plataforma Social",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name={SCREENS.MESSAGES}
        options={{
          title: "Mensajes",
          headerTitle: "Mensajes",
          tabBarIcon: ({ color }) => <TabBarIcon name="comment" color={color} />,
        }}
      />
       <Tabs.Screen
        name={SCREENS.PROFILE}
        options={{
          title: "Perfil",
          headerTitle: profile?.username || '',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
