import { Alert, Dimensions, FlatList, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import AddPostForm from "../../src/components/AddPostForm";
import { View } from "../../src/components/Themed";
import useColorScheme from "../../src/hooks/useColorScheme";
import { Posts, fetchPosts } from "../../src/lib/api";
import { supabase } from "../../src/lib/supabase";
import PostCard from "../../src/components/PostCard";
import { useUserInfo } from "../../src/lib/userContext";
//
export default function TabOneScreen() {
  const [posts, setPosts] = useState<Posts>([]);
  const { profile } = useUserInfo();

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, [profile]);

  const handleDeletePost = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      Alert.alert(error.message);
      console.log(error);
    } else {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item, index }) => (
          <PostCard
            onDelete={() => handleDeletePost(item.id)}
            post={item}
            containerStyles={index ? null : { borderBottomWidth: 1 }}
            key={index}
          />
        )}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.5, textAlign: "center" },
});
