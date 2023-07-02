import { Database } from "../db_types";
import { supabase } from "./supabase";

export type Posts = Awaited<ReturnType<typeof fetchPosts>>;
export type Post = Posts[number];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const downloadAvatar = async (path: string): Promise<string> => {

  try {
    const {data, error} = await supabase.storage.from('avatars').download(path);
    if(error) throw error;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(data as Blob);
    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      }
      fileReader.onerror = () => {
        reject(fileReader.error);
      }
    })
  } catch (error) {
    console.log('error', error);
    return '';
  }
}


export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profile: profiles(username, avatar_url)")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("error", error);
    return [];
  }
  console.log(data);
  return data;
};
