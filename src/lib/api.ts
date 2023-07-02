import { Database } from "../db_types";
import { supabase } from "./supabase";

export type Posts = Awaited<ReturnType<typeof fetchPosts>>;
export type Post = Posts[number];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profile: profiles(username)")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("error", error);
    return [];
  }
  console.log(data);
  return data;
};
