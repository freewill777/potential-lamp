import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text, TextInput, View } from "./Themed";
import { SimpleButton } from "./Themed";

import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";

interface AuthFormProps {
  onSignUp: (credentials: SignUpWithPasswordCredentials) => void;
  onLogin: (credentials: SignInWithPasswordCredentials) => void;
  loading: boolean;
}

export default function AuthForm({
  onSignUp,
  onLogin,
  loading,
}: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signUp">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successfulSignup, setSuccessfullSignup] = useState(false);

  const handleSubmit = () => {
    if (mode === "login") {
      onLogin({ email, password });
      setEmail("");
      setPassword("");
    } else {
      onSignUp({ email, password, options: { data: { username } } });
      setSuccessfullSignup(true);
      setEmail("");
      setPassword("");
      setUsername("");
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
            <Text style={styles.title}>Social Media</Text>
            {mode === "signUp" && (
              <View style={styles.input}>
                <TextInput
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            )}
            <View style={styles.input}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.input}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.input}>
              <SimpleButton
                title={mode === "login" ? "Log In" : "Register"}
                onPress={handleSubmit}
                disabled={loading || !email || !password}
              />
            </View>
            <View style={styles.input}>
              <SimpleButton
                title={mode === "login" ? "Register" : "Log In"}
                onPress={() => {
                  setMode(mode === "login" ? "signUp" : "login");
                  setSuccessfullSignup(false);
                }}
              />
            </View>

            {successfulSignup && mode === "signUp" && (
              <Text style={styles.successText}>
                Registration successfull. Redirecting...
              </Text>
            )}
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
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 16,
  },
  input: {
    paddingVertical: 8,
    width: "100%",
  },
  footer: {
    paddingTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    color: "green",
    marginTop: 8,
  },
  fullWidth: {
    width: "100%",
  },
});
