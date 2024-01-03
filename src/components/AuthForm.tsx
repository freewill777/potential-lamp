import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, View, TextInput } from "./Themed";
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
export const splashBg = require("../assets/images/splash1.png");

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

  const primary = "#380a2a";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Image
          source={logoMainImage}
          style={{ width: 180, height: 180, marginTop: 300 }}
        />
        {mode === "signUp" && (
          <View style={styles.input}>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={primary}
              style={[
                styles.input,
                styles.spacing,
                {
                  borderColor: username.length
                    ? username.length > 3
                      ? primary
                      : "red"
                    : primary,
                },
              ]}
            />
          </View>
        )}
        <View
          style={{
            backgroundColor: undefined,
            backfaceVisibility: "hidden",
            paddingBottom: 200,
          }}
        >
          <View
            style={[
              styles.input,
              { backgroundColor: undefined, backfaceVisibility: "hidden" },
            ]}
          >
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={primary}
              style={[
                styles.input,
                styles.spacing,
                {
                  borderColor: email.length
                    ? email.includes("@") && email.includes(".")
                      ? primary
                      : "red"
                    : primary,
                },
              ]}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor={primary}
              style={[
                styles.input,
                styles.spacing,
                {
                  borderColor: password.length
                    ? password.length > 3
                      ? primary
                      : "red"
                    : primary,
                },
              ]}
            />
          </View>
          <View style={styles.input}>
            <SimpleButton
              title={mode === "login" ? "Log In" : "Register"}
              onPress={handleSubmit}
              disabled={loading || !email || !password}
              solidBackground="#f7d7af"
            />
          </View>
          <View style={styles.input}>
            <SimpleButton
              title={
                mode === "login"
                  ? "I don't have an account. Register"
                  : "I already have an account. Log In"
              }
              onPress={() => {
                setMode(mode === "login" ? "signUp" : "login");
                setSuccessfullSignup(false);
              }}
              solidBackground="#f7d7af"
            />
          </View>

          {successfulSignup && mode === "signUp" && (
            <Text style={styles.successText}>
              Registration successfull. Log in with your new account.
            </Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacing: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 },
  inner: {
    // padding: 16,
    // flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: undefined,
    backfaceVisibility: "hidden",
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
    width: 300,
    color: "#380a2a",
    backgroundColor: undefined,
    backfaceVisibility: "hidden",
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
