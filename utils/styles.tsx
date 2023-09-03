import { StyleProp, TextStyle, ViewStyle } from "react-native";

export default function styles() {
  const followingButton: StyleProp<ViewStyle> = {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
  };

  const followButtonText: TextStyle = {
    fontWeight: "bold",
    color: "red",
  };

  return {
    followingButton,
    followButtonText,
  };
}
