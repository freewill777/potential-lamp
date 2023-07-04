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

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <AuthProvider>
      {!loaded && <SplashScreen />}
      {loaded &&  <AppStack /> }
    </AuthProvider>
  );
}

function AppStack() {
  const colorScheme = useColorScheme();
  const { session } = useUserInfo();

  if (!session) {
    return <AuthScreen />
  }


  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name={SCREENS.AUTH} options={{ headerShown: false }} />
          <Stack.Screen name={SCREENS.TABS} options={{ headerShown: false }} />
          {/* @ts-ignore */}
          <Stack.Screen name={SCREENS.CHAT} options={({route}) => ({
            headerShown: true, 
            title: route.params.username
          })} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
