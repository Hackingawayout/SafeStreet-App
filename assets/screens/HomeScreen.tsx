import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View, Text, Image } from 'react-native';

interface Props {
  setScreen: (screen: string) => void;
}

export default function HomeScreen({ setScreen }: Props) {
  const rocketPosition = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;

  const launchRocket = () => {
    Animated.timing(rocketPosition, { toValue: -600, duration: 2000, useNativeDriver: true }).start(() => {
      setScreen('blankScreen');
    });
    Animated.timing(buttonOpacity, { toValue: 0, duration: 500, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image source={require('@/assets/images/launchApp.png')} style={[styles.rocket, { transform: [{ translateY: rocketPosition }] }]} />
      <Animated.View style={{ opacity: buttonOpacity }}>
        <TouchableOpacity style={styles.startButton} onPress={launchRocket}>
          <Text style={styles.buttonText}>Launch App</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  rocket: { width: 400, height: 400 },
  startButton: { backgroundColor: 'black', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
