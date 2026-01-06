// contracts/contracts/MedicalRecords.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    struct Record {
        string ipfsHash;    // The CID from IPFS
        string recordType;  // e.g., "Lab Report", "X-Ray"
        address doctor;     // Who uploaded/verified it
        uint256 timestamp;
    }

    // Mapping: Patient Address => List of Records
    mapping(address => Record[]) public patientRecords;

    event RecordAdded(address indexed patient, string ipfsHash, address doctor);

    // Function to link IPFS hash to Blockchain
    function addRecord(address _patient, string memory _ipfsHash, string memory _type) public {
        // In real app, add "onlyAuthorizedDoctor" modifier here
        patientRecords[_patient].push(Record({
            ipfsHash: _ipfsHash,
            recordType: _type,
            doctor: msg.sender,
            timestamp: block.timestamp
        }));

        emit RecordAdded(_patient, _ipfsHash, msg.sender);
    }
}