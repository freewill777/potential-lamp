import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ControlButtons = () => (
  <View style={styles.controlButtonsContainer}>
    <ControlButton icon='comment' />
    <ControlButton icon='heart' />
    <ControlButton icon='trash-o' />
    <ControlIcon icon='trash-o' />
  </View>
);

const ControlButton = ({ icon }) => (
  <TouchableOpacity style={styles.controlButton}>
    <FontAwesome name={icon} size={24} color='#0f4358' style={styles.icon} />
    <Text style={styles.text}>0</Text>
  </TouchableOpacity>
);

const ControlIcon = ({ icon }) => (
  <TouchableOpacity style={styles.controlButton}>
    <MaterialCommunityIcons name="plus-box-multiple-outline" size={24} color='#0f4358' style={styles.icon} />
  </TouchableOpacity>
);

export default ControlButtons;

const styles = StyleSheet.create({
  controlButtonsContainer: { position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', right: 10, top: 10 },
  controlButton: { flexDirection: 'column', alignItems: 'center', marginVertical: 10 },
  icon: { padding: 10 },
  text: { marginHorizontal: 10 },
});