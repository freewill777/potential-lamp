import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { fetchPosts, Post } from "../lib/api";
import PostCard from "./PostCard";
import { FriendSystem } from "./FriendSystem";
import { Text } from "./Themed";

const UserPostsView = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      fetchPosts().then((posts) => {
        const filtered = posts.filter((post) => post.user_id === userId);
        setPosts(filtered);
      });
    };

    getPosts();
  }, [userId]);

  useEffect(() => {
    posts.map((post) => console.log(post.user_id));
  }, [posts]);

  if (posts.length === 0) {
    return (
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Text>No posts</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {/* <FriendSystem userId={userId} /> */}
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <PostCard post={item} onDelete={() => {}} key={index} />
        )}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
};

export default UserPostsView;
