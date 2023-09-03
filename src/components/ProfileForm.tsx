import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button, Text, TextInput, View } from "./Themed";
import { downloadAvatar, Profile } from "../lib/api";
import Avatar from "./Avatar";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { SimpleButton } from "./Themed";
interface ProfileFormProps {
  profile: Profile | null;
  onSave: (updatedProfile: Profile, avatarUpdated: boolean) => void;
  onLogout: () => void;
  loading: boolean;
}

export default function ProfileForm({
  profile,
  onSave,
  loading,
  onLogout,
}: ProfileFormProps) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarUpdated, setAvatarUpdated] = useState(false);

  useEffect(() => {
    if (profile?.username) {
      setUsername(profile.username);
    }
    if (profile?.avatar_url) {
      downloadAvatar(profile.avatar_url).then(setAvatarUrl);
    }
  }, [profile]);

  const handleSubmit = () => {
    if (profile) {
      onSave({ ...profile, username, avatar_url: avatarUrl }, avatarUpdated);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
      setAvatarUpdated(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.input}>
              <TouchableOpacity
                style={styles.avatarButton}
                onPress={handlePickImage}
              >
                <View style={styles.iconChange}>
                  <FontAwesome name="upload" size={18} color="black" />
                </View>
                <Avatar uri={avatarUrl} size={120} />
              </TouchableOpacity>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.input}>
              <SimpleButton title="Save" onPress={handleSubmit} />
            </View>
            <View style={styles.input}>
              <SimpleButton title="Logout" onPress={onLogout} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 16,
    flex: 1,
  },
  input: {
    paddingVertical: 8,
    position: "relative",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginVertical: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    backgroundColor: "#fff",
  },
  avatarButton: {
    alignItems: "center",
    position: "relative", // add relative positioning here
    marginBottom: 16,
    width: "40%",
    alignSelf: "center",
  },
  iconChange: {
    position: "absolute", // absolute positioning
    top: 10, // position it on top right corner of Avatar
    right: 10,
    zIndex: 1,
    padding: 4,
    borderRadius: 50,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: "black",
  },
  followingButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    paddingVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
  },
  followButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    paddingVertical: 8,
    borderRadius: 7,
  },
  followButtonText: {
    fontWeight: "bold",
  },
});
