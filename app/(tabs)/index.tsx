import { Alert, FlatList, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import AddPostForm from "../../src/components/AddPostForm";
import { View  } from "../../src/components/Themed";
import useColorScheme from "../../src/hooks/useColorScheme";
import { Posts, fetchPosts } from "../../src/lib/api";
import { supabase } from "../../src/lib/supabase";
import PostCard from "../../src/components/PostCard";

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Posts>([]);
  const theme = useColorScheme();

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
  }, []);

  // console.log("Estos son los posts:", posts);

  const handleSubmit = async (content: string) => {

    const { data, error } = await supabase
      .from("posts")
      .insert({ content })
      .select("*, profile: profiles(username)");

    if (error) {
      Alert.alert(error.message);
      console.log("error", error);
      return;
    } else {
      setPosts([data[0], ...posts]);
    }
  };

  const handleDeletePost = async (id: string) => {
   const { error } = await supabase.from("posts").delete().eq('id', id);
   if(error) {
      Alert.alert(error.message);
      console.log(error);
   } else {
    setPosts(posts.filter((post) => post.id !== id));
   }
  }

  return (
    <View style={styles.container}>
      <AddPostForm theme={theme} onSubmit={handleSubmit} />
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item }) => <PostCard onDelete={() => handleDeletePost(item.id)} post={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
