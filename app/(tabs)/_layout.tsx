import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
  Text,
} from "../../src/components";
import useColorScheme from "../../src/hooks/useColorScheme";
import { handleSubmitPost, handleTakePhoto } from "../handles";
import DrawerPanel from "../../src/components/DrawerPanel";

export enum MediaFileType {
  IMAGE = "Image",
  VIDEO = "Video",
}

export enum ItemType {
  POST = "Post",
  REEL = "Reel",
  EVENT = "Event",
}

export type TMediaFileType = MediaFileType;
export type TItemType = ItemType;

export default function TabLayout() {
  const [mediaFile, setMediaFile] = useState("");
  const [mediaFileType, setMediaFileType] = useState<TMediaFileType | null>(
    null
  );
  const [newItemType, setNewItemType] = useState<TItemType | null>(null);
  const [showMoreAddOptions, setShowMoreAddOptions] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const theme = useColorScheme();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <>
      {!!mediaFile.length && (
        <AddPostForm
          theme={theme}
          onSubmit={(content: string, image: string) =>
            handleSubmitPost(content, image)
          }
          mediaUri={mediaFile}
          reset={() => {
            setMediaFile("");
            setNewItemType(null);
            setMediaFileType(null);
          }}
          newItemType={newItemType!}
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
            tabBarIcon: ({ color }: any) => (
              <TabBarIcon name="home" color={color} />
            ),
            header: () => <MainHeader toggleDrawer={toggleDrawer} />,
            headerTitle: "",
          }}
        />
        <Tabs.Screen
          name={SCREENS.NOTIFICATIONS}
          options={{
            title: "Notifications",
            header: () => <MainHeader toggleDrawer={toggleDrawer} />,
            headerTitle: "",
            unmountOnBlur: true,
            tabBarIcon: ({ color }: any) => (
              <TabBarIcon name="bell" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name={SCREENS.REELS}
          options={{
            title: "Reels",
            header: () => <MainHeader toggleDrawer={toggleDrawer} />,
            headerTitle: "",
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
            header: () => <MainHeader toggleDrawer={setShowDrawer} />,
            headerTitle: "",
            tabBarIcon: ({ color }: any) => (
              <TabBarIcon name="wechat" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name={SCREENS.PROFILE}
          options={{
            title: "Profile",
            header: () => <MainHeader toggleDrawer={toggleDrawer} />,
            headerTitle: "",
            tabBarIcon: ({ color }: any) => (
              <TabBarIcon name="user" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name={SCREENS.EVENTS}
          options={{
            title: "Profile",
            header: () => <MainHeader toggleDrawer={toggleDrawer} />,
            headerTitle: "",
            href: null,
          }}
        />
      </Tabs>
      {showDrawer && <DrawerPanel toggleDrawer={toggleDrawer} />}
      <FloatingActionButton
        showMoreAddOptions={showMoreAddOptions}
        setShowMoreAddOptions={setShowMoreAddOptions}
        onPress={async () => {
          const uri = await handleTakePhoto();
          if (uri) {
            setMediaFile(uri);
            setShowMoreAddOptions(false);
          }
        }}
        setNewItemType={setNewItemType}
        newItemType={newItemType!}
      />
    </>
  );
}

export const MainHeader = ({ toggleDrawer }: { toggleDrawer: Function }) => (
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
    <HeaderButtonsBar toggleDrawer={toggleDrawer} />
  </SafeAreaView>
);

const { width } = Dimensions.get("window");
