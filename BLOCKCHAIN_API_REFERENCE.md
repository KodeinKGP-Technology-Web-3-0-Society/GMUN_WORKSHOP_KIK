# Blockchain Integration - API Reference

## BlockchainService

Main service for interacting with smart contracts and blockchain.

### Connection Methods

#### `connectWallet()`
Connect user's MetaMask wallet to the application.

```javascript
const address = await blockchainService.connectWallet();
console.log("Connected:", address);
```

**Returns**: `string` - Wallet address  
**Throws**: Error if MetaMask not installed

---

#### `initContract(contractAddress)`
Initialize smart contract for interaction.

```javascript
await blockchainService.initContract('0x1234...');
```

**Parameters**:
- `contractAddress` (string) - Deployed contract address

**Returns**: `boolean` - true if successful  
**Throws**: Error if initialization fails

---

### Medical Records

#### `storeMedicalRecord(patientId, recordType, ipfsHash)`
Store medical record reference on blockchain.

```javascript
const result = await blockchainService.storeMedicalRecord(
  'patient123',
  'prescription',
  'QmXx...'
);
// {
//   success: true,
//   transactionHash: '0x...',
//   blockNumber: 12345
// }
```

**Parameters**:
- `patientId` (string) - Patient identifier
- `recordType` (string) - Type of record (prescription, labReport, appointment, diagnosis, etc.)
- `ipfsHash` (string) - IPFS hash from Pinata

**Returns**: `object` - Transaction details

---

#### `getMedicalRecords(patientId)`
Retrieve all medical records for a patient.

```javascript
const records = await blockchainService.getMedicalRecords('patient123');
// [
//   {
//     recordType: 'prescription',
//     ipfsHash: 'QmXx...',
//     timestamp: 1234567890
//   },
//   ...
// ]
```

**Parameters**:
- `patientId` (string) - Patient identifier

**Returns**: `array` - Array of record objects

---

### Prescriptions

#### `storePrescription(patientId, doctorId, medication, dosage, duration)`
Store prescription on blockchain.

```javascript
const result = await blockchainService.storePrescription(
  'patient123',
  'doctor456',
  'Amoxicillin',
  '500mg - 3x daily',
  7
);
```

**Parameters**:
- `patientId` (string) - Patient identifier
- `doctorId` (string) - Doctor identifier
- `medication` (string) - Medication name
- `dosage` (string) - Dosage instructions
- `duration` (number) - Duration in days

**Returns**: `object` - Transaction details

---

#### `getPrescriptions(patientId)`
Retrieve all prescriptions for a patient.

```javascript
const prescriptions = await blockchainService.getPrescriptions('patient123');
```

**Parameters**:
- `patientId` (string) - Patient identifier

**Returns**: `array` - Array of prescription objects

---

### Appointments

#### `storeAppointment(patientId, doctorId, appointmentDate)`
Store appointment on blockchain.

```javascript
const result = await blockchainService.storeAppointment(
  'patient123',
  'doctor456',
  new Date('2024-01-20')
);
```

**Parameters**:
- `patientId` (string) - Patient identifier
- `doctorId` (string) - Doctor identifier
- `appointmentDate` (Date) - Appointment date and time

**Returns**: `object` - Transaction details

---

#### `getAppointments(patientId)`
Retrieve all appointments for a patient.

```javascript
const appointments = await blockchainService.getAppointments('patient123');
```

**Parameters**:
- `patientId` (string) - Patient identifier

**Returns**: `array` - Array of appointment objects

---

### Network Information

#### `getNetworkInfo()`
Get current network and wallet information.

```javascript
const info = await blockchainService.getNetworkInfo();
// {
//   chainId: 80001,
//   name: 'maticmum',
//   balance: '0.5'
// }
```

**Returns**: `object` - Network details

---

### Connection Management

#### `disconnect()`
Disconnect wallet and clear services.

```javascript
blockchainService.disconnect();
```

**Returns**: `void`

---

#### `isConnected`
Property to check if wallet is connected.

```javascript
if (blockchainService.isConnected) {
  console.log("Wallet is connected");
}
```

**Type**: `boolean`

---

## IPFSService

Service for managing files on IPFS via Pinata.

### File Operations

#### `uploadFile(file)`
Upload file to IPFS.

```javascript
const file = new File([data], "report.pdf");
const { hash, url } = await ipfsService.uploadFile(file);
// {
//   hash: 'QmXx...',
//   url: 'https://gateway.pinata.cloud/ipfs/QmXx...'
// }
```

**Parameters**:
- `file` (File) - File object from input

**Returns**: `object` - {hash, url}

---

#### `uploadJSON(jsonData)`
Upload JSON data to IPFS.

```javascript
const data = {
  patient: "John",
  diagnosis: "Fever"
};
const { hash } = await ipfsService.uploadJSON(data);
```

**Parameters**:
- `jsonData` (object) - JSON object to store

**Returns**: `object` - {hash, url}

---

#### `getFile(ipfsHash)`
Retrieve file from IPFS.

```javascript
const blob = await ipfsService.getFile('QmXx...');
const url = URL.createObjectURL(blob);
```

**Parameters**:
- `ipfsHash` (string) - IPFS hash

**Returns**: `Blob` - File data

---

#### `getJSON(ipfsHash)`
Retrieve JSON from IPFS.

```javascript
const data = await ipfsService.getJSON('QmXx...');
console.log(data.patient);
```

**Parameters**:
- `ipfsHash` (string) - IPFS hash

**Returns**: `object` - JSON data

---

## React Components

### BlockchainConnect

Wallet connection button with MetaMask integration.

```jsx
<BlockchainConnect onConnected={(address) => {
  console.log("Connected:", address);
}} />
```

**Props**:
- `onConnected` (function) - Callback when wallet connects

---

### BlockchainRecordUpload

Form to upload medical records to blockchain.

```jsx
<BlockchainRecordUpload 
  patientId="patient123"
  onSuccess={(result) => {
    console.log("Stored!");
  }}
/>
```

**Props**:
- `patientId` (string) - Patient ID
- `onSuccess` (function) - Success callback

---

### BlockchainRecordViewer

Display medical records stored on blockchain.

```jsx
<BlockchainRecordViewer 
  patientId="patient123"
  recordType="prescription"
/>
```

**Props**:
- `patientId` (string) - Patient ID
- `recordType` (string) - Filter by type (optional)

---

### BlockchainPrescriptionStore

Form to store prescriptions on blockchain.

```jsx
<BlockchainPrescriptionStore 
  patientId="patient123"
  doctorId="doctor456"
/>
```

**Props**:
- `patientId` (string) - Patient ID
- `doctorId` (string) - Doctor ID

---

## Configuration

### BLOCKCHAIN_CONFIG

Main configuration object.

```javascript
import { BLOCKCHAIN_CONFIG } from './config/blockchain';

// Network settings
BLOCKCHAIN_CONFIG.NETWORK.name        // "Polygon Mumbai"
BLOCKCHAIN_CONFIG.NETWORK.chainId     // 80001
BLOCKCHAIN_CONFIG.NETWORK.rpcUrl      // RPC endpoint
BLOCKCHAIN_CONFIG.NETWORK.explorer    // Block explorer URL

// Contract
BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS    // Deployed contract

// IPFS
BLOCKCHAIN_CONFIG.IPFS.pinataApiKey   // API key
BLOCKCHAIN_CONFIG.IPFS.gatewayUrl     // Gateway URL

// Features
BLOCKCHAIN_CONFIG.FEATURES.storePrescriptions
BLOCKCHAIN_CONFIG.FEATURES.storeAppointments
BLOCKCHAIN_CONFIG.FEATURES.storeDiagnostics
BLOCKCHAIN_CONFIG.FEATURES.storeLabReports
BLOCKCHAIN_CONFIG.FEATURES.accessControl
```

---

## Error Handling

All service methods throw errors that should be caught:

```javascript
try {
  await blockchainService.storeMedicalRecord(...);
} catch (error) {
  if (error.message.includes("Contract not initialized")) {
    // Initialize contract first
  } else if (error.message.includes("MetaMask")) {
    // MetaMask not connected
  } else {
    // Other error
  }
}
```

Common errors:
- `"MetaMask is not installed"` - Install MetaMask
- `"Contract not initialized"` - Call initContract first
- `"Please connect wallet first"` - Connect wallet
- `"Failed to upload to IPFS"` - Check API keys
- `"Insufficient gas"` - Request test tokens

---

## Examples

### Complete Workflow

```javascript
// 1. Connect wallet
const address = await blockchainService.connectWallet();

// 2. Initialize contract
await blockchainService.initContract('0x...');

// 3. Upload file to IPFS
const file = new File([data], "report.pdf");
const { hash } = await ipfsService.uploadFile(file);

// 4. Store reference on blockchain
const result = await blockchainService.storeMedicalRecord(
  'patient123',
  'labReport',
  hash
);

// 5. Retrieve records
const records = await blockchainService.getMedicalRecords('patient123');

console.log("Stored successfully!", result.transactionHash);
```

### In React Component

```jsx
import { useState } from 'react';
import blockchainService from '../services/blockchainService';
import ipfsService from '../services/ipfsService';

export default function StoreRecord() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      const { hash } = await ipfsService.uploadFile(file);
      await blockchainService.storeMedicalRecord(
        'patient123',
        'diagnosis',
        hash
      );
      alert("Record stored!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <input 
        type="file"
        onChange={e => handleUpload(e.target.files[0])}
        disabled={loading}
      />
    </div>
  );
}
```

---

## Security Best Practices

1. **Never expose private keys** in code
2. **Always use .env** for sensitive data
3. **Validate all inputs** before blockchain calls
4. **Handle errors gracefully** with user feedback
5. **Encrypt sensitive data** before IPFS upload
6. **Verify contracts** on block explorer
7. **Use test networks** for development
8. **Implement access control** in smart contracts

---

## Performance Tips

1. **Batch queries** when possible
2. **Cache records** in component state
3. **Use pagination** for large datasets
4. **Lazy load** blockchain data
5. **Optimize IPFS** file sizes
6. **Implement retry logic** for failed calls

---

For more details, see [BLOCKCHAIN_INTEGRATION_GUIDE.md](./BLOCKCHAIN_INTEGRATION_GUIDE.md)
