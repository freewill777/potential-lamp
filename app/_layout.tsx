import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import AuthScreen from "./auth";
import { AuthProvider, useUserInfo } from "../src/lib/userContext";
import { SCREENS } from "../src/constants/Screens";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
    DMSans: require("../src/assets/fonts/DMSans-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <AuthProvider>
      {!loaded && <SplashScreen />}
      {loaded && <AppStack />}
    </AuthProvider>
  );
}

function AppStack() {
  const { session } = useUserInfo();

  const [_permission, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

  if (!session) {
    return <AuthScreen />;
  }

  return (
    <>
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name={SCREENS.AUTH} options={{ headerShown: false }} />
          <Stack.Screen name={SCREENS.TABS} options={{ headerShown: false }} />
          {/* @ts-ignore */}
          <Stack.Screen
            name={SCREENS.CHAT}
            //@ts-ignore
            options={({ route }) => ({
              headerShown: true,
              title: route.params.username,
            })}
          />
          <Stack.Screen
            name={SCREENS.STORY}
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor: "white",
            }}
          />
        </Stack>
      </ThemeProvider>
    </>
  );
}
