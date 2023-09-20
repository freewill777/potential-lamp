import { Image, Platform, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import { SCREENS } from "../../src/constants/Screens";
import Colors from "../../enums";
import {
  HeaderButtonsBar,
  TabBarIcon,
  FloatingActionButton,
  logoMainImage,
  AddPostForm,
} from "../../src/components";
import useColorScheme from "../../src/hooks/useColorScheme";
import { handleSubmitPost, handleTakePhoto } from "../handles";

export default function TabLayout() {
  const [image, setImage] = useState("");
  const [showMoreAddOptions, setShowMoreAddOptions] = useState(false);

  const theme = useColorScheme();
  return (
    <>
      {!!image.length && (
        <AddPostForm
          theme={theme}
          onSubmit={(content: string, image: string) =>
            handleSubmitPost(content, image)
          }
          imageUri={image}
          reset={() => setImage("")}
        />
      )}
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
          name={SCREENS.REEL}
          options={{
            title: "Reels",
            ...screenOptions,
            unmountOnBlur: true,
            tabBarIcon: ({ color }: any) => (
              <TabBarIcon name="tv" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name={SCREENS.MESSAGES}
          options={{
            title: "Messenger",
            ...screenOptions,
            tabBarIcon: ({ color }: any) => (
              <TabBarIcon name="wechat" color={color} />
            ),
            headerLeft: () => (
              <Image
                source={logoMainImage}
                style={{ width: 70, height: 70, marginLeft: 10 }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name={SCREENS.PROFILE}
          options={{
            title: "Profile",
            ...screenOptions,
            tabBarIcon: ({ color }: any) => (
              <TabBarIcon name="user" color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingActionButton
        showMoreAddOptions={showMoreAddOptions}
        setShowMoreAddOptions={setShowMoreAddOptions}
        onPress={async () => {
          const uri = await handleTakePhoto();
          if (uri) {
            setImage(uri);
            setShowMoreAddOptions(false);
          }
        }}
      />
    </>
  );
}

export const screenOptions = {
  tabBarIcon: ({ color }: any) => <TabBarIcon name="home" color={color} />,
  header: () => (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: Platform.OS === "android" ? 25 : 0,
        padding: 0,
      }}
    >
      <Image
        source={logoMainImage}
        style={{ width: 70, height: 50, marginLeft: 10 }}
      />
      <HeaderButtonsBar />
    </SafeAreaView>
  ),
  headerTitle: "",
};
