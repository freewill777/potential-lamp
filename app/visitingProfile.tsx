import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { supabase } from "../src/lib/supabase";
import { PostCard, FriendSystem } from "../src/components";
import { useSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Post } from "../src/lib/api";

const VisitingProfile = () => {
  const { userId } = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId);
    if (error) console.log("Error fetching posts: ", error);
    else setPosts(data);
  };

  return (
    <View>
      <Stack.Screen options={{ title: "" }} />
      {typeof userId === "string" && <FriendSystem userId={userId} />}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <PostCard post={item} key={index} />}
      />
    </View>
  );
};

export default VisitingProfile;
