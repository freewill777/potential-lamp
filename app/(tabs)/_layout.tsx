import React, { useState } from "react";
import { Tabs } from "expo-router";
import { SCREENS } from "../../src/constants/Screens";
import Colors from "../../enums";
import {
  MainHeader,
  TabBarIcon,
  FloatingActionButton,
  AddPostForm,
  DrawerPanel,
} from "../../src/components";
import useColorScheme from "../../src/hooks/useColorScheme";
import {
  handleSubmitPost,
  handleSubmitReel,
  handleTakeVideo,
  handleTakePhotoVideo,
} from "../handles";

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
  // const [mediaFileType, setMediaFileType] = useState<TMediaFileType | null>(
  //   null
  // );
  const [newItemType, setNewItemType] = useState<TItemType | null>(null);
  const [showMoreAddOptions, setShowMoreAddOptions] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const theme = useColorScheme();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const submitItem = (content: string, image: string) => {
    if (newItemType === ItemType.POST) {
      handleSubmitPost(content, image);
    }
    if (newItemType === ItemType.REEL) {
      handleSubmitReel(content, image);
    }
  };

  const reset = () => {
    setMediaFile("");
    setNewItemType(null);
    // setMediaFileType(null);
  };

  const onPressActionButton = async (type: string) => {
    if (type === ItemType.POST) {
      const uri = await handleTakePhotoVideo();
      if (uri) {
        setMediaFile(uri);
        setShowMoreAddOptions(false);
      }
    }
    if (type === ItemType.REEL) {
      const uri = await handleTakeVideo();
      if (uri) {
        setMediaFile(uri);
        setShowMoreAddOptions(false);
      }
    }
  };

  return (
    <>
      {!!mediaFile.length && (
        <AddPostForm
          theme={theme}
          onSubmit={submitItem}
          mediaUri={mediaFile}
          reset={reset}
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
            title: "Events",
            header: () => <MainHeader toggleDrawer={toggleDrawer} />,
            headerTitle: "",
            href: null,
          }}
        />
        <Tabs.Screen
          name={SCREENS.NEWEVENT}
          options={{
            title: "Submit New Event",
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
        onPress={onPressActionButton}
        setNewItemType={setNewItemType}
        // newItemType={newItemType}
      />
    </>
  );
}
