import React, { useState } from 'react';
import { ShieldAlert, Zap } from 'lucide-react';
import FileUpload from './FileUpload';

const LabReportForm = () => {
  const [patientAddress, setPatientAddress] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMintReport = async (e) => {
    e.preventDefault();
    if (!patientAddress || !selectedFile) return;

    setIsProcessing(true);
    // Simulation of IPFS upload and Polygon Minting
    console.log("Uploading to IPFS...", selectedFile.name);
    console.log("Minting NFT for...", patientAddress);
    
    setTimeout(() => {
      setIsProcessing(false);
      alert("Diagnostic NFT successfully issued to patient wallet!");
      setPatientAddress('');
      setSelectedFile(null);
    }, 3000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleMintReport} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap size={24} /> Issue Diagnostic NFT
          </h2>
          <p className="text-purple-100 text-sm mt-1">
            Securely link encrypted IPFS reports to patient identities.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Patient Wallet Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Patient Wallet Address (DID)
            </label>
            <input 
              type="text"
              required
              placeholder="0x..."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all font-mono text-sm"
              value={patientAddress}
              onChange={(e) => setPatientAddress(e.target.value)}
            />
          </div>

          {/* Integrated File Upload Component */}
          <FileUpload 
            selectedFile={selectedFile} 
            onFileSelect={setSelectedFile} 
          />

          {/* Blockchain Disclaimer */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <ShieldAlert className="text-amber-600 shrink-0" size={20} />
            <p className="text-xs text-amber-800 leading-relaxed">
              Ensure the wallet address is correct. Once minted on the <strong>Polygon</strong> network, 
              ownership of this diagnostic record is transferred permanently to the patient.
            </p>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            disabled={isProcessing || !selectedFile || !patientAddress}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 active:scale-95"
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing Blockchain Transaction...
              </>
            ) : (
              "Mint & Send Report"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LabReportForm;