import { useNavigation } from "expo-router";
import {
  Pressable,
  View,
  TextInput,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSearchContext } from '../lib/searchContext';
const HeaderButtonsBar = ({ toggleDrawer }: { toggleDrawer: Function }) => {
  const { navigate } = useNavigation();
const { setSearchTerm } = useSearchContext();
return (
    <>
      <View style={styles.inputContainer}>
        <Ionicons
          name="ios-search"
          size={20}
          color="#696969"
          style={{ paddingHorizontal: 6 }}
        />
        <TextInput
          placeholder="Search..."
          placeholderTextColor={"#696969"}
          style={{
            marginLeft: 5,
            paddingRight: 10,
            fontFamily: "DMSans",
          }}
onChangeText={setSearchTerm}
/>
      </View>
      <Pressable>
        {({ pressed }) => (
          <Ionicons
            name="md-menu"
            size={32}
            color="#696969"
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            onPress={toggleDrawer as () => void}
          />
        )}
      </Pressable>
    </>
  );
};

export { HeaderButtonsBar };

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 2,
    marginRight: 10,
    borderColor: "#c9c9c9",
    borderWidth: 1,
    width: 230,
  },
});
