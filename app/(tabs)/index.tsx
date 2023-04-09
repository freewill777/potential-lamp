import { FlatList, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import { Text, View } from "../../src/components/Themed";
import { supabase } from "../../src/lib/supabase";

export default function TabOneScreen() {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      console.log("error", error);
      return;
    }
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // console.log("posts", posts);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        renderItem={({ item }) => <Text>{item.content}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
