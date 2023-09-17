import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
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

export const logoMainImage = require("../assets/images/logo-main.png");

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
            {/* <Text style={styles.title}>Social Media</Text> */}
            <Image source={logoMainImage} style={{ width: 180, height: 180 }} />
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
                style={[
                  styles.input,
                  {
                    borderColor: "#380a2a",
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                  },
                ]}
                placeholderTextColor={"#380a2a"}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor={"#380a2a"}
                style={[
                  styles.input,
                  {
                    borderColor: "#380a2a",
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                  },
                ]}
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
    fontFamily: "DMSans",
  },
  input: {
    paddingVertical: 8,
    width: "100%",
    color: "#380a2a",
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
