import React from "react";
import { Activity, ShieldCheck, Database, Clock } from "lucide-react";

const DiagnosticHub = () => {
  const stats = [
    { label: "Reports Minted", value: "128", icon: <ShieldCheck className="text-green-600" /> },
    { label: "IPFS Storage Used", value: "1.2 GB", icon: <Database className="text-blue-600" /> },
    { label: "Pending Uploads", value: "3", icon: <Clock className="text-orange-600" /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Laboratory Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticHub;