import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card, SimpleButton, useThemeColor } from "./Themed";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../enums";
import { Video } from "expo-av";

interface Props {
  onSubmit: (content: string, image: string) => void;
  theme: "light" | "dark";
  imageUri: string;
  reset: Function;
}
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddPostForm({
  onSubmit,
  theme,
  imageUri,
  reset,
}: Props) {
  const [content, setContent] = useState("");
  const styles = createStyles();
  const [image, setImage] = useState(imageUri ?? "");
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => setImage(imageUri), [imageUri]);
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
    reset();
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
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Card style={styles.container}>
      <TextInput
        placeholder="Share something..."
        placeholderTextColor={Colors.MagentaDarker}
        value={content}
        onChangeText={setContent}
        style={styles.textInput}
      />
      <Card style={[styles.row, { backgroundColor: undefined }]}>
        <View style={{ flexDirection: "row", columnGap: 20 }}>
          <TouchableOpacity onPress={handlePickImage}>
            <Feather name="image" size={24} color={Colors.BlackBlue} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakePhoto}>
            <Feather name="camera" size={24} color={Colors.BlackBlue} />
          </TouchableOpacity>
          <Pressable onPress={() => { }}>
            {({ pressed }) => (
              <MaterialIcons
                name="addchart"
                size={24}
                color={Colors.BlackBlue}
                style={{
                  marginTop: 1,
                  opacity: pressed ? 0.5 : 1,
                }}
              />
            )}
          </Pressable>
          <Pressable onPress={() => { }}>
            {({ pressed }) => (
              <MaterialCommunityIcons name="movie-plus-outline" size={24}
                color={Colors.BlackBlue}
                style={{
                  marginRight: 15,
                  marginTop: 1,
                  opacity: pressed ? 0.5 : 1,
                }} />

            )}
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", columnGap: 3 }}>
          {image && (
            <SimpleButton
              //
              danger
              title="Discard"
              onPress={() => {
                setImage("");
                reset();
              }}
            />
          )}
          <SimpleButton
            //
            inverted
            title="Publish"
            onPress={handleSubmit}
          />
        </View>
      </Card>

      {image && image?.includes(".mov") && (
        <View style={{ position: "relative" }}>
          <Video
            source={{ uri: image }}
            style={styles.image}
            useNativeControls
          />
          <TouchableOpacity
            style={[styles.imageButton, { position: "absolute", margin: 6 }]}
            onPress={() => {
              setImage("");
              reset();
            }}
          >
            <Feather name="x" size={16} color="black" />
          </TouchableOpacity>
        </View>
      )}
      {image && !image?.includes(".mov") && (
        <ImageBackground source={{ uri: image }} style={styles.image}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => {
              setImage("");
              reset();
            }}
          >
            <Feather name="x" size={16} color="black" />
          </TouchableOpacity>
        </ImageBackground>
      )}
      <View style={{ height: 10 }}></View>
    </Card>
  );
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      width: "100%",
      paddingHorizontal: 16,
      paddingTop: 24,
      backgroundColor: "#e2eff2",
      borderColor: Colors.MagentaDark,
      borderTopWidth: 1,
      borderBottomWidth: 1,
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
      color: Colors.MagentaDarker,
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
