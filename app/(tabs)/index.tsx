import { FlatList, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import AddPostForm from "../../src/components/AddPostForm";
import { Text, View } from "../../src/components/Themed";
import useColorScheme from "../../src/hooks/useColorScheme";
import { Posts, fetchPosts } from "../../src/lib/api";
import { supabase } from "../../src/lib/supabase";

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Posts>([]);
  const theme = useColorScheme();

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
  }, []);

  const handleSubmit = async (content: string) => {
    alert(content);
    const { data, error } = await supabase
      .from("posts")
      .insert({ content })
      .select();

    if (error) {
      console.log("error", error);
      return;
    } else {
      setPosts([data[0], ...posts]);
    }
  };

  return (
    <View style={styles.container}>
      <AddPostForm theme={theme} onSubmit={handleSubmit} />
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item }) => <Text>{item.content}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
