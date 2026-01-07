// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IMedicalRecords
 * @dev Interface for MedicalRecords contract
 */
interface IMedicalRecords {
    
    // ==================== Enums ====================
    
    enum AppointmentStatus { None, Scheduled, Completed, Cancelled }
    
    // ==================== Structs ====================
    
    struct Doctor {
        string name;
        string licenseNumber;
        bool isVerified;
        uint256 consultationFee;
        uint256 registeredAt;
    }
    
    struct Patient {
        string name;
        uint256 dateOfBirth;
        uint256 registeredAt;
    }
    
    struct Appointment {
        uint256 appointmentId;
        address doctorAddress;
        address patientAddress;
        uint256 appointmentDateTime;
        AppointmentStatus status;
        string ipfsCID;
        uint256 paymentAmount;
        bool paymentCompleted;
        uint256 createdAt;
    }
    
    struct Prescription {
        uint256 prescriptionId;
        uint256 appointmentId;
        address doctorAddress;
        address patientAddress;
        string medicineName;
        string dosage;
        string instructions;
        string ipfsCID;
        uint256 createdAt;
    }
    
    // Events
    event DoctorRegistered(address indexed doctorAddress, string name);
    event DoctorVerified(address indexed doctorAddress);
    event PatientRegistered(address indexed patientAddress, string name);
    event AppointmentScheduled(uint256 indexed appointmentId, address indexed doctor, address indexed patient, uint256 dateTime);
    event AppointmentCompleted(uint256 indexed appointmentId, uint256 paymentAmount);
    event PaymentReceived(uint256 indexed appointmentId, address indexed from, uint256 amount);
    event PrescriptionAdded(uint256 indexed prescriptionId, uint256 indexed appointmentId, address indexed doctor);
    event AccessGranted(address indexed doctor, address indexed patient);
    event AccessRevoked(address indexed doctor, address indexed patient);
    event PaymentWithdrawn(address indexed doctor, uint256 amount);
    
    // Doctor Functions
    function registerDoctor(string memory _name, string memory _licenseNumber, uint256 _consultationFee) external;
    function setConsultationFee(uint256 _fee) external;
    function addPrescription(uint256 _appointmentId, string memory _medicine, string memory _dosage, string memory _instructions, string memory _ipfsCID) external;
    function completeAppointment(uint256 _appointmentId) external;
    function grantPatientAccess(address _doctorAddress) external;
    function revokePatientAccess(address _doctorAddress) external;
    function withdrawEarnings() external;
    
    // Patient Functions
    function registerPatient(string memory _name, uint256 _dob) external;
    function bookAppointment(address _doctorAddress, uint256 _dateTime) external;
    function completePayment(uint256 _appointmentId) external payable;
    function viewPrescriptions() external view returns (uint256[] memory);
    function viewAppointmentHistory() external view returns (uint256[] memory);
    
    // Admin Functions
    function verifyDoctor(address _doctorAddress) external;
    
    // View Functions
    function getDoctorInfo(address _doctorAddress) external view returns (Doctor memory);
    function getPatientInfo(address _patientAddress) external view returns (Patient memory);
    function getAppointmentDetails(uint256 _appointmentId) external view returns (Appointment memory);
    function getPrescriptionDetails(uint256 _prescriptionId) external view returns (Prescription memory);
}
