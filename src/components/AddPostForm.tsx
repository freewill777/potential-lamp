import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, useThemeColor } from "./Themed";
import * as ImagePicker from "expo-image-picker";

interface Props {
  onSubmit: (content: string, image: string) => void;
  theme: "light" | "dark";
}

export default function AddPostForm({ onSubmit, theme }: Props) {
  const [content, setContent] = useState("");
  const color = useThemeColor({}, "primary");
  const styles = createStyles(theme);
  const [image, setImage] = useState("");
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      requestPermission().then(() => {
        return null;
      });
    }
  }, []);

  const handleSubmit = () => {
    onSubmit(content, image);
    setContent("");
    setImage("");
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const HStack = ({ children }) => {
    return <View> {children}</View>;
  };

  return (
    <Card style={styles.container}>
      <TextInput
        placeholder="Share something..."
        value={content}
        onChangeText={setContent}
        style={styles.textInput}
      />
      <Card style={styles.row}>
        <View style={{ flexDirection: "row", columnGap: 20 }}>
          <TouchableOpacity onPress={handlePickImage}>
            <Feather name="image" size={24} color={color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakePhoto}>
            <Feather name="camera" size={24} color={color} />
          </TouchableOpacity>
        </View>
        <Button title="Publish" onPress={handleSubmit} />
      </Card>

      {image && (
        <ImageBackground source={{ uri: image }} style={styles.image}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => setImage("")}
          >
            <Feather name="x" size={16} color="black" />
          </TouchableOpacity>
        </ImageBackground>
      )}
    </Card>
  );
}

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      width: "100%",
      paddingHorizontal: 16,
      paddingTop: 24,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      margin: 8,
    },
    textInput: {
      fontSize: 18,
      color: theme === "light" ? "black" : "white",
      marginTop: 8,
      marginLeft: 8,
    },
    image: {
      height: 100,
      width: 100,
      alignItems: "flex-start",
      padding: 8,
    },
    imageButton: {
      backgroundColor: "white",
      borderRadius: 16,
      padding: 2,
      borderColor: "black",
      borderWidth: 2,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
    },
  });
