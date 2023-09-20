import { Alert } from "react-native";
import { supabase } from "../src/lib/supabase";
import * as ImagePicker from "expo-image-picker";

export const handleSubmitPost = async (content: string, image: string) => {
  try {
    let publicUrl = "";
    if (image) {
      const fileExt = image.split(".").pop();
      const fileName = image.replace(/^.*[\\\/]/, "");
      const filePath = `${Date.now()}.${fileExt}`;

      const formData = new FormData();
      const photo = {
        uri: image,
        name: fileName,
        type: `image/${fileExt}`,
      } as unknown as Blob;

      formData.append("file", photo);

      const { error } = await supabase.storage
        .from("posts")
        .upload(filePath, formData);
      if (error) throw error;

      const { data } = supabase.storage.from("posts").getPublicUrl(filePath);
      publicUrl = data.publicUrl;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({ content, image: publicUrl })
      .select("*, profile: profiles(username, avatar_url)");
    if (error) {
      throw error;
    } else {
      return;
    }
  } catch (error: any) {
    Alert.alert("Server Error", error.message);
  }
};

export const handlePickImage = async (setImage) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

export const handleTakePhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
  });
  if (!result.canceled) {
    return result.assets[0].uri;
  }
};
