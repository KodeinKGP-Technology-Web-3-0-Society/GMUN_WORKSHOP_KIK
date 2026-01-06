import hre from "hardhat";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import process from "process";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Example script to process payment for an appointment
 * This demonstrates how a patient pays for a completed appointment
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

  // Get patient signer
  const [, patient] = await hre.ethers.getSigners();
  console.log("Patient address:", patient.address);

  const patientBalance = await hre.ethers.provider.getBalance(patient.address);
  console.log("Patient balance:", hre.ethers.formatEther(patientBalance), "ETH\n");

  // Appointment ID (replace with actual appointment ID)
  const appointmentId = process.env.APPOINTMENT_ID || "1";
  console.log("Appointment ID:", appointmentId, "\n");

  try {
    // Get appointment details
    const appointment = await medicalRecords.connect(patient).getAppointmentDetails(appointmentId);
    console.log("Appointment Details:");
    console.log("Doctor:", appointment.doctorAddress);
    console.log("Patient:", appointment.patientAddress);
    console.log("Status:", appointment.status);
    console.log("Payment Amount:", hre.ethers.formatEther(appointment.paymentAmount), "ETH");
    console.log("Payment Completed:", appointment.paymentCompleted, "\n");

    if (appointment.paymentCompleted) {
      console.log("Payment already completed for this appointment!");
      return;
    }

    if (appointment.status !== "completed") {
      console.log("Appointment must be completed before payment!");
      console.log("Current status:", appointment.status);
      return;
    }

    // Process payment
    console.log("Processing payment of", hre.ethers.formatEther(appointment.paymentAmount), "ETH...");
    const tx = await medicalRecords.connect(patient).completePayment(
      appointmentId,
      { value: appointment.paymentAmount }
    );
    console.log("Transaction hash:", tx.hash);

    console.log("Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log("Payment processed successfully!");
    console.log("Gas used:", receipt.gasUsed.toString());

    // Verify payment
    const updatedAppointment = await medicalRecords.connect(patient).getAppointmentDetails(appointmentId);
    console.log("\nUpdated Appointment Status:");
    console.log("Payment Completed:", updatedAppointment.paymentCompleted);

    // Check doctor's earnings
    const doctorEarnings = await medicalRecords.doctorEarnings(appointment.doctorAddress);
    console.log("\nDoctor's Total Earnings:", hre.ethers.formatEther(doctorEarnings), "ETH");

    console.log("\nDoctor can now withdraw earnings using the withdrawEarnings() function");

  } catch (error) {
    console.error("\nError processing payment:");
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
