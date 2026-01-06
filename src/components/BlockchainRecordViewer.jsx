import React, { useState, useEffect } from "react";
import { RefreshCw, AlertCircle, Loader } from "lucide-react";
import blockchainService from "../services/blockchainService";

export default function BlockchainRecordViewer({ patientId, recordType = "all" }) {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!blockchainService.isConnected) {
        throw new Error("Please connect wallet first");
      }

      // If viewing prescriptions, call the dedicated getter
      if (recordType.toLowerCase() === "prescription") {
        const pres = await blockchainService.getPrescriptions(patientId);

        // Normalize to a common record shape expected by the UI
        const mapped = pres.map((p) => ({
          recordType: "prescription",
          ipfsHash: "",
          timestamp: p.timestamp || p[4] || 0,
          doctorId: p.doctorId || p[0],
          medication: p.medication || p[1],
          dosage: p.dosage || p[2],
          duration: p.duration || p[3],
        }));

        setRecords(mapped);
        return;
      }

      if (recordType.toLowerCase() === "appointment") {
        const appts = await blockchainService.getAppointments(patientId);

        const mapped = appts.map((a) => ({
          recordType: "appointment",
          ipfsHash: "",
          timestamp: a.appointmentDate || a[1] || 0,
          doctorId: a.doctorId || a[0],
          isCompleted: a.isCompleted || a[2] || false,
        }));

        setRecords(mapped);
        return;
      }

      // Default: fetch generic medical records
      const allRecords = await blockchainService.getMedicalRecords(patientId);

      if (recordType !== "all") {
        const filtered = allRecords.filter((r) =>
          r.recordType.toLowerCase().includes(recordType.toLowerCase())
        );
        setRecords(filtered);
      } else {
        setRecords(allRecords);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch records");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [patientId]);

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Blockchain Medical Records</h3>
        <button
          onClick={fetchRecords}
          disabled={isLoading}
          className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm mb-4 bg-red-50 p-3 rounded-lg">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {isLoading && !records.length && (
        <div className="flex items-center justify-center gap-2 text-gray-600 py-8">
          <Loader size={18} className="animate-spin" />
          Loading records...
        </div>
      )}

      {records.length === 0 && !isLoading && (
        <p className="text-gray-500 text-center py-8">
          No records found on blockchain
        </p>
      )}

      {records.length > 0 && (
        <div className="space-y-3">
          {records.map((record, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                    {record.recordType}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDate(record.timestamp)}
                  </p>
                </div>
              </div>

              {/* Render prescription details when available */}
              {record.recordType === "prescription" ? (
                <div className="bg-gray-50 rounded p-3 mt-2 space-y-1">
                  <p className="text-sm font-medium">{record.medication}</p>
                  <p className="text-xs text-gray-700">Dosage: {record.dosage}</p>
                  <p className="text-xs text-gray-700">Duration: {record.duration} days</p>
                  {record.doctorId && (
                    <p className="text-xs text-gray-500">Doctor: {record.doctorId}</p>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded p-3 mt-2">
                  <p className="text-xs text-gray-700 font-mono break-all">
                    <strong>IPFS:</strong> {record.ipfsHash}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
