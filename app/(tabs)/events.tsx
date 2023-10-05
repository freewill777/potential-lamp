import {
  FlatList,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Text, EventCard } from "../../src/components";
import Colors from "../../enums";
import { useEffect, useState } from "react";
import { Events, fetchEvents } from "../../src/lib/api";
import { supabase } from "../../src/lib/supabase";

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

  async function deleteEvent(id: string) {
    await supabase.from("events").delete().match({ id });
    setEvents(events.filter((event) => event.id !== id));
  }

  const renderItem = ({ item, index }: { item: TEvent; index: number }) => (
    <EventCard event={item} deleteEvent={deleteEvent} key={index} />
  );

  return (
    <ScrollView>
      <SafeAreaView>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </ScrollView>
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
