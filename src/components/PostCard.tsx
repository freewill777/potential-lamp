import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Likes, Post, Profile, downloadAvatar, fecthLikes } from "../lib/api";
import { Card, Text, useThemeColor } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useUserInfo } from "../lib/userContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import Avatar from "./Avatar";
import { supabase } from "../lib/supabase";
import Colors from "../../enums";

interface PostCardProps {
  post: Post;
  onDelete: () => void;
  containerStyles?: any;
}

export default function PostCard({
  post,
  onDelete,
  containerStyles,
}: PostCardProps) {
  const color = useThemeColor({}, "primary");
  const profile = post.profile as Profile;
  const user = useUserInfo();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [likes, setLikes] = useState<Likes>([]);

  const userLikesPost = useMemo(
    () => likes?.find((like) => like.user_id === user?.profile?.id),
    [likes, user]
  );

  const getLikes = useCallback(
    () => fecthLikes(post.id).then(setLikes),
    [post]
  );

  useEffect(() => {
    getLikes();
  }, [getLikes]);

  useEffect(() => {
    if (profile?.avatar_url) {
      downloadAvatar(profile.avatar_url).then(setAvatarUrl);
    }
  }, [profile]);

  const toggleLike = async () => {
    if (!user.profile) return;

    if (userLikesPost) {
      // delete this
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("id", userLikesPost.id);
      if (error) Alert.alert(error.message);
    } else {
      const { error } = await supabase.from("post_likes").insert({
        post_id: post.id,
        user_id: user?.profile?.id,
      });

      if (error) Alert.alert(error.message);
    }

    getLikes();
  };

  function confirmDelete() {
    Alert.alert("Delete post", "Are you sure you want to delete the post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => onDelete() },
    ]);
  }

  return (
    <Card style={[styles.container, containerStyles]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Card style={styles.header}>
            <Avatar uri={avatarUrl} />
            <Text style={styles.username}>{profile?.username}</Text>
          </Card>
          {post?.content && (
            <Card style={styles.content}>
              <Text style={styles.contentText}>{post?.content}</Text>
            </Card>
          )}
        </View>
        <View>
          <Card style={styles.footer}>
            <TouchableOpacity
              onPress={toggleLike}
              style={{ flexDirection: "row", alignItems: "flex-end" }}
            >
              <FontAwesome
                name={userLikesPost ? "heart" : "heart-o"}
                size={24}
                color={"#0f4358"}
                style={{ marginHorizontal: 10 }}
              />
              {likes.length >= 0 && (
                <Text style={{ marginHorizontal: 10 }}>{likes.length}</Text>
              )}
            </TouchableOpacity>

            {user?.profile?.id === post.user_id && (
              <TouchableOpacity onPress={confirmDelete}>
                <FontAwesome
                  name="trash-o"
                  size={24}
                  color={"#0f4358"}
                  style={{ marginHorizontal: 10 }}
                />
              </TouchableOpacity>
            )}
          </Card>
        </View>
      </View>
      {post.image && (
        <Card style={styles.imageContainer}>
          <Image source={{ uri: post.image }} style={styles.image} />
        </Card>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderColor: "#99a1a8",
    borderTopWidth: 1,
    marginHorizontal: 10,
    backgroundColor: Colors.GrayBeige,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    // borderColor: "red",
    borderWidth: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.GrayBeige,
  },
  username: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.GrayBeige,
    marginLeft: 5,
  },
  contentText: {
    fontSize: 16,
    backgroundColor: Colors.GrayBeige,
  },
  footer: {
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.GrayBeige,
  },
  imageContainer: {
    height: 400,
    marginTop: 8,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
