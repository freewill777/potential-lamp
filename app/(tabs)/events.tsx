import { FlatList, View, Image, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "../../src/components";
import Colors from "../../enums";
import { useEffect, useState } from "react";
import { Events, fetchEvents } from "../../src/lib/api";

type TEvent = {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  media: string;
};

const EventsScreen = () => {
  const [events, setEvents] = useState<Events>([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const renderItem = ({ item }: { item: TEvent }) => (
    <View style={styles.renderItem}>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>{item.date}</Text>
      <Text>{item.location}</Text>
      <Image source={{ uri: item.media }} style={styles.image} />
    </View>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default EventsScreen;

export const styles = StyleSheet.create({
  renderItem: {
    padding: 10,
    backgroundColor: Colors.White,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 5,
    borderColor: Colors.Gray,
    borderWidth: 0.3,
  },
  image: {
    width: "100%",
    height: 250,
  },
});
