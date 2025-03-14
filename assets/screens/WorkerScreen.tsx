import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from 'react-native';

export default function WorkerScreen({ setScreen }) {
  return (
    <ImageBackground source={require('@/assets/images/potholeclick.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose an Option</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={() => setScreen('imageUpload')}>
          <Text style={styles.buttonText}>📁 Upload an Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton} onPress={() => setScreen('takePicture')}>
          <Text style={styles.buttonText}>📷 Take a Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('login')}>
          <Text style={styles.buttonText}>⬅ Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' },
  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'yellow',
  },
  uploadButton: { backgroundColor: '#3498db', paddingVertical: 12, paddingHorizontal: 50, borderRadius: 8, marginVertical: 10 },
  cameraButton: { backgroundColor: '#e74c3c', paddingVertical: 12, paddingHorizontal: 50, borderRadius: 8, marginVertical: 10 },
  buttonText: { color: 'white', fontSize: 16, textAlign: 'center' },
  authBackButton: { backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 50, borderRadius: 8, marginTop: 15 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
