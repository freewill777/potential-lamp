import { Text } from "../../src/components";
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../enums";
import { useNavigation } from "expo-router";
import { SCREENS } from "../../src/constants/Screens";

type Notification = {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  avatar: string;
  source: string;
};

const _notifications: Notification[] = [
  {
    id: "1",
    title: "title",
    content: "John Attends Ski Tournament One 🎿",
    image: "image",
    createdAt: "12/12/2023",
    avatar: "https://picsum.photos/200/300",
    source: "",
  },
  {
    id: "2",
    title: "title",
    content:
      "🏆 Ski Tournament One Results Are In! 🏆 The moment you've been waiting for is here!",
    image: "image",
    createdAt: "12/12/2023",
    avatar: "https://picsum.photos/200/300",
    source: "Marius Manole",
  },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const navigation = useNavigation();

  const handleItemPress = (notification: Notification) => {
    // @ts-ignore
    navigation.navigate(SCREENS.CHAT, {
      contactId: notification.id,
      username: notification.source || "",
    });
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleItemPress(item)}
    >
      <View>
        <Image
          source={{
            uri: item.avatar,
          }}
          style={styles.image}
        />
        <FontAwesome
          name="group"
          size={20}
          color={Colors.TurquoiseDark}
          style={styles.ribbon}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text numberOfLines={2} ellipsizeMode="tail">
            <Text style={{ color: Colors.Gray }}>{item.source}</Text>
            {Boolean(item.source.length) && ": "}
            {item.content}
          </Text>
        </View>
        <Text>{item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    setNotifications(_notifications);
  }, []);

  return (
    <>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};
export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    paddingHorizontal: 10,
    borderColor: Colors.Gray,
    borderWidth: 0.3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.TurquoiseDark,
  },
  innerContainer: { width: "80%" },
  ribbon: {
    position: "absolute",
    right: 3,
    bottom: -3,
    padding: 2,
  },
});
