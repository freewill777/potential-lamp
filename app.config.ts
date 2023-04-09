import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    slug: "supabook",
    name: "Supabook",
    extra: {
      ...config.extra,
      // Add your custom config here
    },
  };
};
