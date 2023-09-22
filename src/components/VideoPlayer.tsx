import React from 'react';
import { Video } from 'expo-av';

const VideoPlayer = ({ videoRef, sourceUri, style, onPlaybackStatusUpdate }) => (
  <Video
    ref={videoRef}
    source={{
      uri: sourceUri,
    }}
    style={style}
    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
  />
);

export default VideoPlayer;