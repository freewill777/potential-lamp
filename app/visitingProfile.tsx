import React, { useEffect, useState } from "react";
import { FlatList, View, Dimensions } from "react-native";
import { supabase } from "../src/lib/supabase";
import { ProfileForm, SimplePostCard } from "../src/components";
import { useSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Post } from "../src/lib/api";
import { useUserInfo } from "../src/lib/userContext";

const VisitingProfile = () => {
  const { userId: visitingUserId } = useSearchParams();
  console.log("visitingUserId", visitingUserId);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const { saveProfile } = useUserInfo();

  useEffect(() => {
    fetchPosts();
    fetchUserProfile();
  }, []);

  // useEffect(() => {
  //   console.log("__visitingUserProfile", userProfile);
  // }, [userProfile]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", visitingUserId);
    if (error) console.log("Error fetching posts: ", error);
    else setPosts(data);
  };

  const fetchUserProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", visitingUserId);
    if (error) {
      console.log(error);
    } else {
      setUserProfile((prevUserInfo: any) => ({
        ...prevUserInfo,
        profile: data[0],
      }));
    }
  };

  const { profile: visitingProfile } = userProfile ?? {};

  return (
    <View>
      <Stack.Screen options={{ title: userProfile?.username || "" }} />
      <View style={{ height: Dimensions.get("window").height / 9 }}>
        {userProfile && (
          <ProfileForm
            profile={visitingProfile}
            loading={!!userProfile}
            onSave={saveProfile!}
            onLogout={() => supabase.auth.signOut()}
            visiting
          />
        )}
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SimplePostCard post={item} key={index} />
        )}
      />
    </View>
  );
};

export default VisitingProfile;
