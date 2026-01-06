import React, { useState } from "react";
import RoleSelection from "./components/RoleSelection";

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

// Laboratory Components
import LabNavbar from "./components/laboratory/Navbar"; // Ensure you create this
import LabReportForm from "./components/laboratory/LabReportForm";
import FileUpload from "./components/laboratory/FileUpload";
import ReportCard from "./components/laboratory/ReportCard";
import DiagnosticHub from "./components/laboratory/DiagnosticHub";

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeTab, setActiveTab] = useState("appointments");

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    // Set default tab based on role
    if (role === "laboratory") {
        setActiveTab("upload");
    } else {
        setActiveTab("appointments");
    }
  };

  const renderComponent = () => {
    if (selectedRole === "patient") {
      switch (activeTab) {
        case "appointments": return <PatientAppointments />;
        case "prescriptions": return <PatientPrescriptions />;
        case "profile": return <PatientProfile />;
        default: return <PatientAppointments />;
      }
    } else if (selectedRole === "doctor") {
      switch (activeTab) {
        case "appointments": return <DoctorAppointments />;
        case "patients": return <DoctorPatients />;
        case "prescriptions": return <DoctorPrescriptions />;
        case "profile": return <DoctorProfile />;
        default: return <DoctorAppointments />;
      }
    } else if (selectedRole === "laboratory") {
      // Mapping to your imported Laboratory components
      switch (activeTab) {
        case "dashboard": 
          return <DiagnosticHub />; // Main overview [cite: 1]
        case "upload": 
          return <LabReportForm />; // Form to mint NFT reports [cite: 1]
        case "file-manager": 
          return <FileUpload />;   // Direct access to IPFS upload tool [cite: 1]
        case "reports": 
          return <ReportCard />;   // View individual report status [cite: 1]
        default: 
          return <DiagnosticHub />;
      }
    }
  };

  if (!selectedRole) {
    return <RoleSelection onSelectRole={handleSelectRole} />;
  }

  // Updated Navbar selection logic to include Laboratory
  const getNavbar = () => {
    if (selectedRole === "patient") return PatientNavbar;
    if (selectedRole === "doctor") return DoctorNavbar;
    if (selectedRole === "laboratory") return LabNavbar;
    return LabNavbar;
  };

  const NavbarComponent = getNavbar();

  // Added the missing return statement for the main UI
  // Inside your App.jsx return statement
return (
  <div className="min-h-screen bg-gray-50">
    <NavbarComponent activeTab={activeTab} setActiveTab={setActiveTab} />
    
    {/* Use mx-auto and max-w-7xl to center and bound the content */}
    <main className="max-w-7xl mx-auto py-10 px-6 animate-in fade-in duration-500">
      <div className="flex justify-center"> 
        {renderComponent()}
      </div>
    </main>
  </div>
 );
} // Added the missing closing brace for the App function

export default App;