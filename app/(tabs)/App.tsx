import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\HomeScreen.tsx';
import BlankScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\BlankScreen';
import LoginScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\LoginScreen';
import SignUpScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\SignUpScreen';
import WorkerAuthScreen from 'C:\\Coding\\PS 2-2 project\\SafeStreet\\MyExpoApp\\assets\\screens\\WorkerAuthScreen';
import UnderRepairScreen from '../../assets/screens/WorkerScreen';

export default function App() {
  const [screen, setScreen] = useState('home');

  return (
    <View style={styles.container}>
      {screen === 'home' && <HomeScreen setScreen={setScreen} />}
      {screen === 'blankScreen' && <BlankScreen setScreen={setScreen} />}
      {screen === 'workerAuth' && <WorkerAuthScreen setScreen={setScreen} />}
      {screen === 'login' && <LoginScreen setScreen={setScreen} />}
      {screen === 'SignUp' && <SignUpScreen setScreen={setScreen} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
