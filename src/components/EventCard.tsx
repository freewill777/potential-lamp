import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
} from "react-native";
import { Avatar, Card, Text, SingleComment } from "../../src/components";
import Colors from "../../enums";
import { useEffect, useState, useMemo } from "react";
import {
  fetchEventInteractions,
  EventInteractions,
  downloadAvatar,
  Profile,
} from "../../src/lib/api";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useUserInfo } from "../lib/userContext";
import { supabase } from "../lib/supabase";
import { useNavigation } from "expo-router";

type TEvent = {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  media: string;
};

const InteractionType = {
  Like: "like",
  Comment: "comment",
  Share: "share",
  Attend: "attend",
  Interested: "interested",
};

type TInteractionType = keyof typeof InteractionType;

const EventCard = ({
  event,
  deleteEvent,
}: {
  event: TEvent;
  deleteEvent: (id: string) => void;
}) => {
  const navigation = useNavigation();
  const profile = event.profile as Profile;
  const user = useUserInfo();
  const [interactions, setInteractions] = useState<EventInteractions>([]);
  const [comment, setComment] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    fetchEventInteractions(event?.id).then(setInteractions);
  }, [event]);

  useEffect(() => {
    if (profile?.avatar_url) {
      downloadAvatar(profile.avatar_url).then(setAvatarUrl);
    }
  }, [profile]);

  const comments = useMemo(
    () =>
      interactions?.filter(
        (interaction) =>
          interaction?.interaction_type === InteractionType.Comment
      ),
    [interactions]
  );

  const likes = useMemo(
    () =>
      interactions?.filter(
        (interaction) => interaction?.interaction_type === InteractionType.Like
      ),
    [interactions]
  );

  const userLikesThis = useMemo(
    () =>
      likes?.find((interaction) => interaction?.user_id === user?.profile?.id),
    [interactions, user]
  );

  const onPressSendComment = async () => {
    if (user?.profile?.id) {
      supabase
        .from("event_interactions")
        .insert({
          event_id: event.id,
          user_id: user?.profile?.id,
          content: comment,
          interaction_type: InteractionType.Comment,
        })
        .then(() => {
          fetchEventInteractions(event?.id).then(setInteractions);
          setComment("");
        });
    }
  };

  const deleteComment = async (interactionId: string) => {
    await supabase.from("event_interactions").delete().eq("id", interactionId);
    fetchInteractions();
  };

  const fetchInteractions = async () => {
    const { data } = await supabase
      .from("event_interactions")
      .select("*, profile: profiles(username, avatar_url, id)")
      .eq("event_id", event.id);
    setInteractions(data ?? []);
  };

  const toggleLike = async () => {
    if (!user.profile) return;

    if (userLikesThis) {
      const { error } = await supabase
        .from("event_interactions")
        .delete()
        .eq("id", userLikesThis.id);
      if (error) Alert.alert(error.message);
    } else {
      const { error } = await supabase.from("event_interactions").insert({
        event_id: event.id,
        user_id: user?.profile?.id,
        interaction_type: InteractionType.Like,
      });

      if (error) Alert.alert(error.message);
    }

    fetchEventInteractions(event?.id).then(setInteractions);
  };

  async function confirmDelete(
    eventId: string,
    deleteEvent: (id: string) => void
  ) {
    Alert.alert("Delete post", "Are you sure you want to delete the post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: async () => deleteEvent?.(eventId) },
    ]);
  }

  return (
    <View style={styles.renderItem}>
      <Card style={styles.footer}>
        <TouchableOpacity
          style={styles.flex}
          onPress={() => {
            // @ts-ignore
            navigation.navigate("visitingProfile", {
              userId: event.user_id,
            });
          }}
        >
          <Avatar uri={avatarUrl} />
          <Text style={styles.username}>{profile?.username}</Text>
        </TouchableOpacity>
        {user?.profile?.id === event.user_id ? (
          <TouchableOpacity
            onPress={() => deleteEvent(event.id)}
            style={styles.cornerIcon}
          >
            <FontAwesome
              name="trash-o"
              size={18}
              color={"#0f4358"}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={toggleLike}
          style={{ ...styles.cornerIcon, paddingLeft: 15 }}
        >
          <FontAwesome
            name={userLikesThis ? "heart" : "heart-o"}
            size={18}
            color={"#0f4358"}
          />
          {likes.length >= 0 && (
            <Text style={{ marginHorizontal: 10 }}>{likes.length}</Text>
          )}
        </TouchableOpacity>
      </Card>
      <Text>{event.name}</Text>
      <Text>{event.description}</Text>
      <Text>{event.date}</Text>
      <Text>{event.location}</Text>
      <Image source={{ uri: event.media }} style={styles.image} />
      <View style={styles.commentsContainer}>
        {comments?.map((comment, index) => (
          <SingleComment
            comment={comment}
            deleteComment={deleteComment}
            key={index}
          />
        ))}
      </View>
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
    </View>
  );
};

export { EventCard };

export const styles = StyleSheet.create({
  commentsContainer: { flexDirection: "column", marginTop: 20 },
  renderItem: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 16,
    marginHorizontal: 16,
    shadowColor: Colors.MagentaDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 5,
    marginTop: 15,
  },
  commentFormContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    width: 200,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: Colors.White,
    borderRadius: 5,
    padding: 10,
  },
  cornerIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f5f5",
    borderRadius: 5,
    paddingVertical: 5,
    marginRight: 10,
  },
  footer: {
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.GrayBeige,
    width: "100%",
    marginBottom: 15,
  },
  username: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  flex: { flexDirection: "row", alignItems: "center" },
});
