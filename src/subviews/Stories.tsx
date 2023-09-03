import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
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
import { SCREENS } from "../constants/Screens";
import * as ImagePicker from "expo-image-picker";

const handleTakePhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 0.1,
  });
  if (!result.canceled) {
    // setAvatarUrl(result.assets[0].uri);
    // setAvatarUpdated(true);
  }
};

const Stories = () => {
  const list = [{ key: 1 }, {}, {}, {}, {}, {}];
  const [stories, setStories] = useState(list);

  useEffect(() => {
    const getStories = async () => [];
    getStories();
  }, []);

  const navigation = useNavigation();

  const handleOpenStory = (item: any) => {
    if (item.key === 1) {
      handleTakePhoto();
    } else {
      //@ts-ignore
      navigation.navigate(SCREENS.STORY, { id: item.id });
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => handleOpenStory(item)}>
        <View
          style={{
            backgroundColor: "transparent",
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: item.key !== 1 ? 2 : 3,
              backgroundColor: "#6AB3AC",
              marginTop: 12,
              marginBottom: 33,
              marginHorizontal: 8,
              borderRadius: 64,
            }}
          >
            <View
              style={{
                padding: 1,
                backgroundColor: item.key !== 1 ? "#fff" : "#b4d9cf",
                borderRadius: 64,
              }}
            >
              {item.key !== 1 ? (
                <Image
                  source={{ uri: `https://random.imagecdn.app/100/100` }}
                  style={{ width: 56, height: 56, borderRadius: 64 }}
                />
              ) : (
                <AntDesign
                  name="plus"
                  size={30}
                  color="#5FA190"
                  style={{ padding: 12 }}
                />
              )}
            </View>
          </View>
          <Text style={{ color: "#000", fontSize: 9 }}>
            {item.key !== 1 ? item.userName : "Add Story"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return !!stories.length ? (
    <>
      <StoryThumbnails
        //
        stories={stories}
        renderItem={renderItem}
        list={list}
      />
    </>
  ) : null;
};

export default Stories;

const { width } = Dimensions.get("window");

const StoryThumbnails = ({ stories, renderItem, list }: any) => {
  return (
    <ScrollView horizontal style={{ width }}>
      <SafeAreaView>
        <FlatList
          data={stories}
          renderItem={renderItem}
          numColumns={list.length}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }} />}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.5, textAlign: "center" },
});
