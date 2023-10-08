import { Database } from "../db_types";
import { supabase } from "./supabase";

export type PostInteractions = Awaited<
  ReturnType<typeof fetchPostInteractions>
>;
export type PostInteraction = PostInteractions[number];
export type EventInteractions = Awaited<
  ReturnType<typeof fetchPostInteractions>
>;
export type ReelInteractions = Awaited<
  ReturnType<typeof fetchReelInteractions>
>;
export type EventInteraction = EventInteractions[number];
export type ReelInteraction = ReelInteractions[number];
export type Posts = Awaited<ReturnType<typeof fetchPosts>>;
export type Post = Posts[number];
export type Reels = Awaited<ReturnType<typeof fetchReels>>;
export type Reel = Reels[number];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Contacts = Awaited<ReturnType<typeof fetchContacts>>;
export type Contact = Contacts[number];
export type Messages = Awaited<ReturnType<typeof fetchMessages>>;
export type Message = Messages[number];
export type Events = Awaited<ReturnType<typeof fetchEvents>>;
export type Event = Events[number];

export const downloadAvatar = async (path: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) throw error;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(data as Blob);
    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
    });
  } catch (error) {
    console.log("error", error);
    return "";
  }
};

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profile: profiles(username, avatar_url)")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("error", error);
    return [];
  }
  // console.log(data)
  return data;
};

export const fetchPostInteractions = async (postId: string) => {
  const { data, error } = await supabase
    .from("post_interactions")
    .select("*, profile: profiles(username, avatar_url, id)")
    .eq("post_id", postId);
  if (error) {
    console.log("error", error);
    return [];
  } else {
    return data;
  }
};

export const fetchReels = async () => {
  const { data, error } = await supabase
    .from("reels")
    .select("*, profile: profiles(username, avatar_url)")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("error", error);
    return [];
  }
  // console.log(data)
  return data;
};

export const fetchReelInteractions = async (reelId: string) => {
  const { data, error } = await supabase
    .from("reel_interactions")
    .select("*, profile: profiles(username, avatar_url, id)")
    .eq("reel_id", reelId);
  if (error) {
    console.log("error", error);
    return [];
  } else {
    return data;
  }
};

export const fetchEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*, profile: profiles(username, avatar_url, id)")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("error", error);
    return [];
  }
  // console.log(data)
  return data;
};

export const fetchEventInteractions = async (eventId: string) => {
  const { data, error } = await supabase
    .from("event_interactions")
    .select("*, profile: profiles(username, avatar_url, id)")
    .eq("event_id", eventId);
  if (error) {
    console.log("error", error);
    return [];
  } else {
    return data;
  }
};

export const fetchContacts = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("username, avatar_url, id")
    .neq("id", userId);

  if (error) {
    console.log("error", error);
    return [];
  } else {
    return data;
  }
};

export const fetchMessages = async (userId: string, contactId: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .or(`sender_id.eq.${contactId},receiver_id.eq.${contactId}`)
    .order("created_at", { ascending: false });
  if (error) {
    console.log("error", error.message);
    return [];
  } else {
    return data;
  }
};

export const sendFriendRequest = async (
  fromUserId: string,
  toUserId: string
) => {
  const { error } = await supabase
    .from("friends")
    .insert([
      { from_user_id: fromUserId, to_user_id: toUserId, status: "pending" },
    ]);
  if (error) throw error;
};

export const acceptFriendRequest = async (
  fromUserId: string,
  toUserId: string
) => {
  const { error } = await supabase
    .from("friends")
    .update({ status: "accepted" })
    .eq("from_user_id", fromUserId)
    .eq("to_user_id", toUserId);
  if (error) throw error;
};

export const getFriends = async (userId: string) => {
  const { data, error } = await supabase
    .from("friends")
    .select("*")
    .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
    .eq("status", "accepted");
  if (error) throw error;
  return data;
};

export const deleteFriend = async (fromUserId: string, toUserId: string) => {
  const { error } = await supabase
    .from("friends")
    .delete()
    .or(`from_user_id.eq.${fromUserId},to_user_id.eq.${fromUserId}`)
    .or(`from_user_id.eq.${toUserId},to_user_id.eq.${toUserId}`);
  if (error) throw error;
};

export const handleSendRequest = (userId: string) => {};
export const handleAcceptRequest = (userId: string) => {};
export const handleRejectRequest = (userId: string) => {};
export const handleCancelRequest = (userId: string) => {};
export const handleUnfriend = (userId: string) => {};
export const handleFriendshipStatus = (userId: string) => {};
