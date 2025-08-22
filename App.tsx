// App.tsx
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Linking } from 'react-native';
import { ethers } from 'ethers';
import Clipboard from '@react-native-clipboard/clipboard';

// Network types definition
type NetworkType = 'MAINNET' | 'SEPOLIA' | 'GOERLI';

interface NetworkInfo {
  name: string;
  apiUrl: string;
  explorer: string;
}

const NETWORKS: Record<NetworkType, NetworkInfo> = {
  MAINNET: {
    name: 'Ethereum Mainnet',
    apiUrl: 'https://api.etherscan.io/api',
    explorer: 'https://etherscan.io'
  },
  SEPOLIA: {
    name: 'Sepolia Testnet',
    apiUrl: 'https://api-sepolia.etherscan.io/api',
    explorer: 'https://sepolia.etherscan.io'
  },
  GOERLI: {
    name: 'Goerli Testnet',
    apiUrl: 'https://api-goerli.etherscan.io/api',
    explorer: 'https://goerli.etherscan.io'
  }
};

const App = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicAddress, setPublicAddress] = useState('');
  const [balance, setBalance] = useState<string>('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>('MAINNET');
  const [networkApiKey, setNetworkApiKey] = useState<string>('5X139B7VQNVTV8ZPERWFMIIFCVEC41JWR2');

  const generateWallet = () => {
    try {
      const newWallet = ethers.Wallet.createRandom();
      const newPrivateKey = newWallet.privateKey;
      const newAddress = newWallet.address;

      setPrivateKey(newPrivateKey);
      setPublicAddress(newAddress);
      setBalance('');
      setTransactions([]);
      Alert.alert('Success!', 'New wallet created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to generate wallet: ' + String(error));
    }
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied!', 'Text has been copied to clipboard.');
  };

  const fetchBalance = async (address: string) => {
    try {
      const response = await fetch(
        `${NETWORKS[selectedNetwork].apiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${networkApiKey}`
      );
      const data = await response.json();
      
      const balanceInETH = parseFloat(data.result) / 1000000000000000000;
      setBalance(balanceInETH.toFixed(6));
      Alert.alert('Balance', `Account balance: ${balanceInETH.toFixed(6)} ETH`);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch balance: ' + String(error));
    }
  };

  const fetchTransactions = async (address: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${NETWORKS[selectedNetwork].apiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${networkApiKey}`
      );
      const data = await response.json();
      
      if (data.status === '1') {
        setTransactions(data.result.slice(0, 5));
      } else {
        Alert.alert('Info', 'No transactions found for this address');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch transactions: ' + String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Crypto Wallet</Text>
      <Text style={styles.subtitle}>Adil's React Native App</Text>

      {/* Network Selection */}
      <View style={styles.networkContainer}>
        <Text style={styles.networkLabel}>Select Network:</Text>
        <View style={styles.networkButtons}>
          <TouchableOpacity 
            style={[styles.networkButton, selectedNetwork === 'MAINNET' && styles.networkButtonActive]}
            onPress={() => {
              setSelectedNetwork('MAINNET');
              setNetworkApiKey('5X139B7VQNVTV8ZPERWFMIIFCVEC41JWR2');
            }}
          >
            <Text style={styles.networkButtonText}>Mainnet</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.networkButton, selectedNetwork === 'SEPOLIA' && styles.networkButtonActive]}
            onPress={() => {
              setSelectedNetwork('SEPOLIA');
              setNetworkApiKey('5X139B7VQNVTV8ZPERWFMIIFCVEC41JWR2');
            }}
          >
            <Text style={styles.networkButtonText}>Sepolia</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.networkButton, selectedNetwork === 'GOERLI' && styles.networkButtonActive]}
            onPress={() => {
              setSelectedNetwork('GOERLI');
              setNetworkApiKey('5X139B7VQNVTV8ZPERWFMIIFCVEC41JWR2');
            }}
          >
            <Text style={styles.networkButtonText}>Goerli</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.networkInfo}>
        Current Network: {NETWORKS[selectedNetwork].name}
      </Text>

      <TouchableOpacity style={styles.button} onPress={generateWallet}>
        <Text style={styles.buttonText}>Generate New Wallet</Text>
      </TouchableOpacity>

      {publicAddress ? (
        <View style={styles.qrContainer}>
          <Text style={styles.label}>QR Code (Public Address):</Text>
          <QRCode
            value={publicAddress}
            size={200}
            backgroundColor="white"
            color="black"
          />
        </View>
      ) : null}

      {privateKey ? (
        <View style={styles.keyContainer}>
          <Text style={styles.label}>Private Key:</Text>
          <View style={styles.row}>
            <Text style={styles.value}>{privateKey}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(privateKey)} style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Public Address:</Text>
          <View style={styles.row}>
            <Text style={styles.value}>{publicAddress}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(publicAddress)} style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={() => fetchBalance(publicAddress)} 
            style={styles.balanceButton}
          >
            <Text style={styles.balanceButtonText}>Check Balance</Text>
          </TouchableOpacity>

          {balance ? (
            <Text style={styles.balanceText}>Balance: {balance} ETH</Text>
          ) : null}

          <TouchableOpacity 
            onPress={() => fetchTransactions(publicAddress)} 
            style={styles.transactionButton}
            disabled={loading}
          >
            <Text style={styles.transactionButtonText}>
              {loading ? 'Loading...' : 'View Transactions'}
            </Text>
          </TouchableOpacity>

          {transactions.length > 0 ? (
            <View style={styles.transactionContainer}>
              <Text style={styles.transactionTitle}>Last 5 Transactions:</Text>
              {transactions.map((tx, index) => (
                <View key={index} style={styles.transactionItem}>
                  <Text style={styles.txHash}>
                    Hash: {tx.hash.substring(0, 12)}...{tx.hash.substring(tx.hash.length - 6)}
                  </Text>
                  <Text style={styles.txValue}>
                    Value: {(parseInt(tx.value) / 1000000000000000000).toFixed(6)} ETH
                  </Text>
                  <Text style={styles.txFrom}>From: {tx.from.substring(0, 10)}...</Text>
                  <Text style={styles.txTo}>To: {tx.to.substring(0, 10)}...</Text>
                  <TouchableOpacity 
                    onPress={() => Linking.openURL(`${NETWORKS[selectedNetwork].explorer}/tx/${tx.hash}`)}
                  >
                    <Text style={styles.explorerLink}>View on Explorer</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : null}

          <Text style={styles.warning}>
            ⚠️ Warning: Never share your Private Key with anyone! You may lose funds.
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 12,
    flex: 1,
  },
  warning: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  balanceButton: {
    backgroundColor: '#6f42c1',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  balanceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  balanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 5,
    marginBottom: 10,
  },
  transactionButton: {
    backgroundColor: '#fd7e14',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  transactionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transactionContainer: {
    marginTop: 15,
    width: '100%',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  transactionItem: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  txHash: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6c757d',
  },
  txValue: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: 'bold',
  },
  txFrom: {
    fontSize: 10,
    color: '#6c757d',
  },
  txTo: {
    fontSize: 10,
    color: '#6c757d',
  },
  explorerLink: {
    color: '#007bff',
    fontSize: 12,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  networkContainer: {
    marginBottom: 20,
    width: '100%',
  },
  networkLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  networkButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  networkButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  networkButtonActive: {
    backgroundColor: '#007bff',
  },
  networkButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  networkInfo: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default App;
