import { ethers } from 'ethers';

// Smart Contract ABI for Medical Records
const MEDICAL_RECORDS_ABI = [
  "function storeMedicalRecord(string memory patientId, string memory recordType, string memory ipfsHash) public",
  "function getMedicalRecords(string memory patientId) public view returns (tuple(string recordType, string ipfsHash, uint256 timestamp)[])",
  "function storePrescription(string memory patientId, string memory doctorId, string memory medication, string memory dosage, uint256 duration) public",
  "function getPrescriptions(string memory patientId) public view returns (tuple(string doctorId, string medication, string dosage, uint256 duration, uint256 timestamp)[])",
  "function storeAppointment(string memory patientId, string memory doctorId, uint256 appointmentDate) public",
  "function getAppointments(string memory patientId) public view returns (tuple(string doctorId, uint256 appointmentDate, bool isCompleted)[])",
];

class BlockchainService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.isConnected = false;
  }

  // Connect to wallet (MetaMask)
  async connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.isConnected = true;

      return accounts[0];
    } catch (error) {
      console.error("Wallet connection failed:", error);
      throw error;
    }
  }

  // Initialize contract
  async initContract(contractAddress) {
    try {
      if (!this.signer) {
        await this.connectWallet();
      }

      this.contract = new ethers.Contract(
        contractAddress,
        MEDICAL_RECORDS_ABI,
        this.signer
      );

      return true;
    } catch (error) {
      console.error("Contract initialization failed:", error);
      throw error;
    }
  }

  // Store medical record on blockchain
  async storeMedicalRecord(patientId, recordType, ipfsHash) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const tx = await this.contract.storeMedicalRecord(
        patientId,
        recordType,
        ipfsHash
      );
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      console.error("Failed to store medical record:", error);
      throw error;
    }
  }

  // Retrieve medical records
  async getMedicalRecords(patientId) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const records = await this.contract.getMedicalRecords(patientId);
      return records;
    } catch (error) {
      console.error("Failed to retrieve medical records:", error);
      throw error;
    }
  }

  // Store prescription
  async storePrescription(patientId, doctorId, medication, dosage, duration) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const tx = await this.contract.storePrescription(
        patientId,
        doctorId,
        medication,
        dosage,
        duration
      );
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      console.error("Failed to store prescription:", error);
      throw error;
    }
  }

  // Get prescriptions
  async getPrescriptions(patientId) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const prescriptions = await this.contract.getPrescriptions(patientId);
      return prescriptions;
    } catch (error) {
      console.error("Failed to retrieve prescriptions:", error);
      throw error;
    }
  }

  // Store appointment
  async storeAppointment(patientId, doctorId, appointmentDate) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const tx = await this.contract.storeAppointment(
        patientId,
        doctorId,
        Math.floor(appointmentDate.getTime() / 1000)
      );
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error) {
      console.error("Failed to store appointment:", error);
      throw error;
    }
  }

  // Get appointments
  async getAppointments(patientId) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const appointments = await this.contract.getAppointments(patientId);
      return appointments;
    } catch (error) {
      console.error("Failed to retrieve appointments:", error);
      throw error;
    }
  }

  // Get network info
  async getNetworkInfo() {
    try {
      const network = await this.provider.getNetwork();
      const balance = await this.signer.getBalance();

      return {
        chainId: network.chainId,
        name: network.name,
        balance: ethers.formatEther(balance),
      };
    } catch (error) {
      console.error("Failed to get network info:", error);
      throw error;
    }
  }

  // Disconnect wallet
  disconnect() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.isConnected = false;
  }
}

export default new BlockchainService();
