import { View, TouchableOpacity, StyleSheet } from "react-native";
import { PostInteractions, Profile, downloadAvatar } from "../lib/api";
import { Text } from "./Themed";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../enums";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useUserInfo } from "../lib/userContext";

const SingleComment = ({
  comment,
  deleteComment,
}: {
  comment: PostInteractions[number];
  deleteComment: (id: string) => void;
}) => {
  const user = useUserInfo();

  const authorProfile = comment?.profile as Profile;

  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (authorProfile?.avatar_url)
      downloadAvatar(authorProfile?.avatar_url).then(setAvatarUrl);
  }, [authorProfile]);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Avatar uri={avatarUrl} size={20} />
        <Text style={styles.userInfoUsername}>{authorProfile?.username}</Text>
        <Text>{comment.content}</Text>
      </View>
      {user?.profile?.id === authorProfile?.id ? (
        <TouchableOpacity onPress={() => deleteComment(String(comment.id))}>
          <MaterialIcons name="delete" size={24} color={Colors.TurquoiseDark} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export { SingleComment };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userInfo: { flexDirection: "row", gap: 5, alignItems: "center" },
  userInfoUsername: { fontWeight: "bold" },
});
