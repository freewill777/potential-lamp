import {
  Button as DefaultButton,
  Text as DefaultText,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";

import styles from "../../../utils/styles";
import Colors from "../../../enums";

export const SimpleButton = (props: DefaultButton["props"]) => {
  return (
    <TouchableOpacity style={styles().followingButton} {...props}>
      <DefaultText
        style={{ ...styles().followButtonText, color: Colors.TurquoiseDark }}
      >
        {props.title}
      </DefaultText>
    </TouchableOpacity>
  );
};
