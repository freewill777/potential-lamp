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
  Alert,
} from "react-native";
import { Button, Text, TextInput, View } from "./Themed";
import { downloadAvatar, Profile } from "../lib/api";
import Avatar from "./Avatar";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { SimpleButton } from "./Themed";
import styles from '../utils/styles';
export default function ProfileForm({
  profile,
  onSave,
  loading,
  onLogout,
}: ProfileFormProps) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarUpdated, setAvatarUpdated] = useState(false);
const styles = StyleSheet.create({
container: {
    flex: 1,
  },
  inner: {
    padding: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
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
borderColor: Colors.light.tint,
padding: 8,
backgroundColor: Colors.light.background,
    borderRadius: 10,
    marginVertical: 8,
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
