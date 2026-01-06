import hre from "hardhat";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import process from "process";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("Starting MedicalRecords deployment...\n");

  // Get deployer info
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Deploy MedicalRecords contract
  console.log("Deploying MedicalRecords contract...");
  const MedicalRecords = await hre.ethers.getContractFactory("MedicalRecords");
  const medicalRecords = await MedicalRecords.deploy();
  
  await medicalRecords.waitForDeployment();
  const contractAddress = await medicalRecords.getAddress();
  
  console.log("MedicalRecords deployed to:", contractAddress);
  console.log("Transaction hash:", medicalRecords.deploymentTransaction().hash);
  console.log("Admin address:", deployer.address, "\n");

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    adminAddress: deployer.address,
    deploymentTime: new Date().toISOString(),
    transactionHash: medicalRecords.deploymentTransaction().hash,
  };

  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save deployment info to file
  const deploymentFile = path.join(
    deploymentsDir,
    `${hre.network.name}-deployment.json`
  );
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("Deployment info saved to:", deploymentFile);

  // Copy ABI to frontend (if src directory exists)
  const frontendAbiDir = path.join(__dirname, "..", "..", "src", "abi");
  if (fs.existsSync(path.join(__dirname, "..", "..", "src"))) {
    if (!fs.existsSync(frontendAbiDir)) {
      fs.mkdirSync(frontendAbiDir, { recursive: true });
    }

    const artifactPath = path.join(
      __dirname,
      "..",
      "artifacts",
      "contracts",
      "MedicalRecords.sol",
      "MedicalRecords.json"
    );

    if (fs.existsSync(artifactPath)) {
      const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
      const abiFile = path.join(frontendAbiDir, "MedicalRecords.json");
      fs.writeFileSync(abiFile, JSON.stringify(artifact, null, 2));
      console.log("ABI copied to frontend:", abiFile);
    }
  }

  console.log("\n===========================================");
  console.log("Deployment Summary");
  console.log("===========================================");
  console.log("Network:", hre.network.name);
  console.log("Contract Address:", contractAddress);
  console.log("Admin Address:", deployer.address);
  console.log("===========================================\n");

  // Wait for block confirmations on testnets/mainnet
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await medicalRecords.deploymentTransaction().wait(6);
    console.log("6 block confirmations received\n");

    console.log("To verify the contract on Etherscan, run:");
    console.log(
      `npx hardhat verify --network ${hre.network.name} ${contractAddress}`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
