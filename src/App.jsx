import React, { useState } from "react";
import RoleSelection from "./components/RoleSelection";
import BlockchainConnect from "./components/BlockchainConnect";
import blockchainService from "./services/blockchainService";
import { BLOCKCHAIN_CONFIG } from "./config/blockchain";

// Patient Components
import PatientNavbar from "./components/patient/Navbar";
import PatientAppointments from "./components/patient/Appointments";
import PatientPrescriptions from "./components/patient/Prescriptions";
import PatientProfile from "./components/patient/Profile";

// Doctor Components
import DoctorNavbar from "./components/doctor/Navbar";
import DoctorAppointments from "./components/doctor/Appointments";
import DoctorPrescriptions from "./components/doctor/Prescriptions";
import DoctorProfile from "./components/doctor/Profile";
import DoctorPatients from "./components/doctor/Patients";

function App() {
  // 1. Track selected role (null for selection, "patient" or "doctor")
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeTab, setActiveTab] = useState("appointments");
  const [walletAddress, setWalletAddress] = useState(null);

  // 2. Handle role selection
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setActiveTab(role === "doctor" ? "appointments" : "appointments");
  };

  // Initialize blockchain service when wallet is connected
  const handleWalletConnect = async (address) => {
    setWalletAddress(address);
    try {
      if (BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS) {
        await blockchainService.initContract(BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS);
        console.log("Blockchain service initialized");
      }
    } catch (error) {
      console.error("Failed to initialize blockchain:", error);
    }
  };

  // 3. Render role selection if no role is selected
  if (!selectedRole) {
    return <RoleSelection onSelectRole={handleSelectRole} />;
  }

  // 4. Logic to determine which component to show based on role
  const renderComponent = () => {
    if (selectedRole === "patient") {
      switch (activeTab) {
        case "appointments":
          return <PatientAppointments />;
        case "prescriptions":
          return <PatientPrescriptions />;
        case "profile":
          return <PatientProfile />;
        default:
          return <PatientAppointments />;
      }
    } else if (selectedRole === "doctor") {
      switch (activeTab) {
        case "appointments":
          return <DoctorAppointments />;
        case "patients":
          return <DoctorPatients />;
        case "prescriptions":
          return <DoctorPrescriptions />;
        case "profile":
          return <DoctorProfile />;
        default:
          return <DoctorAppointments />;
      }
    }
  };

  // 5. Select appropriate Navbar based on role
  const NavbarComponent =
    selectedRole === "patient" ? PatientNavbar : DoctorNavbar;

  // 6. Function to handle logout/role change
  const handleLogout = () => {
    setSelectedRole(null);
    setActiveTab("appointments");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blockchain Connection Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Healthcare Portal</h1>
          <BlockchainConnect onConnected={handleWalletConnect} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Pass state and setter to Navbar */}
        {selectedRole && (
          <NavbarComponent activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {/* Display the selected component */}
        <main className="animate-in fade-in duration-500">
          {selectedRole ? (
            renderComponent()
          ) : (
            <RoleSelection onSelectRole={handleSelectRole} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;