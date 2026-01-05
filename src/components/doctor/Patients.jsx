import { useState } from "react";
import { Users, Mail, Phone, Calendar, FileText, Search } from "lucide-react";

// Mock patient data
const MOCK_PATIENTS = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 1234567890",
    lastVisit: "2025-12-28",
    visits: 5,
    bloodType: "A+",
    conditions: "Hypertension",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+91 9876543210",
    lastVisit: "2025-12-15",
    visits: 3,
    bloodType: "B+",
    conditions: "None",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+91 5555555555",
    lastVisit: "2025-12-10",
    visits: 7,
    bloodType: "O+",
    conditions: "Diabetes, High Cholesterol",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    phone: "+91 4444444444",
    lastVisit: "2025-11-30",
    visits: 2,
    bloodType: "AB-",
    conditions: "Migraine",
  },
];

function Patients() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = MOCK_PATIENTS.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="text-blue-600" />
            My Patients
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            View and manage your patient records
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patients List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Total Patients: {filteredPatients.length}
                </p>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedPatient?.id === patient.id
                        ? "bg-blue-50 border-l-4 border-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-semibold text-gray-900">
                      {patient.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {patient.visits} visit{patient.visits !== 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {selectedPatient.name}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Patient ID: #PAT-{String(selectedPatient.id).padStart(5, "0")}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2">
                        Contact Information
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-900">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {selectedPatient.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-900">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {selectedPatient.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-4">
                      Medical Information
                    </p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-600">Blood Type</p>
                        <p className="font-semibold text-gray-900">
                          {selectedPatient.bloodType}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">
                          Known Conditions
                        </p>
                        <p className="font-semibold text-gray-900">
                          {selectedPatient.conditions}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-4">
                      Visit History
                    </p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-600">Total Visits</p>
                        <p className="font-semibold text-gray-900">
                          {selectedPatient.visits}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Last Visit
                        </p>
                        <p className="font-semibold text-gray-900">
                          {new Date(
                            selectedPatient.lastVisit
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <FileText className="w-4 h-4" />
                      View Records
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      <Calendar className="w-4 h-4" />
                      Schedule Appointment
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  Select a patient to view details
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Click on a patient name from the list to see their complete
                  profile
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patients;
