import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { supabase } from "../src/lib/supabase";
import { PostCard, FriendSystem, UserProfile } from "../src/components";
import { useSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Post, User } from "../src/lib/api";
const VisitingProfile = () => {
  const { userId } = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
const [userProfile, setUserProfile] = useState<User | null>(null);
useEffect(() => {
    fetchPosts();
fetchUserProfile();
}, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId);
    if (error) console.log("Error fetching posts: ", error);
    else setPosts(data);
  };
const fetchUserProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) console.log("Error fetching user profile: ", error);
    else setUserProfile(data);
  };
return (
    <View>
<Stack.Screen options={{ title: userProfile?.username || "" }} />
      {userProfile && <UserProfile profile={userProfile} />}
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
