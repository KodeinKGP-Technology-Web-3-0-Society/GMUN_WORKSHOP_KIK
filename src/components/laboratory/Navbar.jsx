import React from "react";
import { LayoutDashboard, Upload, FolderOpen, FileText, LogOut } from "lucide-react";

const LabNavbar = ({ activeTab, setActiveTab, setSelectedRole }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "upload", label: "Issue Report", icon: <Upload size={18} /> },
    { id: "file-manager", label: "IPFS Vault", icon: <FolderOpen size={18} /> },
    { id: "reports", label: "History", icon: <FileText size={18} /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900"
            onClick={()=>setSelectedRole(null)}
          >MedChain <span className="text-purple-600">LABS</span></span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${activeTab === item.id ? "bg-purple-50 text-purple-700 shadow-sm" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-purple-600 uppercase">Lab Node</p>
            <p className="text-xs font-mono text-gray-500">0x71C...3A4f</p>
          </div>
          <button onClick={() => window.location.reload()} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LabNavbar;