import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    slug: "supabookz",
    name: "Plataforma Social",
    extra: {
      ...config.extra,
      // Add your custom config here
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.msweb.plataforma_social",
      versionCode: 1,
      permissions: [], // Empty array means no permissions required
      // Other Android-specific configuration goes here
    },
  };
};
