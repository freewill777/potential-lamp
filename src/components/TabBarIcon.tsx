import { FontAwesome } from "@expo/vector-icons";
import { StyleProp } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  style?: StyleProp<any>;
}) {
  const { name, color, style } = props;
  return <FontAwesome size={28} style={style} name={name} color={color} />;
}

export { TabBarIcon };
