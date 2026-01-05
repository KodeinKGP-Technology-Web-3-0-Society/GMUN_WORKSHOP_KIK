import React from 'react';
import { ShieldCheck, Download, ExternalLink } from 'lucide-react';

const ReportCard = ({ reportName, date, doctor }) => {
  return (
    <div className="bg-white border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-green-100 rounded-full">
          <ShieldCheck className="text-green-600" size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{reportName}</h3>
          <p className="text-xs text-gray-500">Issued on: {date} • By: {doctor}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md" title="View on IPFS">
          <ExternalLink size={20} />
        </button>
        <button className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-100">
          <Download size={18} />
          Decrypt
        </button>
      </div>
    </div>
  );
};

export default ReportCard;