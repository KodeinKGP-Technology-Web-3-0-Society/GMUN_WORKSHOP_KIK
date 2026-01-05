import React, { useState } from "react";
import { Upload, CheckCircle, AlertCircle, Loader } from "lucide-react";
import blockchainService from "../services/blockchainService";

export default function BlockchainRecordUpload({ patientId, onSuccess }) {
  const [recordType, setRecordType] = useState("prescription");
  const [ipfsHash, setIpfsHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setTransactionHash(null);

    try {
      if (!ipfsHash.trim()) {
        throw new Error("Please enter IPFS hash");
      }

      const result = await blockchainService.storeMedicalRecord(
        patientId,
        recordType,
        ipfsHash
      );

      setMessage({
        type: "success",
        text: `Record stored successfully on blockchain!`,
      });
      setTransactionHash(result.transactionHash);
      setIpfsHash("");
      onSuccess && onSuccess(result);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to upload record",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Store Medical Record</h3>

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Record Type
          </label>
          <select
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="prescription">Prescription</option>
            <option value="labReport">Lab Report</option>
            <option value="appointment">Appointment</option>
            <option value="diagnosis">Diagnosis</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IPFS Hash
          </label>
          <input
            type="text"
            placeholder="QmXx..."
            value={ipfsHash}
            onChange={(e) => setIpfsHash(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload file to IPFS first, then paste hash here
          </p>
        </div>

        {message && (
          <div
            className={`flex items-gap-2 p-3 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <div>
              <p className="font-medium">{message.text}</p>
              {transactionHash && (
                <p className="text-xs mt-1">
                  Tx: {transactionHash.slice(0, 10)}...
                </p>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          {isLoading ? (
            <>
              <Loader size={18} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={18} />
              Store on Blockchain
            </>
          )}
        </button>
      </form>
    </div>
  );
}
