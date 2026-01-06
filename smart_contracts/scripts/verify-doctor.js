import hre from "hardhat";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import process from "process";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Script to verify a doctor's registration
 * This would typically be called by a backend service after verifying license credentials
 */
async function main() {
  // Get the deployed contract address
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

  console.log("Connecting to MedicalRecords at:", contractAddress);

  // Get contract instance
  const MedicalRecords = await hre.ethers.getContractFactory("MedicalRecords");
  const medicalRecords = MedicalRecords.attach(contractAddress);

  // Get admin signer
  const [admin] = await hre.ethers.getSigners();
  console.log("Admin address:", admin.address);

  // Doctor address to verify (replace with actual address)
  const doctorAddress = process.env.DOCTOR_ADDRESS || "0x0000000000000000000000000000000000000000";

  if (doctorAddress === "0x0000000000000000000000000000000000000000") {
    console.error("Please provide DOCTOR_ADDRESS in environment variables");
    console.log("Usage: DOCTOR_ADDRESS=0x... npx hardhat run scripts/verify-doctor.js --network <network>");
    process.exit(1);
  }

  console.log("\nVerifying doctor:", doctorAddress);

  try {
    // Check if doctor is registered
    const doctorInfo = await medicalRecords.getDoctorInfo(doctorAddress);
    console.log("\nDoctor Information:");
    console.log("Name:", doctorInfo.name);
    console.log("License Number:", doctorInfo.licenseNumber);
    console.log("Already Verified:", doctorInfo.isVerified);
    console.log("Consultation Fee:", hre.ethers.formatEther(doctorInfo.consultationFee), "ETH");

    if (doctorInfo.isVerified) {
      console.log("\nDoctor is already verified!");
      return;
    }

    // Verify the doctor
    console.log("\nSubmitting verification transaction...");
    const tx = await medicalRecords.verifyDoctor(doctorAddress);
    console.log("Transaction hash:", tx.hash);

    console.log("Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log("Doctor verified successfully!");
    console.log("Block number:", receipt.blockNumber);
    console.log("Gas used:", receipt.gasUsed.toString());

    // Verify the update
    const updatedInfo = await medicalRecords.getDoctorInfo(doctorAddress);
    console.log("\nUpdated Status:");
    console.log("Is Verified:", updatedInfo.isVerified);

  } catch (error) {
    console.error("\nError verifying doctor:");
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
