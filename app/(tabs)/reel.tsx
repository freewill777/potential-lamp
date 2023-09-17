import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Reels, fetchReels } from "../../src/lib/api";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ReelsScreen() {
  const [reels, setReels] = useState<Reels>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const video = useRef(null);
  const [currindex, SetCurrindex] = useState(0);

  useEffect(() => {
    fetchReels().then((data) => setReels(data));
  }, []);

  useEffect(() => {
    if (!video.current) {
      video.current?.seek(0);
    }
  }, [currindex]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, height: height }}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: item.video,
          }}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={currindex == index}
        />

        <View style={styles.bottomView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
              style={styles.profile}
            />
            <Text
              style={{ marginHorizontal: 8, color: "#fff", fontWeight: "bold" }}
            >
              Sahil Alagiya
            </Text>
            <TouchableOpacity>
              <Text style={{ color: "#fff" }}>Follow</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text numberOfLines={1} style={{ flex: 1, color: "#fff" }}>
                {item.description}Description
              </Text>
            </View>

            <View style={{ ...styles.flexHorizontal, marginVertical: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather name="heart" size={30} color={"#fff"} />
                <Feather
                  name="book"
                  style={{ marginHorizontal: 8 }}
                  size={30}
                  color="#fff"
                />
                <Feather name="filter" size={30} color="#fff" />
                <Feather
                  name="radio"
                  size={30}
                  color="#fff"
                  style={{ marginHorizontal: 8 }}
                />
                <FontAwesome5 name="ellipsis-h" size={30} color="#fff" />
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="heart" size={15} color="#fff" />
                  <Text style={{ marginLeft: 4 }}>94.6K</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="filter" size={15} color="#fff" />
                  <Text style={{ marginLeft: 4 }}>112</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onChangeIndex = ({ index }) => {
    SetCurrindex(index);
  };

  if (!reels.length) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SwiperFlatList
        vertical={true}
        renderItem={renderItem}
        data={reels}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={onChangeIndex}
        showPagination
        paginationDefaultColor="transparent"
        paginationActiveColor="transparent"
        paginationStyleItem={{ height }}
        snapToAlignment="center"
        snapToInterval={height}
      />

      <View style={{ position: "absolute", top: 40, left: 16 }}>
        <Text style={styles.textStyle}>Reels</Text>
      </View>
      <View style={{ position: "absolute", top: 40, right: 16 }}>
        <Feather name="camera" size={30} color="#fff" />
      </View>
    </View>
  );

  function onPress() {
    setModalOpen((curr) => !curr);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    height: height,
    width: width,
    position: "absolute",
  },
  flexHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 16,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  profile: {
    height: 35,
    width: 35,
    borderRadius: 30,
  },
});

export const data = [
  {
    id: "1",
    title: "Big Buck Bunny",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "Vlc Media Player",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "2",
    title: "The first Blender Open Movie from 2006",
    thumbnailUrl: "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    duration: "12:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "Blender Inc.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "3",
    title: "For Bigger Blazes",
    thumbnailUrl: "https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "T-Series Regional",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "4",
    title: "For Bigger Escape",
    thumbnailUrl:
      "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "T-Series Regional",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    subscriber: "25254545 Subscribers",
    isLive: false,
  },
  {
    id: "5",
    title: "Big Buck Bunny",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "Vlc Media Player",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "6",
    title: "For Bigger Blazes",
    thumbnailUrl: "https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "T-Series Regional",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: false,
  },
  {
    id: "7",
    title: "For Bigger Escape",
    thumbnailUrl:
      "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    duration: "8:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "T-Series Regional",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "8",
    title: "The first Blender Open Movie from 2006",
    thumbnailUrl: "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    duration: "12:18",
    uploadTime: "May 9, 2011",
    views: "24,969,123",
    author: "Blender Inc.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: false,
  },
];
