import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { fetchPosts, Post } from "../lib/api";
import PostCard from "./PostCard";
import { FriendSystem } from "./FriendSystem";

const UserPostsView = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const userPosts = await fetchPosts();
      setPosts(userPosts.filter((post) => post.user_id === userId));
    };

    getPosts();
  }, [userId]);

  return (
    <View>
      <FriendSystem userId={userId} />
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <PostCard post={item} onDelete={() => {}} key={index} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserPostsView;
