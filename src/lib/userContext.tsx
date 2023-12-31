import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "./supabase";
import { Profile } from "./api";
import { Alert } from "react-native";

// definir context para guardar el session y el profile
export interface UserProfile {
  username?: string;
  avatarUrl?: string;
}

export interface UserInfo {
  session: Session | null;
  profile: Profile | null;
  loading?: boolean;
  saveProfile?: (updatedProfile: Profile, avatarUpdated: boolean) => void;
}
const UserContext = createContext<UserInfo>({
  session: null,
  profile: null,
});

// crear un provider donde vamos a tener la logica para escuchar cambios de la session
export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    session: null,
    profile: null,
  });

  useEffect(() => {
    const getSession = async () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, session }));
      });
    };
    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log(_event, session)

      setUserInfo({ session, profile: null });
      //  setUserInfo(prevUserInfo => ({ ...prevUserInfo, session }))
    });
  }, []);

  const getProfile = async () => {
    if (!userInfo.session) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userInfo.session.user.id);
    if (error) {
      console.log(error);
    } else {
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, profile: data[0] }));
    }
  };

  useEffect(() => {
    getProfile();
  }, [userInfo.session, userInfo.profile?.username]);

  const saveProfile = async (
    updatedProfile: Profile,
    avatarUpdated: boolean
  ) => {
    setLoading(true);

    try {
      if (updatedProfile.avatar_url && avatarUpdated) {
        const { avatar_url } = updatedProfile;

        const fileExt = avatar_url.split(".").pop();
        const fileName = avatar_url.replace(/^.*[\\\/]/, "");
        const filePath = `${Date.now()}.${fileExt}`;

        const formData = new FormData();
        const photo = {
          uri: avatar_url,
          name: fileName,
          type: `image/${fileExt}`,
        } as unknown as Blob;
        formData.append("file", photo);

        const { error } = await supabase.storage
          .from("avatars")
          .upload(filePath, formData);
        if (error) throw error;
        updatedProfile.avatar_url = filePath;
      } else {
        updatedProfile.avatar_url = userInfo?.profile?.avatar_url as string;
      }
      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("id", userInfo?.profile?.id);
      if (error) {
        throw error;
      } else {
        getProfile();
        Alert.alert("Profile updated");
      }
    } catch (error: any) {
      Alert.alert("Server Error", error.message);
    }

    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ ...userInfo, loading, saveProfile }}>
      {children}
    </UserContext.Provider>
  );
}

// crear un hook reutilizable que utilice el context
export function useUserInfo() {
  return useContext(UserContext);
}
