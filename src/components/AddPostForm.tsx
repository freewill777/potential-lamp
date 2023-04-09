import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  onSubmit: (content: string) => void;
}

export default function AddPostForm({ onSubmit }: Props) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    onSubmit(content);
    setContent("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    alignItems: "center",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    width: "100%",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
