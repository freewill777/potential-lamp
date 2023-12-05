import { supabase } from "../../src/lib/supabase";
import { useUserInfo } from "../../src/lib/userContext";
import ProfileForm from "../../src/components/ProfileForm";
import UserPostsView from "../../src/components/UserPostsView";

export default function TabTwoScreen() {
  const { profile, loading, saveProfile } = useUserInfo();

  return (
<div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
<ProfileForm
        profile={profile}
        loading={loading!}
        onSave={saveProfile!}
        onLogout={() => supabase.auth.signOut()}
      />
      {profile?.id && <UserPostsView userId={profile?.id} />}
</div>
);
}
