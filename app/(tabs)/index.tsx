import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\HomeScreen.tsx';
import BlankScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\BlankScreen';
import LoginScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\LoginScreen';
import SignUpScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\SignUpScreen';
import WorkerAuthScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\WorkerAuthScreen';
import WorkerScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\WorkerScreen';
import ImageUploadScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\ImageUploadScreen'; 
import TakePictureScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\TakePictureScreen';

export default function App() {
  const [screen, setScreen] = useState('home');

  return (
    <View style={styles.container}>
      {screen === 'home' && <HomeScreen setScreen={setScreen} />}
      {screen === 'blankScreen' && <BlankScreen setScreen={setScreen} />}
      {screen === 'workerAuth' && <WorkerAuthScreen setScreen={setScreen} />}
      {screen === 'login' && <LoginScreen setScreen={setScreen} />}
      {screen === 'SignUp' && <SignUpScreen setScreen={setScreen} />}
      {screen === 'worker' && <WorkerScreen setScreen={setScreen} />}
      {screen === 'imageUpload' && <ImageUploadScreen setScreen={setScreen} />}  
      {screen === 'takepicture' && <TakePictureScreen setScreen={setScreen} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
