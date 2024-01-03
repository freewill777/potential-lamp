import { Alert, StyleSheet, ImageBackground } from "react-native";
import { Text, View } from "../src/components/Themed";
import AuthForm from "../src/components/AuthForm";
import { useState } from "react";
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { supabase } from "../src/lib/supabase";

export default function AuthScreen() {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (credentials: SignUpWithPasswordCredentials) => {
    if (!("email" in credentials)) return;
    setLoading(true);
    const { email, password, options } = credentials;
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (error) Alert.alert(error.message);
    // console.log(data);
    setLoading(false);
  };

  const handleLogin = async (credentials: SignInWithPasswordCredentials) => {
    if (!("email" in credentials)) return;
    setLoading(true);
    const { email, password } = credentials;
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    // console.log(data);
    setLoading(false);
  };

  return (
<ImageBackground source={require('../src/assets/images/splash1.png')} style={styles.container}>
      <AuthForm onLogin={handleLogin} onSignUp={handleSignup} loading={loading} />
    </ImageBackground>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
width: '100%',
    height: '100%',
},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
