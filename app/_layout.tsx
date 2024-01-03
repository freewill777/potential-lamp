import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import AuthScreen from "./auth";
import { AuthProvider, useUserInfo } from "../src/lib/userContext";
import { SCREENS } from "../src/constants/Screens";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { ImageBackground } from "react-native";
import { splashBg } from "../src/components/AuthForm";
import { View } from "../src/components";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
    DMSans: require("../src/assets/fonts/DMSans-Regular.ttf"),
    ...FontAwesome.font,
  });

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

  const splashBg1 = require("../src/assets/images/splash1.png");

  if (!session) {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
          }}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <AuthScreen />
        </ImageBackground>
      </View>
    );
  }

  return (
    <>
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name={SCREENS.AUTH} options={{ headerShown: false }} />
          <Stack.Screen name={SCREENS.TABS} options={{ headerShown: false }} />
          <Stack.Screen
            name={SCREENS.CHAT}
            //@ts-ignore
            options={({ route }) => ({
              headerShown: true,
              title: route.params.username,
            })}
          />
        </Stack>
      </ThemeProvider>
    </>
  );
}
