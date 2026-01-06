// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./utils/ReentrancyGuard.sol";

/**
 * @title MedicalRecords
 * @dev Main contract for decentralized medical records management
 * Handles doctor-patient interactions, appointments, prescriptions, and payments
 */
contract MedicalRecords is ReentrancyGuard {
    
    // ==================== Structs ====================
    
    struct Doctor {
        address walletAddress;
        string name;
        string licenseNumber;
        bool isVerified;
        uint256 consultationFee;
        uint256 registeredAt;
    }
    
    struct Patient {
        address walletAddress;
        string name;
        uint256 dateOfBirth;
        uint256 registeredAt;
    }
    
    struct Appointment {
        uint256 appointmentId;
        address doctorAddress;
        address patientAddress;
        uint256 appointmentDateTime;
        string status; // "scheduled", "completed", "cancelled"
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
    
    // ==================== State Variables ====================
    
    mapping(address => Doctor) public doctors;
    mapping(address => Patient) public patients;
    mapping(uint256 => Appointment) public appointments;
    mapping(uint256 => Prescription) public prescriptions;
    mapping(address => uint256[]) public doctorAppointments;
    mapping(address => uint256[]) public patientAppointments;
    mapping(address => mapping(address => bool)) public accessGrants;
    mapping(address => uint256) public doctorEarnings;
    
    uint256 public appointmentCounter;
    uint256 public prescriptionCounter;
    
    address public admin;
    
    // ==================== Events ====================
    
    event DoctorRegistered(address indexed doctorAddress, string name);
    event DoctorVerified(address indexed doctorAddress);
    event PatientRegistered(address indexed patientAddress, string name);
    event AppointmentScheduled(uint256 indexed appointmentId, address indexed doctor, address indexed patient, uint256 dateTime);
    event AppointmentCompleted(uint256 indexed appointmentId, uint256 paymentAmount);
    event AppointmentCancelled(uint256 indexed appointmentId);
    event PaymentReceived(uint256 indexed appointmentId, address indexed from, uint256 amount);
    event PrescriptionAdded(uint256 indexed prescriptionId, uint256 indexed appointmentId, address indexed doctor);
    event AccessGranted(address indexed doctor, address indexed patient);
    event AccessRevoked(address indexed doctor, address indexed patient);
    event PaymentWithdrawn(address indexed doctor, uint256 amount);
    event ConsultationFeeUpdated(address indexed doctor, uint256 newFee);
    
    // ==================== Modifiers ====================
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyVerifiedDoctor() {
        require(doctors[msg.sender].isVerified, "Only verified doctors can call this function");
        _;
    }
    
    modifier onlyRegisteredPatient() {
        require(patients[msg.sender].registeredAt > 0, "Only registered patients can call this function");
        _;
    }
    
    // ==================== Constructor ====================
    
    constructor() {
        admin = msg.sender;
        appointmentCounter = 0;
        prescriptionCounter = 0;
    }
    
    // ==================== Doctor Functions ====================
    
    /**
     * @dev Register as a doctor
     * @param _name Doctor's name
     * @param _licenseNumber Medical license number
     * @param _consultationFee Consultation fee in wei
     */
    function registerDoctor(
        string memory _name,
        string memory _licenseNumber,
        uint256 _consultationFee
    ) external {
        require(doctors[msg.sender].registeredAt == 0, "Doctor already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_licenseNumber).length > 0, "License number cannot be empty");
        
        doctors[msg.sender] = Doctor({
            walletAddress: msg.sender,
            name: _name,
            licenseNumber: _licenseNumber,
            isVerified: false,
            consultationFee: _consultationFee,
            registeredAt: block.timestamp
        });
        
        emit DoctorRegistered(msg.sender, _name);
    }
    
    /**
     * @dev Update consultation fee
     * @param _fee New consultation fee in wei
     */
    function setConsultationFee(uint256 _fee) external onlyVerifiedDoctor {
        doctors[msg.sender].consultationFee = _fee;
        emit ConsultationFeeUpdated(msg.sender, _fee);
    }
    
    /**
     * @dev Add a prescription for a patient
     * @param _appointmentId ID of the appointment
     * @param _medicine Medicine name
     * @param _dosage Dosage information
     * @param _instructions Usage instructions
     * @param _ipfsCID IPFS CID of the prescription file
     */
    function addPrescription(
        uint256 _appointmentId,
        string memory _medicine,
        string memory _dosage,
        string memory _instructions,
        string memory _ipfsCID
    ) external onlyVerifiedDoctor {
        Appointment storage appt = appointments[_appointmentId];
        require(appt.doctorAddress == msg.sender, "You are not the doctor for this appointment");
        require(bytes(appt.status).length > 0, "Appointment does not exist");
        
        prescriptionCounter++;
        
        prescriptions[prescriptionCounter] = Prescription({
            prescriptionId: prescriptionCounter,
            appointmentId: _appointmentId,
            doctorAddress: msg.sender,
            patientAddress: appt.patientAddress,
            medicineName: _medicine,
            dosage: _dosage,
            instructions: _instructions,
            ipfsCID: _ipfsCID,
            createdAt: block.timestamp
        });
        
        // Update appointment with prescription CID
        appt.ipfsCID = _ipfsCID;
        
        emit PrescriptionAdded(prescriptionCounter, _appointmentId, msg.sender);
    }
    
    /**
     * @dev Mark an appointment as completed
     * @param _appointmentId ID of the appointment
     */
    function completeAppointment(uint256 _appointmentId) external onlyVerifiedDoctor {
        Appointment storage appt = appointments[_appointmentId];
        require(appt.doctorAddress == msg.sender, "You are not the doctor for this appointment");
        require(keccak256(bytes(appt.status)) == keccak256(bytes("scheduled")), "Appointment is not scheduled");
        
        appt.status = "completed";
        
        emit AppointmentCompleted(_appointmentId, appt.paymentAmount);
    }
    
    /**
     * @dev Grant a patient access to view records
     * @param _patientAddress Address of the patient
     */
    function grantPatientAccess(address _patientAddress) external onlyVerifiedDoctor {
        require(patients[_patientAddress].registeredAt > 0, "Patient not registered");
        accessGrants[msg.sender][_patientAddress] = true;
        emit AccessGranted(msg.sender, _patientAddress);
    }
    
    /**
     * @dev Revoke patient access
     * @param _patientAddress Address of the patient
     */
    function revokePatientAccess(address _patientAddress) external onlyVerifiedDoctor {
        accessGrants[msg.sender][_patientAddress] = false;
        emit AccessRevoked(msg.sender, _patientAddress);
    }
    
    /**
     * @dev Withdraw accumulated earnings
     */
    function withdrawEarnings() external onlyVerifiedDoctor nonReentrant {
        uint256 earnings = doctorEarnings[msg.sender];
        require(earnings > 0, "No earnings to withdraw");
        
        doctorEarnings[msg.sender] = 0;
        
        (bool success, ) = msg.sender.call{value: earnings}("");
        require(success, "Withdrawal failed");
        
        emit PaymentWithdrawn(msg.sender, earnings);
    }
    
    // ==================== Patient Functions ====================
    
    /**
     * @dev Register as a patient
     * @param _name Patient's name
     * @param _dob Date of birth (unix timestamp)
     */
    function registerPatient(string memory _name, uint256 _dob) external {
        require(patients[msg.sender].registeredAt == 0, "Patient already registered");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_dob > 0, "Date of birth is required");
        
        patients[msg.sender] = Patient({
            walletAddress: msg.sender,
            name: _name,
            dateOfBirth: _dob,
            registeredAt: block.timestamp
        });
        
        emit PatientRegistered(msg.sender, _name);
    }
    
    /**
     * @dev Book an appointment with a doctor
     * @param _doctorAddress Address of the doctor
     * @param _dateTime Appointment date and time (unix timestamp)
     */
    function bookAppointment(address _doctorAddress, uint256 _dateTime) external onlyRegisteredPatient {
        require(doctors[_doctorAddress].isVerified, "Doctor is not verified");
        require(_dateTime > block.timestamp, "Appointment time must be in the future");
        
        appointmentCounter++;
        
        appointments[appointmentCounter] = Appointment({
            appointmentId: appointmentCounter,
            doctorAddress: _doctorAddress,
            patientAddress: msg.sender,
            appointmentDateTime: _dateTime,
            status: "scheduled",
            ipfsCID: "",
            paymentAmount: doctors[_doctorAddress].consultationFee,
            paymentCompleted: false,
            createdAt: block.timestamp
        });
        
        doctorAppointments[_doctorAddress].push(appointmentCounter);
        patientAppointments[msg.sender].push(appointmentCounter);
        
        emit AppointmentScheduled(appointmentCounter, _doctorAddress, msg.sender, _dateTime);
    }
    
    /**
     * @dev Pay for an appointment
     * @param _appointmentId ID of the appointment
     */
    function completePayment(uint256 _appointmentId) external payable onlyRegisteredPatient nonReentrant {
        Appointment storage appt = appointments[_appointmentId];
        require(appt.patientAddress == msg.sender, "Only patient can pay for this appointment");
        require(msg.value == appt.paymentAmount, "Incorrect payment amount");
        require(!appt.paymentCompleted, "Payment already completed");
        require(keccak256(bytes(appt.status)) == keccak256(bytes("completed")), "Appointment must be completed first");
        
        appt.paymentCompleted = true;
        doctorEarnings[appt.doctorAddress] += msg.value;
        
        emit PaymentReceived(_appointmentId, msg.sender, msg.value);
    }
    
    /**
     * @dev Cancel an appointment
     * @param _appointmentId ID of the appointment
     */
    function cancelAppointment(uint256 _appointmentId) external onlyRegisteredPatient {
        Appointment storage appt = appointments[_appointmentId];
        require(appt.patientAddress == msg.sender, "Only patient can cancel this appointment");
        require(keccak256(bytes(appt.status)) == keccak256(bytes("scheduled")), "Can only cancel scheduled appointments");
        
        appt.status = "cancelled";
        
        emit AppointmentCancelled(_appointmentId);
    }
    
    /**
     * @dev Get all prescriptions for the caller (patient)
     * @return Array of prescription IDs
     */
    function viewPrescriptions() external view onlyRegisteredPatient returns (uint256[] memory) {
        uint256 count = 0;
        
        // Count prescriptions for this patient
        for (uint256 i = 1; i <= prescriptionCounter; i++) {
            if (prescriptions[i].patientAddress == msg.sender) {
                count++;
            }
        }
        
        // Create array and populate
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        
        for (uint256 i = 1; i <= prescriptionCounter; i++) {
            if (prescriptions[i].patientAddress == msg.sender) {
                result[index] = i;
                index++;
            }
        }
        
        return result;
    }
    
    /**
     * @dev Get appointment history for the caller
     * @return Array of appointment IDs
     */
    function viewAppointmentHistory() external view onlyRegisteredPatient returns (uint256[] memory) {
        return patientAppointments[msg.sender];
    }
    
    // ==================== Admin Functions ====================
    
    /**
     * @dev Verify a doctor (admin only)
     * @param _doctorAddress Address of the doctor to verify
     */
    function verifyDoctor(address _doctorAddress) external onlyAdmin {
        require(doctors[_doctorAddress].registeredAt > 0, "Doctor not registered");
        doctors[_doctorAddress].isVerified = true;
        emit DoctorVerified(_doctorAddress);
    }
    
    // ==================== Public View Functions ====================
    
    /**
     * @dev Get doctor information
     * @param _doctorAddress Address of the doctor
     * @return Doctor struct
     */
    function getDoctorInfo(address _doctorAddress) external view returns (Doctor memory) {
        require(doctors[_doctorAddress].registeredAt > 0, "Doctor not registered");
        return doctors[_doctorAddress];
    }
    
    /**
     * @dev Get patient information (with access control)
     * @param _patientAddress Address of the patient
     * @return Patient struct
     */
    function getPatientInfo(address _patientAddress) external view returns (Patient memory) {
        require(patients[_patientAddress].registeredAt > 0, "Patient not registered");
        require(
            msg.sender == _patientAddress || 
            (doctors[msg.sender].isVerified && accessGrants[msg.sender][_patientAddress]),
            "Access denied"
        );
        return patients[_patientAddress];
    }
    
    /**
     * @dev Get appointment details
     * @param _appointmentId ID of the appointment
     * @return Appointment struct
     */
    function getAppointmentDetails(uint256 _appointmentId) external view returns (Appointment memory) {
        Appointment memory appt = appointments[_appointmentId];
        require(appt.createdAt > 0, "Appointment does not exist");
        require(
            msg.sender == appt.doctorAddress || msg.sender == appt.patientAddress,
            "Access denied"
        );
        return appt;
    }
    
    /**
     * @dev Get prescription details
     * @param _prescriptionId ID of the prescription
     * @return Prescription struct
     */
    function getPrescriptionDetails(uint256 _prescriptionId) external view returns (Prescription memory) {
        Prescription memory pres = prescriptions[_prescriptionId];
        require(pres.createdAt > 0, "Prescription does not exist");
        require(
            msg.sender == pres.doctorAddress || msg.sender == pres.patientAddress,
            "Access denied"
        );
        return pres;
    }
    
    /**
     * @dev Get all appointments for a doctor
     * @param _doctorAddress Address of the doctor
     * @return Array of appointment IDs
     */
    function getDoctorAppointments(address _doctorAddress) external view returns (uint256[] memory) {
        require(msg.sender == _doctorAddress || msg.sender == admin, "Access denied");
        return doctorAppointments[_doctorAddress];
    }
    
    /**
     * @dev Check if doctor has granted access to patient
     * @param _doctorAddress Address of the doctor
     * @param _patientAddress Address of the patient
     * @return Boolean indicating access status
     */
    function hasAccess(address _doctorAddress, address _patientAddress) external view returns (bool) {
        return accessGrants[_doctorAddress][_patientAddress];
    }
}
