import { StyleSheet } from "react-native";

import { Text, View, Button } from "../../src/components/Themed";
import { supabase } from "../../src/lib/supabase";
import { useUserInfo } from "../../src/lib/userContext";

export default function TabTwoScreen() {
  const { profile } = useUserInfo()  
  return (
    <View style={styles.container}>
      <Text>{profile?.username}</Text>
      <Button title="Cerrar sesión" onPress={() => supabase.auth.signOut()} />
      {/* <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
