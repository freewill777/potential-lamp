import {
  FlatList,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Text, ReelCard } from "../../src/components";
import Colors from "../../enums";
import { useEffect, useState } from "react";
import { Events, Profile, fetchReels } from "../../src/lib/api";
import { supabase } from "../../src/lib/supabase";

type TReel = {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  video: string;
  user_id: string;
  profile?: Profile;
};

const ReelsScreen = () => {
  const [reels, setReels] = useState<Events>([]);

  useEffect(() => {
    fetchReels().then(setReels);
  }, []);

  async function deleteEvent(id: string) {
    await supabase.from("reels").delete().match({ id });
    setReels(reels.filter((event) => event.id !== id));
  }

  const renderItem = ({ item, index }: { item: TReel; index: number }) => (
    <ReelCard mainEntity={item} deleteMainEntity={deleteEvent} key={index} />
  );

  return (
    <ScrollView>
      <SafeAreaView>
        <FlatList
          data={reels}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default ReelsScreen;

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
