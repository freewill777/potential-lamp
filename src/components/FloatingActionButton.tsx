import { Feather, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Colors from "../../enums";
import { useState } from "react";

const { height } = Dimensions.get("window");

const FloatingActionButtonSingle = ({ style, onPress, Icon }: any) => {
  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: Colors.TurquoiseDark }, style]}
      onPress={onPress}
    >
      {Icon ? (
        <Icon />
      ) : (
        <MaterialIcons
          name="add"
          size={25}
          color={Colors.GrayBeige}
          style={{ borderColor: Colors.GrayBeige }}
        />
      )}
    </TouchableOpacity>
  );
};

const FloatingActionButton = () => {
  const [showMoreAddOptions, setShowMoreAddOptions] = useState(false);

  return (
    <>
      <FloatingActionButtonSingle
        onPress={() => setShowMoreAddOptions(!showMoreAddOptions)}
      />
      {showMoreAddOptions && (
        <>
          <FloatingActionButtonSingle
            style={{ marginVertical: height / 7 + 60 }}
            Icon={() => (
              <Feather name="file" size={18} color={Colors.GrayBeige} />
            )}
          />
          <FloatingActionButtonSingle
            style={{ marginVertical: height / 7 + 120 }}
            Icon={() => (
              <Feather name="camera" size={18} color={Colors.GrayBeige} />
            )}
          />
          <FloatingActionButtonSingle
            style={{ marginVertical: height / 7 + 180 }}
            Icon={() => (
              <Feather name="tv" size={18} color={Colors.GrayBeige} />
            )}
          />
        </>
      )}
    </>
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
    borderRadius: 30,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
