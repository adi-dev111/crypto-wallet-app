# Crypto Wallet App - React Native

A fully functional Ethereum cryptocurrency wallet application built with React Native. This app allows users to generate secure Ethereum wallets, view balances, check transaction history, and manage assets across multiple networks.

## 🚀 Features

- **🔐 Wallet Generation**: Create new Ethereum wallets with secure private keys
- **📱 Multi-Network Support**: Works with Ethereum Mainnet, Sepolia Testnet, and Goerli Testnet
- **💰 Balance Checking**: View real-time ETH balances for any address
- **📊 Transaction History**: Display last 5 transactions for any wallet
- **📷 QR Code Generator**: Generate QR codes for easy address sharing
- **📋 Copy to Clipboard**: One-tap copying of addresses and private keys
- **🔗 Block Explorer Links**: Direct links to view transactions on blockchain explorers
- **🎨 Modern UI**: Clean and intuitive user interface

## 🛠️ Technology Stack

- **Frontend Framework**: React Native 0.81.0
- **Programming Language**: TypeScript
- **Blockchain Library**: Ethers.js
- **UI Components**: React Native Core
- **QR Generation**: react-native-qrcode-svg
- **Clipboard Management**: @react-native-clipboard/clipboard

3# 🏗️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Android Studio (for Android development)
- Java Development Kit (JDK 11)
- Git

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adi-dev111/crypto-wallet-app.git
   cd crypto-wallet-app

2.  ** Install dependencies**
  npm install
3. Setup Android environment

Open Android Studio

Install required SDKs and NDK

Configure Android Virtual Device (AVD)

4. Run the application
   npx react-native run-android

**Building for Production**

1. Generate release APK
   cd android
./gradlew assembleRelease

2. Find the APK file

Path: android/app/build/outputs/apk/release/app-release.apk

🌐 Supported Networks
- Ethereum Mainnet - Real ETH transactions

- Sepolia Testnet - Test ETH for development

- Goerli Testnet - Test ETH for development

⚠️ Security Notes
-🔒 Never share your private keys with anyone

-🛡️ This is a demonstration app for portfolio purposes

-💡 Use test networks for experimentation

-🚫 Do not store significant funds in wallets created by this app

🎯 Usage
1.Generate Wallet: Tap "Generate New Wallet" to create a new Ethereum wallet

2.View Details: See your public address and private key (keep it secure!)

3.Check Balance: Tap "Check Balance" to see your ETH balance

4.View Transactions: See recent transaction history

5.Copy/Share: Use copy buttons or QR code to share your address

🚦 Future Enhancements
-Send ETH functionality

-Token balance support (ERC-20)

-Biometric authentication

-Multi-language support

-Dark mode theme

-Wallet import/export functionality

👨‍💻 Developer
_**Adil - Software Engineer with 20+ years of experience in Android, Blockchain, and AI technologies.
**_
🔗 Portfolio: 

💼 LinkedIn: 

📧 Email:

🙏 Acknowledgments
-Etherscan for their excellent API services

-React Native community for amazing documentation

-Ethereum community for blockchain infrastructure
