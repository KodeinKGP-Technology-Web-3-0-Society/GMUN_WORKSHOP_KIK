import { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import DoctorInfo from "./DoctorInfo";
import BlockchainRecordViewer from "../BlockchainRecordViewer";
import blockchainService from "../../services/blockchainService";
import { Upload, AlertCircle, Hash } from "lucide-react";

function Appointments() {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [blockchainEnabled, setBlockchainEnabled] = useState(false);
  const [patientId] = useState("patient-001");
  const [showBlockchainRecords, setShowBlockchainRecords] = useState(false);

  // Check if blockchain is connected
  useEffect(() => {
    setBlockchainEnabled(blockchainService.isConnected);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Book an Appointment
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Select a doctor and preferred time
              </p>
            </div>
            {blockchainEnabled && (
              <button
                onClick={() => setShowBlockchainRecords(!showBlockchainRecords)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Upload size={16} />
                {showBlockchainRecords ? "Hide Blockchain" : "View Appointments"}
              </button>
            )}
          </div>

          {/* Blockchain Alert */}
          {!blockchainEnabled && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="text-yellow-600" size={20} />
              <div>
                <p className="text-sm font-medium text-yellow-800">Blockchain not connected</p>
                <p className="text-xs text-yellow-700">Connect your wallet at the top to enable blockchain storage</p>
              </div>
            </div>
          )}

          {/* Blockchain Records Section */}
          {blockchainEnabled && showBlockchainRecords && (
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Hash size={20} className="text-blue-600" />
                Blockchain Stored Appointments
              </h3>
              <BlockchainRecordViewer patientId={patientId} recordType="appointment" />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <BookingForm onDoctorSelect={setSelectedDoctorId} />
            </div>
            <div className="lg:col-span-1">
              <DoctorInfo doctorId={selectedDoctorId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Appointments