import React from "react";
import { ExternalLink, Lock } from "lucide-react";

const ReportCard = ({ id, type, date, patient }) => {
  return (
    <div className="bg-white border rounded-xl p-5 flex items-center justify-between hover:border-purple-300 transition-colors shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-50 rounded-full text-purple-600"><Lock size={20} /></div>
        <div>
          <h3 className="font-bold text-gray-900">{type}</h3>
          <p className="text-xs text-gray-500">ID: {id} • Patient: {patient}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{date}</span>
        <button className="text-purple-600 hover:text-purple-800"><ExternalLink size={18} /></button>
      </div>
    </div>
  );
};

export default ReportCard;