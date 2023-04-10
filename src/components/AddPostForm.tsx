import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Button, Card, useThemeColor } from "./Themed";

interface Props {
  onSubmit: (content: string) => void;
  theme: "light" | "dark";
}

export default function AddPostForm({ onSubmit, theme }: Props) {
  const [content, setContent] = useState("sdsds");
  const color = useThemeColor({}, "primary");

  const styles = createStyles(theme);

  const handleSubmit = () => {
    onSubmit(content);
    setContent("");
  };

  return (
    <Card style={styles.container}>
      <TextInput
        placeholder="¿Qué estás pensando?"
        value={content}
        onChangeText={setContent}
        style={styles.textInput}
      />

      <Card style={styles.row}>
        <TouchableOpacity>
          <Feather name="image" size={24} color={color} />
        </TouchableOpacity>
        <Button title="Publicar" onPress={handleSubmit} />
      </Card>
      {/* <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar</Text>
      </Pressable> */}
    </Card>
  );
}

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      width: "100%",
      padding: 16,
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
    },
  });
