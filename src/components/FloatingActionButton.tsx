import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, Dimensions, View } from "react-native";
import Colors from "../../enums";
import { useState } from "react";
import { Text } from "./Themed";
const { height } = Dimensions.get("window");
import { useNavigation } from "expo-router";
import { SCREENS } from "../constants/Screens";

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

const FloatingActionButton = ({
  onPress,
  showMoreAddOptions,
  setShowMoreAddOptions,
  setNewItemType,
}: {
  onPress: Function;
  showMoreAddOptions: boolean;
  setShowMoreAddOptions: Function;
  setNewItemType: Function;
}) => {
  const navigation = useNavigation();

  return (
    <>
      {!showMoreAddOptions && (
        <FloatingActionButtonSingleRoot
          onPress={() => setShowMoreAddOptions(!showMoreAddOptions)}
          text=""
          Icon={() => (
            <MaterialIcons name="add" size={32} color={Colors.GrayBeige} />
          )}
        />
      )}
      {showMoreAddOptions && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setShowMoreAddOptions(false)}
        >
          <View style={styles.overlay}>
            <FloatingActionButtonSingleRootBack
              onPress={() => setShowMoreAddOptions(!showMoreAddOptions)}
              text=""
              onPhotoTaken={() => setShowMoreAddOptions(false)}
            />
            <FloatingActionButtonSingleRoot
              style={{ marginVertical: height / 7 + 80, paddingRight: 6 }}
              Icon={() => (
                <Feather
                  name="camera"
                  size={17}
                  color={Colors.GrayBeige}
                  style={styles.icon}
                />
              )}
              text="Create new post"
              onPress={async () => {
                setNewItemType();
                await onPress(ItemType.POST);
              }}
              onPhotoTaken={() => setShowMoreAddOptions(false)}
            />
            <FloatingActionButtonSingleRoot
              style={{ marginVertical: height / 7 + 140, paddingRight: 6 }}
              Icon={() => (
                <Feather
                  name="tv"
                  size={17}
                  color={Colors.GrayBeige}
                  style={styles.icon}
                />
              )}
              text="Create new reel"
              onPress={async () => {
                setNewItemType(ItemType.REEL);
                await onPress(ItemType.REEL);
              }}
              onPhotoTaken={() => setShowMoreAddOptions(false)}
            />
            <FloatingActionButtonSingleRoot
              style={{ marginVertical: height / 7 + 200, paddingRight: 6 }}
              Icon={() => (
                <Feather
                  name="calendar"
                  size={17}
                  color={Colors.GrayBeige}
                  style={styles.icon}
                />
              )}
              text="Create new event"
              onPress={async () => {
                //@ts-ignore
                navigation.navigate(SCREENS.NEWEVENT);
                setShowMoreAddOptions(false);
              }}
              onPhotoTaken={() => setShowMoreAddOptions(false)}
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const FloatingActionButtonSingleRoot = ({
  style,
  onPress,
  Icon,
  text,
  is,
}: any) => {
  return (
    <TouchableOpacity style={[styles.fab, style]} onPress={onPress}>
      {Icon ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: Colors.BlackBlue,
              marginRight: 10,
              fontWeight: "900",
            }}
          >
            {text}
          </Text>
          <View
            style={{
              borderColor: Colors.GrayBeige,
              backgroundColor: Colors.TurquoiseDark,
              borderRadius: 150,
              padding: 15,
            }}
          >
            <Icon />
          </View>
        </View>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: Colors.BlackBlue, marginRight: 10 }}>
            {text}
          </Text>
          <View
            style={{
              borderColor: Colors.GrayBeige,
              backgroundColor: Colors.TurquoiseDark,
              borderRadius: 150,
              padding: 18,
            }}
          >
            <MaterialIcons name="add" size={25} color={Colors.GrayBeige} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const FloatingActionButtonSingleRootBack = ({
  style,
  onPress,
  Icon,
  text,
  is,
}: any) => {
  return (
    <TouchableOpacity style={[styles.fab, style]} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: Colors.BlackBlue, marginRight: 10 }}>{text}</Text>
        <View
          style={{
            backgroundColor: "#a3a3a3",
            borderRadius: 150,
            padding: 18,
          }}
        >
          <MaterialIcons name="arrow-back" size={25} color={Colors.White} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { FloatingActionButton };

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    marginVertical: height / 7,
    marginHorizontal: 30,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  icon: { width: 18, height: 18 },
});
