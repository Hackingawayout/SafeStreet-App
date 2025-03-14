import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  setScreen: (screen: string) => void;
}

export default function WorkerAuthScreen({ setScreen }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Worker Authentication</Text>

      {/* Buttons placed next to each other */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('SignUp')}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => setScreen('blankScreen')}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
  title: { fontSize: 28, color: 'white', marginBottom: 20 },

  // ✅ This wraps "Login" & "SignUp" buttons next to each other
  buttonContainer: { 
    flexDirection: 'row',  // Arrange items in a row
    gap: 20,               // Adds spacing between buttons
  },

  button: { 
    backgroundColor: 'white', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 8, 
  },

  buttonText: { fontSize: 18, color: 'black' },

  backButton: { 
    backgroundColor: 'red', 
    padding: 10, 
    borderRadius: 8, 
    marginTop: 20, 
  },
});
