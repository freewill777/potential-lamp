import { StyleProp, TextStyle, ViewStyle } from "react-native";
import Colors from '../constants/Colors';
export default function styles() {
  const followingButton: StyleProp<ViewStyle> = {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
borderColor: Colors.light.primary, // use primary color for border
};

  const followButtonText: TextStyle = {
    fontWeight: "bold",
color: Colors.light.primary, // use primary color for text
};

  return {
    followingButton,
    followButtonText,
  };
}
