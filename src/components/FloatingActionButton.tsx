import { Feather, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, Dimensions, View } from "react-native";
import Colors from "../../enums";
import { useState } from "react";
import { Text } from "./Themed";
const { height } = Dimensions.get("window");

const FloatingActionButton = ({
  onPress,
  showMoreAddOptions,
  setShowMoreAddOptions,
}: {
  onPress: Function;
  showMoreAddOptions: boolean;
  setShowMoreAddOptions: Function;
}) => {
  return (
    <>
      {!showMoreAddOptions && (
        <FloatingActionButtonSingleRoot
          onPress={() => setShowMoreAddOptions(!showMoreAddOptions)}
          text=""
        />
      )}
      {showMoreAddOptions && (
        <View style={styles.overlay}>
          <FloatingActionButtonSingleRoot
            onPress={() => setShowMoreAddOptions(!showMoreAddOptions)}
            text=""
            onPhotoTaken={() => setShowMoreAddOptions(false)}
          />
          <FloatingActionButtonSingleRoot
            style={{ marginVertical: height / 7 + 80, paddingRight: 7 }}
            Icon={() => (
              <Feather name="file" size={18} color={Colors.GrayBeige} />
            )}
            text="Create new story"
            onPress={onPress}
            onPhotoTaken={() => setShowMoreAddOptions(false)}
          />
          <FloatingActionButtonSingleRoot
            style={{ marginVertical: height / 7 + 140, paddingRight: 7 }}
            Icon={() => (
              <Feather name="camera" size={18} color={Colors.GrayBeige} />
            )}
            text="Create new post"
            onPress={onPress}
            onPhotoTaken={() => setShowMoreAddOptions(false)}
          />
          <FloatingActionButtonSingleRoot
            style={{ marginVertical: height / 7 + 200, paddingRight: 7 }}
            Icon={() => (
              <Feather name="tv" size={18} color={Colors.GrayBeige} />
            )}
            text="Create new reel"
            onPress={onPress}
            onPhotoTaken={() => setShowMoreAddOptions(false)}
          />
        </View>
      )}
    </>
  );
};

const FloatingActionButtonSingleRoot = ({
  style,
  onPress,
  Icon,
  text,
  onPhotoTaken,
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
              borderRadius: 50,
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
              borderRadius: 50,
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
});
