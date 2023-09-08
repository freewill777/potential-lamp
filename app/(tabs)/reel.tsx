import {
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { SwiperFlatListWithGestureHandler } from "react-native-swiper-flatlist/WithGestureHandler";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useRef } from "react";

const { width, height } = Dimensions.get("window");

const Reel = () => {
  const videoRef = useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <SwiperFlatListWithGestureHandler
        autoplay
        autoplayDelay={5}
        autoplayLoop
        vertical
        snapToAlignment="start"
        snapToInterval={height}
      >
        {[1, 2, 3, 4].map((_story, index) => (
          <SafeAreaView style={[styles.child]} key={index}>
            <Video
              source={{
                uri: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
              }}
              style={{ width, height, marginTop: 50 }}
            />
            <View
              style={{
                flex: 1,
                width: 500,
                height: 500,
                justifyContent: "flex-end",
                flexWrap: "wrap-reverse",
                position: "absolute",
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: 120,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "flex-end" }}
                >
                  <MaterialCommunityIcons
                    name={"movie-plus-outline"}
                    size={24}
                    color={"#0f4358"}
                    style={{ backgroundColor: "#fff", padding: 10 }}
                  />
                  {[].length >= 0 && (
                    <Text style={{ marginHorizontal: 10 }}>0</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  width: 120,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "flex-end" }}
                >
                  <FontAwesome
                    name={true ? "heart" : "heart-o"}
                    size={24}
                    color={"#0f4358"}
                    style={{ backgroundColor: "#fff", padding: 10 }}
                  />
                  {[].length >= 0 && (
                    <Text style={{ marginHorizontal: 10 }}>0</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  width: 120,
                }}
              >
                <TouchableOpacity>
                  <FontAwesome
                    name="trash-o"
                    size={24}
                    color={"#0f4358"}
                    style={{
                      backgroundColor: "#fff",
                      padding: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        ))}
      </SwiperFlatListWithGestureHandler>
    </SafeAreaView>
  );
};

export default Reel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    position: "relative",
  },
  child: { width, height, justifyContent: "center" },
  text: { fontSize: width * 0.5, textAlign: "center" },
});
