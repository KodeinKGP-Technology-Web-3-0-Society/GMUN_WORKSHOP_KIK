import hre from "hardhat";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import process from "process";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Example script to book an appointment
 * This demonstrates how a patient would interact with the contract
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

  // Get signers (patient account)
  const [, patient] = await hre.ethers.getSigners();
  console.log("Patient address:", patient.address);

  // Doctor address (replace with actual verified doctor address)
  const doctorAddress = process.env.DOCTOR_ADDRESS || "";

  if (!doctorAddress) {
    console.error("Please provide DOCTOR_ADDRESS in environment variables");
    console.log("Usage: DOCTOR_ADDRESS=0x... npx hardhat run scripts/create-appointment.js --network <network>");
    process.exit(1);
  }

  console.log("Doctor address:", doctorAddress, "\n");

  try {
    // Get doctor info
    const doctorInfo = await medicalRecords.getDoctorInfo(doctorAddress);
    console.log("Doctor Information:");
    console.log("Name:", doctorInfo.name);
    console.log("Verified:", doctorInfo.isVerified);
    console.log("Consultation Fee:", hre.ethers.formatEther(doctorInfo.consultationFee), "ETH\n");

    if (!doctorInfo.isVerified) {
      console.error("Doctor is not verified!");
      process.exit(1);
    }

    // Set appointment time (1 day from now)
    const appointmentTime = Math.floor(Date.now() / 1000) + 86400;
    const appointmentDate = new Date(appointmentTime * 1000);
    console.log("Booking appointment for:", appointmentDate.toLocaleString(), "\n");

    // Book appointment
    console.log("Submitting appointment booking...");
    const tx = await medicalRecords.connect(patient).bookAppointment(
      doctorAddress,
      appointmentTime
    );
    console.log("Transaction hash:", tx.hash);

    console.log("Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log("Appointment booked successfully!");

    // Get appointment ID from event
    const event = receipt.logs.find(
      (log) => {
        try {
          const parsed = medicalRecords.interface.parseLog(log);
          return parsed && parsed.name === "AppointmentScheduled";
        } catch {
          return false;
        }
      }
    );

    if (event) {
      const parsedEvent = medicalRecords.interface.parseLog(event);
      const appointmentId = parsedEvent.args[0];
      console.log("Appointment ID:", appointmentId.toString());

      // Get appointment details
      const appointment = await medicalRecords.connect(patient).getAppointmentDetails(appointmentId);
      console.log("\nAppointment Details:");
      console.log("ID:", appointment.appointmentId.toString());
      console.log("Doctor:", appointment.doctorAddress);
      console.log("Patient:", appointment.patientAddress);
      console.log("Date/Time:", new Date(Number(appointment.appointmentDateTime) * 1000).toLocaleString());
      console.log("Status:", appointment.status);
      console.log("Payment Amount:", hre.ethers.formatEther(appointment.paymentAmount), "ETH");
      console.log("Payment Completed:", appointment.paymentCompleted);
    }

  } catch (error) {
    console.error("\nError booking appointment:");
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
