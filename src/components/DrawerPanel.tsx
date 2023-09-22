import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { TabBarIcon } from "./TabBarIcon";
import Colors from "../../enums";
import { SCREENS } from "../constants/Screens";
import { FontAwesome } from "@expo/vector-icons";
import { logoMainImage } from "./AuthForm";
import { useNavigation } from "expo-router";

type MenuItem = {
  name: string;
  route: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { name: "Home", route: SCREENS.HOME, icon: "home" },
  { name: "Profile", route: SCREENS.PROFILE, icon: "user" },
  { name: "Events", route: SCREENS.EVENTS, icon: "calendar" },
  { name: "Notifications", route: SCREENS.NOTIFICATIONS, icon: "bell" },
  { name: "Reels", route: SCREENS.REELS, icon: "tv" },
  { name: "Messenger", route: SCREENS.MESSAGES, icon: "wechat" },
];

const DrawerPanel = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const navigation = useNavigation();
  const renderItem = ({ item }: { item: MenuItem }) => {
    return (
      <TouchableOpacity
        style={styles.renderItem}
        onPress={() => {
          toggleDrawer();
          navigation.navigate(item.route);
        }}
      >
        <TabBarIcon
          name={item.icon}
          color={Colors.TurquoiseDark}
          style={{ marginRight: 10, width: 33 }}
        />
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.overlay}>
      <Image
        source={logoMainImage}
        style={{
          width: 70,
          height: 50,
          marginLeft: 10,
          position: "absolute",
          top: height / 7,
        }}
      />
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default DrawerPanel;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.99)",
    zIndex: 1,
    width: width / 1.8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: "#c9c9c9",
    borderRightWidth: 0.3,
  },
  renderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
    marginHorizontal: 12,
    // marginLeft: 30,
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    borderColor: "#c9c9c9",
    borderWidth: 0.3,
  },
});
