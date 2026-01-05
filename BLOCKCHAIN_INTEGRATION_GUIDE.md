# Blockchain Integration Guide

This document explains how to use the blockchain features in your healthcare application.

## Overview

Your application now has blockchain integration that allows you to:
- ✅ Store medical records immutably on Polygon blockchain
- ✅ Create tamper-proof prescription records
- ✅ Track appointments on-chain
- ✅ Manage patient access controls
- ✅ Use IPFS for secure file storage

## Architecture

```
Patient Data → IPFS (File Storage) → IPFS Hash → Blockchain (Reference)
                ↓
          Store on Pinata
                ↓
          Get IPFS Hash (QmXx...)
                ↓
          Smart Contract stores Hash
                ↓
          Immutable on Blockchain
```

## Setup Instructions

### 1. **Install Dependencies**

```bash
npm install
npm install ethers
```

### 2. **Deploy Smart Contract**

#### Option A: Using Remix IDE (Easy)
1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create new file `MedicalRecordsStorage.sol`
3. Copy contract from `src/contracts/MedicalRecordsStorage.sol`
4. Compile with Solidity 0.8.0+
5. Deploy to Polygon Mumbai using MetaMask

#### Option B: Using Hardhat (Advanced)
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
# Copy contract to contracts/ folder
npx hardhat run scripts/deploy.js --network mumbai
```

### 3. **Setup Environment Variables**

Create `.env.local` file in project root:

```env
# Smart Contract Address (from deployment)
VITE_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890

# Pinata IPFS API Keys
VITE_PINATA_API_KEY=your_api_key_here
VITE_PINATA_SECRET_KEY=your_secret_key_here
```

### 4. **Get Pinata API Keys**

1. Visit [Pinata Cloud](https://app.pinata.cloud)
2. Sign up for free account
3. Go to API Keys section
4. Generate new API key
5. Copy keys to `.env.local`

### 5. **Setup MetaMask**

1. Install [MetaMask](https://metamask.io) browser extension
2. Add Polygon Mumbai network:
   - **Network Name**: Polygon Mumbai
   - **RPC URL**: https://rpc-mumbai.maticvigil.com
   - **Chain ID**: 80001
   - **Currency**: MATIC
3. Get test MATIC from [Faucet](https://faucet.polygon.technology/)

### 6. **Run Application**

```bash
npm run dev
```

Visit `http://localhost:5173` and connect your wallet!

## Usage

### For Patients

1. **Connect Wallet**: Click "Connect Wallet" button
2. **Store Records**: Use BlockchainRecordUpload component
3. **View Records**: See all on-chain medical records
4. **Share Access**: Grant doctors permission to view records

### For Doctors

1. **View Patient Records**: Access granted prescriptions and reports
2. **Create Prescriptions**: Store on blockchain automatically
3. **Track History**: View complete patient history

## Component Usage

### BlockchainConnect
```jsx
<BlockchainConnect onConnected={(address) => {
  console.log("Connected:", address);
}} />
```

### BlockchainRecordUpload
```jsx
<BlockchainRecordUpload 
  patientId="patient123" 
  onSuccess={(result) => {
    console.log("Transaction:", result.transactionHash);
  }}
/>
```

### BlockchainRecordViewer
```jsx
<BlockchainRecordViewer 
  patientId="patient123"
  recordType="prescription"
/>
```

## Smart Contract Functions

### Store Medical Record
```javascript
await blockchainService.storeMedicalRecord(
  patientId,
  recordType,    // "prescription", "labReport", etc.
  ipfsHash       // IPFS hash from Pinata
);
```

### Get Medical Records
```javascript
const records = await blockchainService.getMedicalRecords(patientId);
// Returns array of {recordType, ipfsHash, timestamp}
```

### Store Prescription
```javascript
await blockchainService.storePrescription(
  patientId,
  doctorId,
  medication,
  dosage,
  duration       // in days
);
```

### Grant Access
```javascript
await blockchainService.contract.grantAccess(patientId, doctorId);
```

## IPFS Integration

### Upload File
```javascript
import ipfsService from '../services/ipfsService';

const file = new File([data], "report.pdf", { type: "application/pdf" });
const { hash, url } = await ipfsService.uploadFile(file);
```

### Upload JSON Data
```javascript
const medicalData = {
  patient: "John",
  diagnosis: "Fever",
  treatment: "Rest"
};
const { hash } = await ipfsService.uploadJSON(medicalData);
```

### Retrieve File
```javascript
const file = await ipfsService.getFile(ipfsHash);
```

## Network Information

### Polygon Mumbai (Testnet - FREE)
- **Best for**: Development & Testing
- **Gas Fees**: Free
- **Explorer**: https://mumbai.polygonscan.com
- **Faucet**: https://faucet.polygon.technology/

### Polygon Mainnet (Mainnet - PRODUCTION)
- **Best for**: Production
- **Gas Fees**: Very low (few cents)
- **Explorer**: https://polygonscan.com
- **RPC**: https://polygon-rpc.com

## Security Considerations

1. **Never expose private keys** in code
2. **Use environment variables** for sensitive data
3. **Implement role-based access** for medical records
4. **Enable 2FA** on Pinata account
5. **Audit smart contracts** before mainnet deployment
6. **Encrypt sensitive data** before storing on IPFS

## Troubleshooting

### MetaMask not connecting
- Ensure MetaMask is installed and unlocked
- Try refreshing the page
- Check browser console for errors

### "Contract not initialized" error
- Verify CONTRACT_ADDRESS in .env.local
- Check that address is deployed on correct network
- Ensure you're on Polygon Mumbai network

### IPFS upload failing
- Check Pinata API keys are correct
- Verify network connection
- Check file size (Pinata has limits)

### Transaction failing
- Ensure you have enough test MATIC
- Check contract address is valid
- Verify transaction parameters

## Next Steps

1. **Customize components** for your design
2. **Add patient consent** workflows
3. **Implement audit trails** for data access
4. **Create doctor-patient matching** system
5. **Add encryption** for IPFS data
6. **Implement payment** for services using smart contracts

## Resources

- [Ethers.js Documentation](https://docs.ethers.org/)
- [Polygon Docs](https://polygon.technology/developers)
- [IPFS Docs](https://docs.ipfs.tech/)
- [Solidity Docs](https://docs.soliditylang.org/)
- [Remix IDE](https://remix.ethereum.org/)
- [MetaMask Support](https://support.metamask.io/)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review smart contract on block explorer
3. Check IPFS file on [Pinata](https://app.pinata.cloud)
4. Review browser console for error messages
