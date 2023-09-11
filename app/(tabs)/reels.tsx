import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, View, Image, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import ControlButtons from '../../src/components/ControlButtons';
import VideoPlayer from '../../src/components/VideoPlayer';
import ReelContent from '../../src/components/ReelContent';

const { width, height } = Dimensions.get('window');

const Reels = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);
  const flatListRef = useRef(null);

  const playVideo = (index) => {
    videoRefs.current[index]?.playAsync();
  };

  const pauseVideo = (index) => {
    videoRefs.current[index]?.pauseAsync();
  };

  useEffect(() => {
    videoRefs.current.forEach((ref, index) => {
      index === activeIndex ? playVideo(index) : pauseVideo(index);
    });
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== videoRefs.current.length - 1) {
      flatListRef.current.scrollToIndex({ index: activeIndex, animated: true });
    } else {
      setActiveIndex(0);
    }
  }, [activeIndex]);

  const { current: handleViewableItemsChanged } = useRef(({ viewableItems }) => {
    setActiveIndex(viewableItems[0].index);
  });

  const { current: viewabilityConfig } = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <FlatList
        ref={flatListRef}
        data={[0, 1, 2]}
        renderItem={({ item, index }) => (
          <ReelContent
            item={item}
            index={index}
            videoRefs={videoRefs}
            setActiveIndex={setActiveIndex}
          />
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToInterval={height}
        decelerationRate='fast'
        vertical
      />
    </SafeAreaView>
  );
};

export default Reels;

const styles = StyleSheet.create({
  container: { flex: 1, width, height, position: 'relative' },
  child: { width, height, justifyContent: 'center' },
  text: { marginHorizontal: 10 },
});