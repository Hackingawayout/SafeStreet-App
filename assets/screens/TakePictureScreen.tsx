import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function TakePictureScreen({ setScreen }) {
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [pinLocation, setPinLocation] = useState(null);
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    console.log('TakePictureScreen Loaded');
  }, []);

  const takePicture = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required.');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      extractLocation();
    }
  };

  const extractLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required.');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    let reverseGeocode = await Location.reverseGeocodeAsync(loc.coords);
    if (reverseGeocode.length > 0) {
      let addressData = reverseGeocode[0];
      setAddress(
        `${addressData.name || ''}, ${addressData.street || ''}, ${
          addressData.subregion || ''
        }, ${addressData.city || ''}, ${addressData.postalCode || ''}`
      );
      setLocation(loc.coords);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Take an Image</Text>
        <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
          <Text style={styles.buttonText}>📷 Click an Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
        {address && <Text style={styles.addressText}>Address: {address}</Text>}
        {showMap && (
          <View>
            <Text style={styles.pinText}>Pin location on the map</Text>
            <MapView
              style={styles.map}
              initialRegion={{ latitude: 20.5937, longitude: 78.9629, latitudeDelta: 10, longitudeDelta: 10 }}
              onPress={(e) => setPinLocation(e.nativeEvent.coordinate)}
            >
              {pinLocation && <Marker coordinate={pinLocation} />}
            </MapView>
            {pinLocation && (
              <Text style={styles.pinLocationText}>
                Pinned Location: {pinLocation.latitude}, {pinLocation.longitude}
              </Text>
            )}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.okButton} onPress={() => setShowMap(false)}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noButton} onPress={() => setShowMap(true)}>
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              Alert.alert('Success', 'Sent to the Supervisor');
              setScreen('workerDashboard');
            }}
          >
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('workerDashboard')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
  container: { width: '90%', maxWidth: 400, backgroundColor: '#333', padding: 20, borderRadius: 10, alignItems: 'center', borderWidth: 2, borderColor: 'red' },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  cameraButton: { backgroundColor: '#e74c3c', paddingVertical: 12, paddingHorizontal: 50, borderRadius: 8, marginVertical: 10 },
  buttonText: { color: 'white', fontSize: 16, textAlign: 'center' },
  previewImage: { width: 200, height: 200, marginVertical: 10 },
  addressText: { color: 'yellow', fontSize: 14, marginVertical: 5 },
  pinText: { color: 'white', fontSize: 16, marginBottom: 5 },
  pinLocationText: { color: 'yellow', fontSize: 14, marginTop: 5 },
  map: { width: 300, height: 200, marginVertical: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 },
  okButton: { backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8 },
  noButton: { backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8 },
  uploadButton: { backgroundColor: '#3498db', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8 },
  authBackButton: { backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8, marginTop: 15 },
});