import { useNavigation } from "expo-router";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const HeaderButtonsBar = () => {
  const { navigate } = useNavigation();

  return (
    <View style={{ flexDirection: "row" }}>
      <Pressable onPress={() => {}}>
        {({ pressed }) => (
          <MaterialIcons
            name="addchart"
            size={24}
            color="#696969"
            style={{
              marginRight: 15,
              marginTop: 1,
              opacity: pressed ? 0.5 : 1,
            }}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() =>
          //@ts-ignore
          navigate("index", { id: "" })
        }
      >
        {({ pressed }) => (
          <Ionicons
            name="ios-notifications-circle-outline"
            size={28}
            color="#696969"
            style={{
              marginRight: 15,
              marginTop: 1,
              opacity: pressed ? 0.5 : 1,
            }}
          />
        )}
      </Pressable>
      <Pressable onPress={() => {}}>
        {({ pressed }) => (
          <Ionicons
            name="ios-chatbubble-outline"
            size={24}
            color="#696969"
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="search"
            size={24}
            color="#696969"
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            onPress={() => {}}
          />
        )}
      </Pressable>
    </View>
  );
};

export default HeaderButtonsBar;
