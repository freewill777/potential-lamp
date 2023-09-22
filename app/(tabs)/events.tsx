import { FlatList, View, Image, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "../../src/components";
import Colors from "../../enums";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
};
const random = Math.random();

const defaultEvents: Event[] = Array(10).fill({
  id: String(random),
  title: "Snowboard Tournament",
  description: "Come and join us for a day of snowboarding!",
  date: "12/12/2023",
  location: "Lech, Austria",
  image: "https://picsum.photos/200/300",
});

const EventsScreen = () => {
  const events: Event[] = [...defaultEvents];
  const renderItem = ({ item }: { item: Event }) => (
    <View style={styles.renderItem}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text>{item.date}</Text>
      <Text>{item.location}</Text>
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
