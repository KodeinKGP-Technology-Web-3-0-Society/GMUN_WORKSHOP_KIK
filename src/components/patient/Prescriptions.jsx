import React, { useState, useEffect } from "react";
import { Pill, FileText, CheckCircle, Clock, Hash, Download, QrCode, Upload, AlertCircle } from "lucide-react";
import BlockchainRecordViewer from "../BlockchainRecordViewer";
import blockchainService from "../../services/blockchainService";

// --- MOCK DATA ---
const MOCK_PRESCRIPTIONS = [
  { 
    id: "RX-9021", 
    drug: "Amoxicillin", 
    dosage: "500mg", 
    doctor: "Dr. Arpan Sharma", 
    date: "Dec 28, 2025", 
    status: "Active",
    instructions: "Take one capsule three times daily for 7 days.",
    ipfsHash: "QmXoyp...3289",
    type: "Antibiotic"
  },
  { 
    id: "RX-8842", 
    drug: "Metformin", 
    dosage: "850mg", 
    doctor: "Dr. Neha Gupta", 
    date: "Nov 15, 2025", 
    status: "Fulfilled",
    instructions: "Take with meals once daily.",
    ipfsHash: "QmTzWq...7712",
    type: "Diabetes"
  }
];

export default function Prescriptions() {
  const [selectedRxId, setSelectedRxId] = useState(null);
  // derive blockchain enabled from service
  const [patientId] = useState("patient-001");
  const [showBlockchainRecords, setShowBlockchainRecords] = useState(false);

  // Find the selected prescription object
  const selectedRx = MOCK_PRESCRIPTIONS.find(rx => rx.id === selectedRxId);

  // note: use blockchainService.isConnected when rendering to reflect live state

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Header */}
          <div className="mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="text-blue-600" />
                  Medical Records Vault
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Access your decentralized prescriptions and verifiable health credentials.
                </p>
              </div>
              {blockchainService.isConnected && (
                <button
                  onClick={() => setShowBlockchainRecords(!showBlockchainRecords)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <Upload size={16} />
                  {showBlockchainRecords ? "Hide Blockchain" : "View Blockchain"}
                </button>
              )}
            </div>
          </div>

          {/* Blockchain Alert */}
          {!blockchainService.isConnected && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="text-yellow-600" size={20} />
              <div>
                <p className="text-sm font-medium text-yellow-800">Blockchain not connected</p>
                <p className="text-xs text-yellow-700">Connect your wallet at the top to enable blockchain storage</p>
              </div>
            </div>
          )}

          {/* Blockchain Records Section */}
          {blockchainService.isConnected && showBlockchainRecords && (
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Hash size={20} className="text-blue-600" />
                Blockchain Stored Records
              </h3>
              <BlockchainRecordViewer patientId={patientId} recordType="prescription" />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Prescription List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Recent Records
              </h3>
              <div className="space-y-3">
                {MOCK_PRESCRIPTIONS.map((rx) => (
                  <div
                    key={rx.id}
                    onClick={() => setSelectedRxId(rx.id)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                      selectedRxId === rx.id 
                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" 
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <Pill className={selectedRxId === rx.id ? "text-blue-600" : "text-gray-400"} size={18} />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                        rx.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {rx.status}
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">{rx.drug}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{rx.doctor}</span>
                      <span>•</span>
                      <span>{rx.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Prescription Details */}
            <div className="lg:col-span-2">
              {selectedRx ? (
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Detail Header */}
                  <div className="bg-slate-900 p-8 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                          <Hash size={16} />
                          <span className="text-xs font-mono uppercase tracking-tighter">Token ID: {selectedRx.id}</span>
                        </div>
                        <h2 className="text-3xl font-bold">{selectedRx.drug}</h2>
                        <p className="text-slate-400 mt-1">{selectedRx.type} • {selectedRx.dosage}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl shadow-lg">
                        <QrCode size={64} className="text-slate-900" />
                      </div>
                    </div>
                  </div>

                  {/* Detail Body */}
                  <div className="p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <Clock size={14} /> Usage Instructions
                        </h4>
                        <p className="text-gray-800 leading-relaxed italic">
                          "{selectedRx.instructions}"
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          <CheckCircle size={14} /> Issuing Doctor
                        </h4>
                        <p className="text-gray-800 font-medium">{selectedRx.doctor}</p>
                        <p className="text-xs text-gray-500 mt-1">Verified Medical License Verified via DAO</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">IPFS Content Hash</p>
                          <p className="text-xs font-mono text-gray-600 truncate max-w-50 md:max-w-md">
                            {selectedRx.ipfsHash}
                          </p>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-125 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 bg-gray-50">
                  <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                    <FileText size={48} className="text-gray-200" />
                  </div>
                  <p className="font-medium">Select a record to view details</p>
                  <p className="text-xs mt-1">All data is fetched from the MedChain smart contract</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}