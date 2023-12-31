import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Video } from "expo-av";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Card, Text } from "./Themed";
import { useUserInfo } from "../lib/userContext";
import Avatar from "./Avatar";
import { supabase } from "../lib/supabase";
import Colors from "../../enums";
import {
  PostInteractions,
  Post,
  Profile,
  downloadAvatar,
  fetchPostInteractions,
} from "../lib/api";
import { SingleComment } from "./SingleComment";

export enum InteractionType {
  Like = "like",
  Comment = "comment",
  Share = "share",
}

export interface PostCardProps {
  post: Post;
  onDelete?: () => void;
  containerStyles?: any;
}

export default function PostCard({
  post,
  onDelete,
  containerStyles,
}: PostCardProps) {
  const profile = post.profile as Profile;
  const user = useUserInfo();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [interactions, setInteractions] = useState<PostInteractions>([]);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const navigation = useNavigation();

  const postLikes = useMemo(
    () =>
      interactions?.filter(
        (interaction) => interaction.interaction_type === InteractionType.Like
      ),
    [interactions]
  );

  const postComments = useMemo(
    () =>
      interactions?.filter(
        (interaction) =>
          interaction.interaction_type === InteractionType.Comment
      ),
    [interactions]
  );

  const postShares = useMemo(
    () =>
      interactions?.filter(
        (interaction) => interaction.interaction_type === InteractionType.Share
      ),
    [interactions]
  );

  const userLikesPost = useMemo(
    () =>
      postLikes?.find(
        (interaction) => interaction.user_id === user?.profile?.id
      ),
    [interactions, user]
  );

  const getPostInteractions = useCallback(
    () => fetchPostInteractions(post.id).then(setInteractions),
    [post]
  );

  useEffect(() => {
    getPostInteractions();
  }, [getPostInteractions]);

  useEffect(() => {
    if (profile?.avatar_url) {
      downloadAvatar(profile.avatar_url).then(setAvatarUrl);
    }
  }, [profile]);

  const toggleLike = async () => {
    if (!user.profile) return;

    if (userLikesPost) {
      const { error } = await supabase
        .from("post_interactions")
        .delete()
        .eq("id", userLikesPost.id);
      if (error) Alert.alert(error.message);
    } else {
      const { error } = await supabase.from("post_interactions").insert({
        post_id: post.id,
        user_id: user?.profile?.id,
        interaction_type: InteractionType.Like,
      });

      if (error) Alert.alert(error.message);
    }

    getPostInteractions();
  };

  const deleteComment = async (id: string) => {
    const { error } = await supabase
      .from("post_interactions")
      .delete()
      .eq("id", id);
    if (error) Alert.alert(error.message);
    getPostInteractions();
  };

  function confirmDelete() {
    Alert.alert("Delete post", "Are you sure you want to delete the post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => onDelete?.() },
    ]);
  }

  const onPressSendComment = async () => {
    if (user?.profile?.id) {
      supabase
        .from("post_interactions")
        .insert({
          post_id: post.id,
          user_id: user?.profile?.id,
          content: comment,
          interaction_type: InteractionType.Comment,
        })
        .then(() => {
          getPostInteractions();
          setComment("");
        });
    }
  };

  return (
    <Card style={[styles.container, containerStyles]}>
      <View style={styles.innerView}>
        <View>
          <Card style={styles.header}>
            <TouchableOpacity
              style={styles.flex}
              onPress={() => {
                // @ts-ignore
                navigation.navigate("visitingProfile", {
                  userId: post.user_id,
                });
              }}
            >
              <Avatar uri={avatarUrl} />
              <Text style={styles.username}>{profile?.username}</Text>
            </TouchableOpacity>
          </Card>
          {post?.content && (
            <Card style={styles.content}>
              <Text style={styles.contentText}>{post?.content}</Text>
            </Card>
          )}
        </View>
        <View>
          <Card style={styles.footer}>
            <TouchableOpacity onPress={toggleLike} style={styles.cornerIcon}>
              <FontAwesome
                name={userLikesPost ? "heart" : "heart-o"}
                size={18}
                color={"#0f4358"}
              />
              {postLikes.length >= 0 && (
                <Text style={{ marginHorizontal: 10 }}>{postLikes.length}</Text>
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
          {post.image?.includes(".mov") ? (
            <Video
              source={{ uri: post.image }}
              style={styles.image}
              useNativeControls
            />
          ) : (
            <Image source={{ uri: post.image }} style={styles.image} />
          )}
        </Card>
      )}
      {postComments.length ? (
        <>
          {!showComments && (
            <View style={{ marginHorizontal: 20 }}>
              <TouchableOpacity onPress={() => setShowComments(true)}>
                <Text>
                  Show {postComments.length} comment
                  {postComments.length > 1 ? "s" : ""}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {showComments && (
            <View style={{ flexDirection: "column", marginHorizontal: 20 }}>
              {postComments?.map((comment, index) => (
                <SingleComment
                  comment={comment}
                  deleteComment={deleteComment}
                  key={index}
                />
              ))}
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => setShowComments(false)}
              >
                <Text>Hide comments</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={{ marginHorizontal: 20 }}>
          <Text>No comments</Text>
        </View>
      )}
      <View style={styles.commentFormContainer}>
        <TextInput
          placeholder="Add comment..."
          placeholderTextColor={"#696969"}
          style={styles.addCommentInput}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={onPressSendComment}>
          <Ionicons
            name="send"
            size={24}
            color={Colors.TurquoiseDark}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  flex: { flexDirection: "row", alignItems: "center" },
  container: {
    marginVertical: 8,
    borderColor: "#99a1a8",
    borderTopWidth: 0.3,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    backgroundColor: Colors.GrayBeige,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 0.3,
    borderRadius: 10,
    padding: 5,
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
    marginHorizontal: 20,
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  innerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentFormContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: "#e4e7eb",
    padding: 5,
    borderRadius: 6,
    marginTop: 15,
  },
  addCommentInput: {
    marginLeft: 5,
    paddingRight: 10,
    fontFamily: "DMSans",
    width: 300,
  },
  cornerIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f5f5",
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 15,
    marginRight: 10,
  },
});
