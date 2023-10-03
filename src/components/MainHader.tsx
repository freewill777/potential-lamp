import { Image, Platform, SafeAreaView } from "react-native";
import { HeaderButtonsBar, logoMainImage } from ".";

export const MainHeader = ({ toggleDrawer }: { toggleDrawer: Function }) => (
  <SafeAreaView
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: Platform.OS === "android" ? 25 : 0,
      padding: 0,
    }}
  >
    <Image
      source={logoMainImage}
      style={{ width: 70, height: 50, marginLeft: 10 }}
    />
    <HeaderButtonsBar toggleDrawer={toggleDrawer} />
  </SafeAreaView>
);
