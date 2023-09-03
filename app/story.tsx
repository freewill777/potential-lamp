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

const { width, height } = Dimensions.get("window");

const Story = () => (
  <View style={styles.container}>
    <SwiperFlatListWithGestureHandler
      autoplay
      autoplayDelay={5}
      autoplayLoop
      showPagination
    >
      {[1, 2, 3, 4].map((_story, index) => (
        <View style={[styles.child]} key={index}>
          <Text>1</Text>
          <Image
            source={{ uri: `https://random.imagecdn.app/800/500` }}
            style={{ width, height, marginTop: 50 }}
          />
        </View>
      ))}
    </SwiperFlatListWithGestureHandler>
  </View>
);

export default Story;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.5, textAlign: "center" },
});
