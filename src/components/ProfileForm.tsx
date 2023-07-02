import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput, View } from "./Themed";
import { downloadAvatar, Profile } from "../lib/api";
import Avatar from "./Avatar";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

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
              <TextInput
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.input}>
              <Button
                title="Guardar cambios"
                onPress={handleSubmit}
                disabled={loading || !username}
              />
            </View>
            <View style={styles.input}>
              <Button title="Cerrar sesión" onPress={onLogout} />
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
    position: 'relative'
  },
  avatarButton: {
    alignItems: "center",
    position: 'relative', // add relative positioning here
    marginBottom: 16,
    width: "40%",
    alignSelf: "center",
  },
  iconChange: {
    position: 'absolute', // absolute positioning
    top: 10, // position it on top right corner of Avatar
    right: 10,
    zIndex: 1,
    padding: 4,
    borderRadius: 50,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: 'black',
  },
});