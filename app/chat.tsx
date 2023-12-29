import { Alert, StyleSheet, Text, View } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, BubbleProps } from "react-native-gifted-chat";
import {
  Message,
  Messages,
  downloadAvatar,
  fetchMessages,
} from "../src/lib/api";
import { supabase } from "../src/lib/supabase";
import { useUserInfo } from "../src/lib/userContext";
import { useRoute } from "@react-navigation/native";
import { Avatar } from "../src/components";
import { useSearchParams } from "expo-router";

type ChatScreenRouteProp = {
  key: string;
  name: string;
  params: {
    contactId: string;
    username: string;
  };
};

export default function ChatScreen() {
  const route = useRoute<ChatScreenRouteProp>();
  const { contactId } = route.params;

  const [messages, setMessages] = useState<Messages>([]);
  const { profile: user } = useUserInfo();

  useEffect(() => {
    if (!user) return;
    fetchMessages(user.id, contactId).then(setMessages);

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender_id=eq.${contactId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          if (newMessage.receiver_id === user.id) {
            setMessages((prevMessages: Messages) => [
              newMessage,
              ...prevMessages,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, contactId]);

  const onSend = useCallback(async (messages = []) => {
    const [message] = messages;
    const { text } = message;

    const { error, data } = await supabase
      .from("messages")
      .insert({
        sender_id: user?.id || "",
        receiver_id: contactId,
        content: text,
      })
      .select("*");
    if (error) {
      Alert.alert("Server Error", error.message);
    } else {
      setMessages((prevMessages) => [data[0], ...prevMessages]);
    }
  }, []);
  const { userId: visitingUserId } = useSearchParams();

  return (
    <GiftedChat
      messages={messages.map((message) => ({
        _id: message.id,
        text: message.content,
        createdAt: new Date(message.created_at),
        user: { _id: message.sender_id },
      }))}
      onSend={(messages: any) => onSend(messages)}
      user={{
        _id: user?.id || "",
      }}
      renderBubble={(props) => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: "#0f4358", paddingVertical: 5 },
            left: { backgroundColor: "#0f3650", paddingVertical: 5 },
          }}
          textStyle={{
            left: { color: "#fff" },
          }}
        />
      )}
      renderAvatar={(props) => {
        const [userProfile, setUserProfile] = useState<any | null>(null);
        const [avatarUrl, setAvatarUrl] = useState("");

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

        useEffect(() => {
          fetchUserProfile();
        }, []);

        useEffect(() => {
          if (userProfile?.avatar_url) {
            downloadAvatar(userProfile.avatar_url).then(setAvatarUrl);
          }
        }, [userProfile]);

        return !!avatarUrl && <Avatar uri={avatarUrl} size={80} />;
      }}
    />
  );
}
const styles = StyleSheet.create({});
