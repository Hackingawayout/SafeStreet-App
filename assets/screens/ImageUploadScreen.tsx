import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function ImageUploadScreen({ setScreen }) {
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [marker, setMarker] = useState(null);
  const [locationText, setLocationText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (reverseGeocode.length > 0) {
      let address = reverseGeocode[0];
      setLocationText(
        `${address.name ? address.name + ', ' : ''}` +
        `${address.street ? address.street + ', ' : ''}` +
        `${address.district ? address.district + ', ' : ''}` +
        `${address.subregion ? address.subregion + ', ' : ''}` +
        `${address.city ? address.city + ', ' : ''}` +
        `${address.postalCode ? address.postalCode : ''}`
      );
    } else {
      setLocationText("Address not found");
    }
  };

  const searchLocation = async () => {
    if (!searchQuery) return;
    let results = await Location.geocodeAsync(searchQuery);
    if (results.length > 0) {
      const { latitude, longitude } = results[0];
      setMarker({ latitude, longitude });
      handleMapPress({ nativeEvent: { coordinate: { latitude, longitude } } });
    } else {
      Alert.alert('Location not found');
    }
  };

  const handleUpload = () => {
    if (!image || !marker) {
      Alert.alert('Error', 'Please select an image and pin a location.');
      return;
    }
    Alert.alert('Success', 'Data sent to the Supervisor!');
    setScreen('workerDashboard');
  };

  return (
    <ImageBackground source={require('@/assets/images/potholeclick.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Upload an Image</Text>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>📁 Select an Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}

        <TextInput
          style={styles.input}
          placeholder="Enter Address (Optional)"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.subtitle}>📍 Pin location on the map</Text>

        <TextInput
          style={styles.input}
          placeholder="Search for a location"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchLocation}
        />

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 20.5937,
            longitude: 78.9629,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
          onPress={handleMapPress}
        >
          {marker && <Marker coordinate={marker} />}
        </MapView>

        {locationText !== '' && <Text style={styles.locationText}>{locationText}</Text>}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.buttonText}>⬆ Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setScreen('workerDashboard')}>
            <Text style={styles.buttonText}>⬅ Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' },
  container: { width: '90%', maxWidth: 400, backgroundColor: '#333', padding: 20, borderRadius: 10, alignItems: 'center', borderWidth: 5, borderColor: 'yellow' },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { color: 'white', fontSize: 16, marginBottom: 10 },
  button: { backgroundColor: '#3498db', paddingVertical: 12, paddingHorizontal: 50, borderRadius: 8, marginVertical: 10 },
  buttonText: { color: 'white', fontSize: 16, textAlign: 'center' },
  previewImage: { width: 200, height: 200, marginVertical: 10, borderRadius: 10 },
  input: { width: '100%', height: 40, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, marginVertical: 8 },
  map: { width: '100%', height: 200, marginVertical: 10, borderRadius: 10 },
  locationText: { color: 'white', fontSize: 16, marginTop: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 },
  uploadButton: { backgroundColor: 'green', flex: 1, paddingVertical: 12, borderRadius: 8, marginHorizontal: 5 },
  backButton: { backgroundColor: 'red', flex: 1, paddingVertical: 12, borderRadius: 8, marginHorizontal: 5 },
});