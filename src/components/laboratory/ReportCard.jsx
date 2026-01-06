import React from "react";
import { ExternalLink, Lock } from "lucide-react";

// 1. Define the Mock Data
const MOCK_REPORTS = [
  {
    id: "NFT-8821",
    type: "Blood Metabolic Panel",
    date: "Jan 04, 2026",
    patient: "0x71C...a291",
  },
  {
    id: "NFT-7742",
    type: "Genetic Sequence Data",
    date: "Dec 28, 2025",
    patient: "0x32B...f940",
  },
  {
    id: "NFT-1109",
    type: "MRI Scan Analysis",
    date: "Dec 15, 2025",
    patient: "0x99A...d112",
  },
];

const ReportCard = ({ id, type, date, patient }) => {
  return (
    <div className="bg-white border rounded-xl p-5 flex items-center justify-between hover:border-purple-300 transition-colors shadow-sm mb-3">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-50 rounded-full text-purple-600">
          <Lock size={20} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{type}</h3>
          <p className="text-xs text-gray-500">
            ID: {id} • Patient: {patient}
          </p>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {date}
        </span>
        <button className="text-purple-600 hover:text-purple-800 transition-transform active:scale-90">
          <ExternalLink size={18} />
        </button>
      </div>
    </div>
  );
};

// 2. Parent Component to display the list
const ReportsList = () => {
  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Diagnostic NFTs</h2>
        <span className="text-sm text-purple-600 font-medium cursor-pointer hover:underline">View All</span>
      </div>
      
      {/* Mapping over mock data */}
      {MOCK_REPORTS.map((report) => (
        <ReportCard 
          key={report.id}
          id={report.id}
          type={report.type}
          date={report.date}
          patient={report.patient}
        />
      ))}
    </div>
  );
};

export default ReportsList;