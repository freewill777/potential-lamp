import { Alert, Dimensions, FlatList, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import AddPostForm from "../../src/components/AddPostForm";
import { View } from "../../src/components/Themed";
import useColorScheme from "../../src/hooks/useColorScheme";
import { Posts, fetchPosts } from "../../src/lib/api";
import { supabase } from "../../src/lib/supabase";
import PostCard from "../../src/components/PostCard";
import { useUserInfo } from "../../src/lib/userContext";
import Stories from "../../src/subviews/Stories";

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Posts>([]);
  const theme = useColorScheme();
  const { profile } = useUserInfo();

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data));
  }, [profile]);

  const handleSubmit = async (content: string, image: string) => {
    try {
      let publicUrl = "";
      if (image) {
        const fileExt = image.split(".").pop();
        const fileName = image.replace(/^.*[\\\/]/, "");
        const filePath = `${Date.now()}.${fileExt}`;

        const formData = new FormData();
        const photo = {
          uri: image,
          name: fileName,
          type: `image/${fileExt}`,
        } as unknown as Blob;

        formData.append("file", photo);

        const { error } = await supabase.storage
          .from("posts")
          .upload(filePath, formData);
        if (error) throw error;

        const { data } = supabase.storage.from("posts").getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }

      const { data, error } = await supabase
        .from("posts")
        .insert({ content, image: publicUrl })
        .select("*, profile: profiles(username, avatar_url)");
      if (error) {
        throw error;
      } else {
        setPosts([data[0], ...posts]);
      }
    } catch (error: any) {
      Alert.alert("Server Error", error.message);
    }
  };

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
      <Stories />
      <AddPostForm theme={theme} onSubmit={handleSubmit} />
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item, index }) => (
          <PostCard
            onDelete={() => handleDeletePost(item.id)}
            post={item}
            containerStyles={index ? null : { borderTopWidth: 1 }}
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
