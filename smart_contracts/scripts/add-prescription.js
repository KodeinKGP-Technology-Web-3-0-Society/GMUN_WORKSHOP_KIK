import hre from "hardhat";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import process from "process";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Example script to add a prescription after an appointment
 * This demonstrates how a doctor would add prescription with IPFS CID
 */
async function main() {
  const deploymentFile = path.join(
    __dirname,
    "..",
    "deployments",
    `${hre.network.name}-deployment.json`
  );

  if (!fs.existsSync(deploymentFile)) {
    console.error("Deployment file not found. Please deploy the contract first.");
    process.exit(1);
  }

  const deployment = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  const contractAddress = deployment.contractAddress;

  console.log("Connecting to MedicalRecords at:", contractAddress, "\n");

  const MedicalRecords = await hre.ethers.getContractFactory("MedicalRecords");
  const medicalRecords = MedicalRecords.attach(contractAddress);

  // Get doctor signer
  const [doctor] = await hre.ethers.getSigners();
  console.log("Doctor address:", doctor.address);

  // Appointment ID (replace with actual appointment ID)
  const appointmentId = process.env.APPOINTMENT_ID || "1";
  console.log("Appointment ID:", appointmentId, "\n");

  try {
    // Get appointment details
    const appointment = await medicalRecords.connect(doctor).getAppointmentDetails(appointmentId);
    console.log("Appointment Details:");
    console.log("Patient:", appointment.patientAddress);
    console.log("Status:", appointment.status);
    console.log("Date/Time:", new Date(Number(appointment.appointmentDateTime) * 1000).toLocaleString(), "\n");

    // Example prescription data
    const prescriptionData = {
      medicine: "Amoxicillin 500mg",
      dosage: "1 tablet, 3 times daily",
      instructions: "Take with food. Complete full course even if symptoms improve.",
      ipfsCID: "QmExampleCID123456789", // Replace with actual IPFS CID after uploading file
    };

    console.log("Prescription Details:");
    console.log("Medicine:", prescriptionData.medicine);
    console.log("Dosage:", prescriptionData.dosage);
    console.log("Instructions:", prescriptionData.instructions);
    console.log("IPFS CID:", prescriptionData.ipfsCID, "\n");

    // Add prescription
    console.log("Submitting prescription...");
    const tx = await medicalRecords.connect(doctor).addPrescription(
      appointmentId,
      prescriptionData.medicine,
      prescriptionData.dosage,
      prescriptionData.instructions,
      prescriptionData.ipfsCID
    );
    console.log("Transaction hash:", tx.hash);

    console.log("Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log("Prescription added successfully!");

    // Get prescription ID from event
    const event = receipt.logs.find(
      (log) => {
        try {
          const parsed = medicalRecords.interface.parseLog(log);
          return parsed && parsed.name === "PrescriptionAdded";
        } catch {
          return false;
        }
      }
    );

    if (event) {
      const parsedEvent = medicalRecords.interface.parseLog(event);
      const prescriptionId = parsedEvent.args[0];
      console.log("Prescription ID:", prescriptionId.toString());

      // Get prescription details
      const prescription = await medicalRecords.connect(doctor).getPrescriptionDetails(prescriptionId);
      console.log("\nPrescription Details:");
      console.log("ID:", prescription.prescriptionId.toString());
      console.log("Appointment ID:", prescription.appointmentId.toString());
      console.log("Doctor:", prescription.doctorAddress);
      console.log("Patient:", prescription.patientAddress);
      console.log("Medicine:", prescription.medicineName);
      console.log("Dosage:", prescription.dosage);
      console.log("Instructions:", prescription.instructions);
      console.log("IPFS CID:", prescription.ipfsCID);
      console.log("Created At:", new Date(Number(prescription.createdAt) * 1000).toLocaleString());
    }

    // Now complete the appointment
    console.log("\nMarking appointment as completed...");
    const completeTx = await medicalRecords.connect(doctor).completeAppointment(appointmentId);
    await completeTx.wait();
    console.log("Appointment marked as completed!");

  } catch (error) {
    console.error("\nError adding prescription:");
    console.error(error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
