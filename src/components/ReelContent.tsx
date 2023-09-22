import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import VideoPlayer from './VideoPlayer';
import ControlButtons from './ControlButtons';

const { width, height } = Dimensions.get('window');

const ReelContent = ({ item, index, videoRefs, setActiveIndex }) => {
  return (
    <View style={{ width, height, justifyContent: 'center' }}>
      <VideoPlayer
        videoRef={(ref) => (videoRefs.current[index] = ref)}
        sourceUri='https://sample-videos.com/video123/mp4/360/big_buck_bunny_360p_2mb.mp4'
        style={{ width, height, marginTop: 50 }}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            setActiveIndex((prevIndex) => (prevIndex + 1) % videoRefs.current.length);
          }
        }}
      />
      <Text style={{ position: 'absolute' }}>{item}</Text>
      <ControlButtons />
    </View>
  );
};

export default ReelContent;