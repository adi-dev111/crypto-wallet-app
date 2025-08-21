// App.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// Import ethers
import { ethers } from 'ethers';

const App = () => {
  // State to hold the generated private key and address
  const [privateKey, setPrivateKey] = useState('');
  const [publicAddress, setPublicAddress] = useState('');

  // Function to generate a new wallet
  const generateWallet = () => {
    try {
      // Create a new random wallet
      const newWallet = ethers.Wallet.createRandom();
      // Get the private key and address
      const newPrivateKey = newWallet.privateKey;
      const newAddress = newWallet.address;

      // Update the state to display on screen
      setPrivateKey(newPrivateKey);
      setPublicAddress(newAddress);

      // Optional: Show a success alert
      Alert.alert('کامیابی!', 'نیا والیٹ بن گیا ہے!');
    } catch (error) {
      // Yahan error ko string mein convert kar dia gaya hai
      Alert.alert('ناکامی', 'والیٹ بنانے میں مسئلہ ہوا: ' + String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>میرا Crypto والیٹ</Text>
      <Text style={styles.subtitle}>Adil Bhai ki Pehli App</Text>

      {/* Button to generate wallet */}
      <TouchableOpacity style={styles.button} onPress={generateWallet}>
        <Text style={styles.buttonText}>نیا والیٹ بنائیں</Text>
      </TouchableOpacity>

      {/* Display the generated keys */}
      {privateKey ? (
        <View style={styles.keyContainer}>
          <Text style={styles.label}>Private Key (خفیہ چابی):</Text>
          <Text style={styles.value}>{privateKey}</Text>

          <Text style={styles.label}>Public Address (عوامی پتہ):</Text>
          <Text style={styles.value}>{publicAddress}</Text>

          <Text style={styles.warning}>
            ⚠️ Warning: Private Key کسی کے ساتھ شیئر مت کریں! پیسے ضائع ہو سکتے ہیں۔
          </Text>
        </View>
      ) : null}
    </View>
  );
};

// Styles for our components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  keyContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  value: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    fontSize: 12, // Small font to fit long keys
  },
  warning: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 12,
  },
});

export default App;
