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
import { useState } from 'react';
const HeaderButtonsBar = ({ toggleDrawer }: { toggleDrawer: Function }) => {
  const { navigate } = useNavigation();
const [searchTerm, setSearchTerm] = useState('');
const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.length > 0) {
      navigate('SearchResults', { query: text });
    } else {
      navigate('Home'); // Assuming 'Home' is the screen to navigate to when search is cleared
    }
  };
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
value={searchTerm}
          onChangeText={handleSearch}
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
