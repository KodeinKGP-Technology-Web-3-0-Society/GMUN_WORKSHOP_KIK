import React, { useState } from 'react';
import FileUpload from './FileUpload';

const LabReportForm = () => {
  const [patientAddress, setPatientAddress] = useState('');
  const [reportFile, setReportFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // 1. Upload to IPFS 
    // 2. Mint NFT on Polygon [cite: 89, 93]
    console.log("Minting report for:", patientAddress);
    setTimeout(() => setLoading(false), 2000); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold text-gray-800">Issue Diagnostic NFT</h2>
      
      <div>
        <label className="block text-sm font-semibold mb-2">Patient Wallet Address</label>
        <input 
          type="text" 
          placeholder="0x..." 
          className="w-full p-2 border rounded-md outline-blue-500"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          required
        />
      </div>

      <FileUpload onFileSelect={setReportFile} />

      <button 
        type="submit"
        disabled={loading || !reportFile}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Processing Blockchain Transaction..." : "Mint & Send Report"}
      </button>
    </form>
  );
};

export default LabReportForm;