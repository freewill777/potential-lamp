import { supabase } from "../../src/lib/supabase";
import { useUserInfo } from "../../src/lib/userContext";
import ProfileForm from "../../src/components/ProfileForm";
import UserPostsView from "../../src/components/UserPostsView";
import { View } from "../../src/components";
import { Dimensions } from "react-native";

export default function TabTwoScreen() {
  const { profile, loading, saveProfile } = useUserInfo();

  return (
    <>
      <View style={{ height: Dimensions.get("window").height / 5.5 }}>
        <ProfileForm
          profile={profile}
          loading={loading!}
          onSave={saveProfile!}
          onLogout={() => supabase.auth.signOut()}
        />
      </View>
      {profile?.id && <UserPostsView userId={profile?.id} />}
    </>
  );
}
