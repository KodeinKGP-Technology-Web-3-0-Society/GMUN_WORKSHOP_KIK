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

function App() {
  // 1. Track selected role (null for selection, "patient" or "doctor")
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeTab, setActiveTab] = useState("appointments");

  // 2. Handle role selection
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setActiveTab(role === "doctor" ? "appointments" : "appointments");
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
      {/* Pass state and setter to Navbar */}
      <NavbarComponent activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Display the selected component */}
      <main className="animate-in fade-in duration-500">
        {renderComponent()}
      </main>
    </div>
  );
}

export default App;