import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Video } from 'expo-av';

interface Props {
  setScreen: (screen: string) => void;
}

export default function BlankScreen({ setScreen }: Props) {
  return (
    <View style={styles.container}>
      <Video source={require('@/assets/videos/road_with_potholes.mp4')} style={styles.videoBackground} resizeMode="cover" shouldPlay isLooping isMuted />
      <View style={styles.overlay}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Safe Street</Text>

        {/* Button Container with Row Layout */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setScreen('workerAuth')}>
            <Text style={styles.buttonText}>Worker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setScreen('workerAuth')}>
            <Text style={styles.buttonText}>Supervisor</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  videoBackground: { position: 'absolute', width: '100%', height: '100%' },
  overlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)' 
  },
  logo: { 
    width: 120, 
    height: 120, 
    marginBottom: 20, 
    borderRadius: 60, // Makes the logo circular
    overflow: 'hidden', // Ensures the image does not exceed the border radius
  },  
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 20 },

  // ✅ Style to place buttons side by side
  buttonContainer: { 
    flexDirection: 'row', // Arrange items horizontally
    gap: 20, // Add space between buttons
  },
  
  button: { 
    backgroundColor: 'white', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 8, 
  },
  
  buttonText: { fontSize: 18, color: 'black', fontWeight: 'bold' },
});

