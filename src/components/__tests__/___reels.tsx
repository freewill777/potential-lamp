import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
  Button,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import {
  Reels,
  fetchReels,
  Reel,
  Profile,
  downloadAvatar,
} from "../../src/lib/api";
import Colors from "../../enums";
import { Avatar } from "../../src/components";
import { supabase } from "../../src/lib/supabase";
import { useUserInfo } from "../../src/lib/userContext";

const { width, height } = Dimensions.get("window");

export default function ReelsScreen() {
  const [reels, setReels] = useState<Reels>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<Video>(null);
  const [currindex, SetCurrindex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchReels().then((data) => setReels(data));
  }, []);

  // useEffect(() => {
  //   if (!videoRef.current) {
  //     videoRef.current?.seek(0);
  //   }
  // }, [currindex]);

  // useEffect(() => {
  //   if (flatListRef.current && currindex < reels.length) {
  //     flatListRef.current.scrollToIndex({ index: currindex, animated: true });
  //   }
  // }, [currindex]);

  const handleDeleteReel = async (id: string) => {
    const { error } = await supabase.from("reels").delete().eq("id", id);
    if (error) {
      Alert.alert(error.message);
      console.log(error);
    } else {
      setReels(reels.filter((reel) => reel.id !== id));
    }
  };

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.didJustFinish) {
      if (flatListRef.current && currindex + 1 < reels.length) {
        flatListRef.current.scrollToIndex({
          index: currindex + 1,
          animated: true,
        });
      }
      SetCurrindex((currindex) => currindex + 1);
    }
  };

  const RenderItem = ({
    item,
    index,
    currindex,
    onPlaybackStatusUpdate,
  }: {
    item: Reel;
    index: number;
    currindex: number;
    onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void;
  }) => {
    const profile = item.profile as Profile;
    const [avatarUrl, setAvatarUrl] = useState("");
    const user = useUserInfo();

    useEffect(() => {
      if (profile?.avatar_url) {
        downloadAvatar(profile.avatar_url).then(setAvatarUrl);
      }
    }, [profile]);

    return (
      <View style={{ flex: 1, height: height - 20 }}>
        {item.video && (
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: item.video,
            }}
            resizeMode={ResizeMode.COVER}
            isLooping
            shouldPlay={currindex === index}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
        )}
        {user?.profile?.id === item.user_id && (
          <View
            style={{
              paddingVertical: 50,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.buttonInnerContainer}>
              <Button
                title="Delete Reel"
                onPress={() => handleDeleteReel(item.id)}
                color={Colors.BlackBlue}
              ></Button>
            </View>
          </View>
        )}
        <View style={styles.bottomView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar uri={avatarUrl} />
            <Text style={{ color: "#fff", fontWeight: "bold", marginLeft: 5 }}>
              {item.profile?.username}
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text numberOfLines={1} style={{ flex: 1, color: "transparent" }}>
                {item.description}
                {""}
              </Text>
            </View>
            <View style={{ ...styles.flexHorizontal, marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                ></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onChangeIndex = ({ index }: { index: number }) => {
    SetCurrindex(index);
  };

  if (!reels.length) {
    return (
      <View
        style={{
          height,
          width,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SwiperFlatList
        ref={flatListRef}
        vertical={true}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            currindex={currindex}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
        )}
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
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 170,
  },
  profile: {
    height: 35,
    width: 35,
    borderRadius: 30,
  },
  deleteReelButton: {
    position: "absolute",
    right: 20,
    top: 60,
    backgroundColor: Colors.White,
    borderRadius: 5,
    padding: 10,
  },
  buttonInnerContainer: {
    backgroundColor: Colors.White,
    width: "40%",
    borderRadius: 5,
    marginRight: 10,
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
