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

export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: session ? "(tabs)" : "auth",
// };

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
    return <AuthScreen />;
  }

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
