# Medical Records dApp - Smart Contract Implementation Plan

This comprehensive plan outlines the smart contract architecture for a decentralized medical records dApp using Hardhat, featuring doctor-patient interactions, appointment scheduling, prescription management, and secure payment processing.

---

## Phase 1: Smart Contract Structure & Data Models

### 1.1 Core Contract: MedicalRecords.sol

This is the main contract that handles all interactions between doctors and patients.

#### Data Structures (Structs)

```solidity
struct Doctor {
  address walletAddress;
  string name;
  string licenseNumber;
  bool isVerified;
  uint consultationFee;  // Fee in wei
  uint registeredAt;
}

struct Patient {
  address walletAddress;
  string name;
  uint dateOfBirth;
  uint registeredAt;
}

struct Appointment {
  uint appointmentId;
  address doctorAddress;
  address patientAddress;
  uint appointmentDateTime;  // Unix timestamp
  string status;  // "scheduled", "completed", "cancelled"
  string ipfsCID;  // Prescription file CID (if generated)
  uint paymentAmount;  // Fee in wei
  bool paymentCompleted;
  uint createdAt;
}

struct Prescription {
  uint prescriptionId;
  uint appointmentId;  // Link to appointment
  address doctorAddress;
  address patientAddress;
  string medicineName;
  string dosage;
  string instructions;
  string ipfsCID;  // Link to file on IPFS
  uint createdAt;
}
```

#### Mappings

```solidity
mapping(address => Doctor) doctors;
mapping(address => Patient) patients;
mapping(uint => Appointment) appointments;
mapping(uint => Prescription) prescriptions;
mapping(address => uint[]) doctorAppointments;  // Track doctor's appointments
mapping(address => uint[]) patientAppointments;  // Track patient's appointments
mapping(address => mapping(address => bool)) accessGrants;  // Doctor grants patient access
```

### 1.2 Key Contract Functions

#### Doctor Functions
- `registerDoctor(string memory _name, string memory _licenseNumber, uint _consultationFee)` - Register as doctor
- `setConsultationFee(uint _fee)` - Update consultation fee
- `scheduleAppointment(address _patientAddress, uint _dateTime)` - Create appointment slot
- `addPrescription(uint _appointmentId, string memory _medicine, string memory _dosage, string memory _instructions, string memory _ipfsCID)` - Add prescription after appointment
- `completeAppointment(uint _appointmentId)` - Mark appointment as completed
- `grantPatientAccess(address _patientAddress)` - Allow patient to view records
- `revokePatientAccess(address _patientAddress)` - Revoke access
- `withdrawEarnings()` - Doctor withdraws payment from contract

#### Patient Functions
- `registerPatient(string memory _name, uint _dob)` - Register as patient
- `bookAppointment(address _doctorAddress, uint _dateTime)` - Book appointment with doctor
- `completePayment(uint _appointmentId)` payable - Pay doctor for appointment
- `viewPrescriptions()` - Fetch all their prescriptions
- `viewAppointmentHistory()` - Fetch all appointments

#### Public Functions
- `verifyDoctor(address _doctorAddress)` - Backend calls this to verify doctor (access controlled)
- `getDoctorInfo(address _doctorAddress)` - Get doctor details
- `getPatientInfo(address _patientAddress)` - Get patient details (with access check)
- `getAppointmentDetails(uint _appointmentId)` - Get appointment info

### 1.3 Events

```solidity
event DoctorRegistered(address indexed doctorAddress, string name);
event DoctorVerified(address indexed doctorAddress);
event PatientRegistered(address indexed patientAddress, string name);
event AppointmentScheduled(uint indexed appointmentId, address indexed doctor, address indexed patient, uint dateTime);
event AppointmentCompleted(uint indexed appointmentId, uint paymentAmount);
event PaymentReceived(uint indexed appointmentId, address indexed from, uint amount);
event PrescriptionAdded(uint indexed prescriptionId, uint indexed appointmentId, address indexed doctor);
event AccessGranted(address indexed doctor, address indexed patient);
event AccessRevoked(address indexed doctor, address indexed patient);
event PaymentWithdrawn(address indexed doctor, uint amount);
```

---

## Phase 2: Appointment & Payment Flow

### 2.1 Complete Appointment Workflow

```
1. Doctor Registers & Gets Verified
   ├─ Doctor calls registerDoctor() with name, license, fee
   ├─ Backend verifies license number
   └─ Backend calls verifyDoctor() on contract

2. Patient Registers
   └─ Patient calls registerPatient() with name, DOB

3. Patient Books Appointment
   ├─ Patient calls bookAppointment(doctorAddress, timestamp)
   ├─ Contract stores appointment with status="scheduled"
   └─ Contract stores paymentAmount = doctor's fee

4. Doctor Completes Appointment & Adds Prescription
   ├─ After consultation, doctor calls addPrescription()
   ├─ Doctor uploads file to IPFS, gets CID
   ├─ Doctor calls addPrescription(appointmentId, medicine, dosage, instructions, ipfsCID)
   └─ Contract links prescription to appointment

5. Doctor Marks Appointment Complete
   └─ Doctor calls completeAppointment(appointmentId)
       └─ Status changes to "completed"

6. Patient Pays Doctor
   ├─ Patient calls completePayment(appointmentId) { value: appointmentFee }
   ├─ Contract receives payment
   ├─ paymentCompleted = true
   └─ Event emitted: PaymentReceived

7. Doctor Withdraws Payment
   └─ Doctor calls withdrawEarnings()
       └─ Transfers all accumulated payments to doctor's wallet
```

### 2.2 Payment Handling

**Contract Responsibilities:**
- Hold payment from patient (escrow)
- Track which doctor earned how much
- Allow doctor to withdraw earnings
- Prevent double-payment for same appointment

**Smart Contract Code Logic:**
```solidity
function completePayment(uint _appointmentId) payable external {
    Appointment storage appt = appointments[_appointmentId];
    require(appt.patientAddress == msg.sender, "Only patient can pay");
    require(msg.value == appt.paymentAmount, "Incorrect payment amount");
    require(!appt.paymentCompleted, "Payment already made");
    
    appt.paymentCompleted = true;
    
    // Store balance for doctor to withdraw later
    doctorEarnings[appt.doctorAddress] += msg.value;
    
    emit PaymentReceived(_appointmentId, msg.sender, msg.value);
}

function withdrawEarnings() external {
    uint earnings = doctorEarnings[msg.sender];
    require(earnings > 0, "No earnings to withdraw");
    
    doctorEarnings[msg.sender] = 0;  // Prevent reentrancy
    
    (bool success, ) = msg.sender.call{value: earnings}("");
    require(success, "Withdrawal failed");
    
    emit PaymentWithdrawn(msg.sender, earnings);
}
```

---

## Phase 3: Contract Files Structure

### Directory Layout

```
smart_contracts/
├── contracts/
│   ├── MedicalRecords.sol          # Main contract (all functionality)
│   ├── interfaces/
│   │   └── IMedicalRecords.sol     # Interface definition
│   └── utils/
│       ├── ReentrancyGuard.sol     # Security for payments
│       └── AccessControl.sol       # Role management
├── test/
│   ├── medicalRecords.test.js      # Unit tests
│   ├── appointments.test.js        # Appointment flow tests
│   ├── payments.test.js            # Payment & withdrawal tests
│   └── prescriptions.test.js       # Prescription tests
├── scripts/
│   ├── deploy.js                   # Deploy contract & save ABIs
│   ├── verify-doctor.js            # Backend verification script
│   ├── create-appointment.js       # Example: Create appointment
│   ├── add-prescription.js         # Example: Add prescription
│   └── process-payment.js          # Example: Process payment
├── ignition/
│   └── deploy-config.js            # Hardhat Ignition config
├── hardhat.config.js               # Hardhat configuration
├── .env.example                    # Environment variables template
└── README.md                        # This file
```

---

## Phase 4: Frontend Integration

### 4.1 ABI & Contract Setup

**After compilation:**
```bash
# ABIs are generated in artifacts/
artifacts/contracts/MedicalRecords.sol/MedicalRecords.json

# Copy to frontend
mkdir -p ../src/abi
cp artifacts/contracts/MedicalRecords.sol/MedicalRecords.json ../src/abi/
```

### 4.2 Frontend Services Structure

```
src/
├── services/
│   ├── contractService.js        # Connect to contract, call functions
│   ├── web3Service.js            # Wallet connection, account management
│   ├── ipfsService.js            # Upload files to IPFS, get CID
│   └── appointmentService.js     # Appointment-specific logic
├── abi/
│   └── MedicalRecords.json       # Contract ABI (copied from artifacts)
├── components/
│   ├── doctor/
│   │   ├── Register.jsx          # Doctor registration
│   │   ├── SetFee.jsx            # Set consultation fee
│   │   ├── ManageAppointments.jsx # View & manage appointments
│   │   ├── AddPrescription.jsx   # Add prescription with IPFS
│   │   ├── CompleteAppointment.jsx # Mark as completed
│   │   └── WithdrawEarnings.jsx  # Withdraw payments
│   └── patient/
│       ├── Register.jsx          # Patient registration
│       ├── BookAppointment.jsx   # Search & book appointment
│       ├── ViewAppointments.jsx  # Show upcoming & past
│       ├── PayDoctor.jsx         # Pay for appointment
│       └── ViewPrescriptions.jsx # Fetch & display prescriptions
```

### 4.3 Complete Appointment Flow (Frontend)

```javascript
// 1. Doctor registers
const registerAsDoctor = async (name, licenseNumber, fee) => {
  const tx = await contract.registerDoctor(name, licenseNumber, ethers.parseEther(fee));
  await tx.wait();
};

// 2. Patient books appointment
const bookAppointment = async (doctorAddress, dateTime) => {
  const tx = await contract.bookAppointment(doctorAddress, dateTime);
  await tx.wait();
};

// 3. Doctor adds prescription
const addPrescription = async (appointmentId, medicine, dosage, instructions, ipfsCID) => {
  const tx = await contract.addPrescription(
    appointmentId, medicine, dosage, instructions, ipfsCID
  );
  await tx.wait();
};

// 4. Doctor completes appointment
const completeAppointment = async (appointmentId) => {
  const tx = await contract.completeAppointment(appointmentId);
  await tx.wait();
};

// 5. Patient pays doctor
const payForAppointment = async (appointmentId, amount) => {
  const tx = await contract.completePayment(appointmentId, {
    value: ethers.parseEther(amount)
  });
  await tx.wait();
};

// 6. Doctor withdraws payment
const withdrawPayments = async () => {
  const tx = await contract.withdrawEarnings();
  await tx.wait();
};
```

---

## Phase 5: Testing Strategy

### 5.1 Unit Tests (test/medicalRecords.test.js)

```javascript
describe("Doctor Functions", () => {
  it("Should register doctor", async () => { /* ... */ });
  it("Should verify doctor by admin", async () => { /* ... */ });
  it("Should update consultation fee", async () => { /* ... */ });
});

describe("Patient Functions", () => {
  it("Should register patient", async () => { /* ... */ });
});

describe("Appointment Flow", () => {
  it("Should create appointment", async () => { /* ... */ });
  it("Should mark appointment completed", async () => { /* ... */ });
});

describe("Prescription Functions", () => {
  it("Should add prescription with IPFS CID", async () => { /* ... */ });
  it("Should link prescription to appointment", async () => { /* ... */ });
});

describe("Payment Functions", () => {
  it("Should process payment from patient", async () => { /* ... */ });
  it("Should track doctor earnings", async () => { /* ... */ });
  it("Should allow doctor to withdraw", async () => { /* ... */ });
  it("Should prevent double payment", async () => { /* ... */ });
});
```

---

## Phase 6: Data Storage Summary

| Data | Storage Location | Why | Access |
|------|------------------|-----|--------|
| Doctor name, license, fee | Smart Contract | Immutable, verifiable | Public |
| Doctor verification status | Smart Contract | Proof of legitimacy | Public |
| Patient name, DOB | Smart Contract | Medical record | Only verified doctors + patient |
| Appointment details (date, status, fee) | Smart Contract | Immutable record | Doctor & patient |
| Prescription metadata (medicine, dosage) | Smart Contract | Linked to appointment | Doctor & patient |
| Prescription file (PDF, image) | IPFS | Decentralized, not on-chain | Via CID link |
| Prescription file CID | Smart Contract | Link to file | In appointment struct |
| Doctor earnings | Smart Contract (mapping) | Track payments owed | Doctor's wallet |
| Appointment payment | Smart Contract (escrow) | Hold funds until withdrawal | Contract |
| Doctor license verification | Backend Database | Off-chain verification | Backend only |

---

## Phase 7: Deployment & Execution

### 7.1 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Compile contracts
npx hardhat compile

# 3. Run tests
npx hardhat test

# 4. Start local node
npx hardhat node

# 5. Deploy to localhost (in another terminal)
npx hardhat run scripts/deploy.js --network localhost
```

### 7.2 Testnet Deployment (Sepolia)

```bash
# 1. Update .env with SEPOLIA_RPC_URL and PRIVATE_KEY
# 2. Deploy
npx hardhat run scripts/deploy.js --network sepolia

# 3. Verify on Etherscan
npx hardhat verify --network sepolia CONTRACT_ADDRESS "Constructor Args"
```

### 7.3 Production Deployment (Polygon)

```bash
# Similar to Sepolia, but use Polygon network
npx hardhat run scripts/deploy.js --network polygon
```

---

## Key Security Considerations

1. **Reentrancy Guard**: Use for payment withdrawal functions
2. **Access Control**: Verify doctor status before allowing prescription additions
3. **Payment Validation**: Ensure correct amount before marking paid
4. **Escrow Pattern**: Hold funds in contract until doctor withdrawal (safer than direct transfer)
5. **Event Logging**: Emit events for all critical actions (auditing)
6. **Input Validation**: Check addresses, amounts, timestamps

---

## Configuration Files

### hardhat.config.js
- Network configurations (hardhat, localhost, sepolia, polygon)
- Solidity compiler version (0.8.20)
- Gas reporter settings
- Etherscan API keys

### .env (Keep Private)
```
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-key
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/your-key
ETHERSCAN_API_KEY=your_etherscan_key
```

---

## Next Steps

1. ✅ Finalize contract logic based on this plan
2. ⬜ Write MedicalRecords.sol with all functions
3. ⬜ Write comprehensive tests
4. ⬜ Deploy to Sepolia testnet
5. ⬜ Build frontend components
6. ⬜ Integrate IPFS for prescription files
7. ⬜ Test complete user flows (end-to-end)
8. ⬜ Security audit before mainnet

---

## Summary: What Makes This Unique

✅ **Appointments**: Doctor-patient scheduling with timestamps  
✅ **Prescriptions**: Linked to specific appointments, stored with IPFS CIDs  
✅ **Payments**: Patient pays doctor after appointment completion  
✅ **Secure Payments**: Escrow pattern prevents fund loss  
✅ **Doctor Earnings**: Track per-doctor earnings and allow withdrawals  
✅ **Role Management**: On-chain doctor verification via backend  
✅ **Privacy**: Access control for viewing patient records  
✅ **Decentralization**: Files on IPFS, logic on blockchain