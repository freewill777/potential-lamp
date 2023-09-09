import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, View, Image, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const Reel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    videoRefs.current.forEach((ref, index) => {
      if (index === activeIndex) {
        ref.playAsync();
      } else {
        ref.pauseAsync();
      }
    });
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== videoRefs.current.length - 1) {
      flatListRef.current.scrollToIndex({ index: activeIndex, animated: true });
    } else {
      setActiveIndex(0);
    }
  }, [activeIndex]);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    setActiveIndex(viewableItems[0].index);
  });

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <FlatList
        ref={flatListRef}
        data={[1, 2, 3, 4]}
        renderItem={({ item, index }) => (
          <View style={styles.child}>

            <Video
              ref={(ref) => (videoRefs.current[index] = ref)}
              source={{
                uri: 'https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4',
              }}
              style={{ width, height, marginTop: 50 }}
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) {
                  setActiveIndex((prevIndex) => (prevIndex + 1) % videoRefs.current.length);
                }
              }}
            />
            <Text>{index}</Text>
            <ControlButtons />
          </View>
        )}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        snapToInterval={height}
        decelerationRate='fast'
        vertical
      />
    </SafeAreaView>
  );
};

const ControlButtons = () => (
  <View style={styles.controlButtonsContainer}>
    <ControlButton icon='comment' />
    <ControlButton icon='heart' />
    <ControlButton icon='trash-o' />
  </View>
);

const ControlButton = ({ icon }) => (
  <TouchableOpacity style={styles.controlButton}>
    <FontAwesome name={icon} size={24} color='#0f4358' style={styles.icon} />
    <Text style={styles.text}>0</Text>
  </TouchableOpacity>
);

export default Reel;

const styles = StyleSheet.create({
  container: { flex: 1, width, height, position: 'relative' },
  child: { width, height, justifyContent: 'center' },
  text: { marginHorizontal: 10 },
  controlButtonsContainer: { position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', right: 10, top: 10 },
  controlButton: { flexDirection: 'column', alignItems: 'center', marginVertical: 10 },
  icon: { padding: 10 },
});