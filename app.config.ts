import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    slug: "Existam",
    name: "Existam Platform",
    extra: {
      ...config.extra,
      // Add your custom config here
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.skris93.friendshare",
      versionCode: 1,
      permissions: [], // Empty array means no permissions required
      // Other Android-specific configuration goes here
    },
  };
};
