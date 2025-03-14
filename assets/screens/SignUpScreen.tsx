import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { ThemedText } from '@/components/ThemedText';

interface Props {
  setScreen: (screen: string) => void;
}

export default function SignUpScreen({ setScreen }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const validateAndSignUp = () => {
    if (!firstName || !lastName || !email.includes('@') || password.length < 8) {
      Alert.alert('Error', 'Please fill all required fields correctly.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('Error', 'You must agree to Terms & Privacy Policy.');
      return;
    }
    Alert.alert('Signup Successful', `Welcome, ${firstName}!`);
    setScreen('login');
  };

  return (
    <ImageBackground source={require('@/assets/images/damagedroad.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          <ThemedText type="title" style={styles.authTitle}>
            Sign Up
          </ThemedText>

          {/* Input Fields */}
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
          </View>

          <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxRow}>
              <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} color={agreeTerms ? 'green' : undefined} />
              <Text style={styles.checkboxText}>I agree to Terms & Conditions and Privacy Policy</Text>
            </View>
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.submitButton} onPress={validateAndSignUp}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Sign Up</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.authBackButton} onPress={() => setScreen('workerAuth')}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },

  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },

  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#333',
    padding: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'yellow',
    minHeight: 500,
    justifyContent: 'center',
  },

  authTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 15 },

  input: { width: '100%', height: 40, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, marginVertical: 6 },

  halfInput: { width: '48%' },

  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },

  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },

  checkboxText: { color: 'white', fontSize: 14, flexShrink: 1 },

  submitButton: { marginTop: 10, backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 40, borderRadius: 8 },

  buttonText: { color: 'white', fontSize: 16, textAlign: 'center' },

  authBackButton: { backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 50, borderRadius: 8, marginTop: 15 },
});
