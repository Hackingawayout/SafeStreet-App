import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function LoginScreen({ setScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const puppyPosition = useState(new Animated.Value(100))[0];

  const carX = useState(new Animated.Value(0))[0];
  const carY = useState(new Animated.Value(0))[0];
  const carRotation = useState(new Animated.Value(0))[0];

  useEffect(() => {

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(carX, {
            toValue: 300,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(carRotation, {
            toValue: 0, 
            duration: 300,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(carY, {
            toValue: 347,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(carRotation, {
            toValue: 90,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(carX, {
            toValue: -87,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(carRotation, {
            toValue: 200, 
            duration: 300,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(carY, {
            toValue: -20,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(carRotation, {
            toValue: 270, 
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const validateAndLogin = () => {
    setErrorMessage('');
    if (!email.includes('@')) {
      setErrorMessage('Email must contain @');
      return;
    }
    if (password.length < 8 || !/\d/.test(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one number');
      return;
    }
    Alert.alert('Login Successful', `Welcome, ${email}`);
    setScreen('worker'); // Redirect to under repair page
  };

  return (
    <ImageBackground source={require('@/assets/images/damagedroad.png')} style={styles.background}>
      <View style={styles.container}>
        <Animated.View style={[styles.puppyContainer, { transform: [{ translateY: puppyPosition }] }]}> 
          <Image source={{ uri: 'https://media.tenor.com/LcGnQeGx2dgAAAAC/love-hearts-nods.gif' }} style={styles.puppyImage} />
        </Animated.View>
        
        <Animated.View style={[styles.carContainer, { 
          transform: [
            { translateX: carX }, 
            { translateY: carY }, 
            { rotate: carRotation.interpolate({
                inputRange: [0, 90, 180, 270], 
                outputRange: ['0deg', '90deg', '180deg', '270deg'] 
            }) }
          ] 
        }]}> 
          <Image source={require('@/assets/images/car.png')} style={styles.carImage} />
        </Animated.View>
        
        <View style={styles.authContainer}>
          <ThemedText type="title" style={styles.authTitle}>Login</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <TouchableOpacity style={styles.submitButton} onPress={validateAndLogin}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Submit</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPassword} onPress={() => Alert.alert('Reset Password', 'Password reset link sent to your email.') }>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('blankScreen')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export function UnderRepairScreen() {
  return (
    <ImageBackground source={require('@/assets/images/underrepair.png')} style={styles.underRepairBackground}>
      <View style={styles.underRepairContainer}>
        <Text style={styles.underRepairText}>🚧 Site Under Maintenance 🚧</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 5,
    borderColor: 'yellow',
  },
  puppyContainer: {
    position: 'absolute',
    top: -30,
    left: 10,
  },
  puppyImage: {
    width: 80,
    height: 80,
  },
  carContainer: {
    position: 'absolute',
    top: -40,
    left: 10,
  },
  carImage: {
    width: 100,
    height: 80,
  },
  authContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  underRepairBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  underRepairContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
  },
  underRepairText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
