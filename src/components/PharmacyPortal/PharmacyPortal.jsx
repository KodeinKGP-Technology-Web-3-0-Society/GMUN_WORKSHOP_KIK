import React, { useState } from "react";
import InventoryManager from "./InventoryManager";
import BillPayments from "./BillPayments";
import { Package, Receipt, ShieldCheck } from "lucide-react";

export default function PharmacyPortal() {
  const [activeSubTab, setActiveSubTab] = useState("inventory");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Pharmacy Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="text-blue-600" />
              MedChain Pharmacy
            </h1>
            <p className="text-gray-500 mt-1">Authorized Dispensing Center • Store #KGP-04</p>
          </div>
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-bold border border-green-100 flex items-center gap-2">
            <ShieldCheck size={16} /> Nodes Synced: 100%
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-gray-100 mb-8">
          <button 
            onClick={() => setActiveSubTab("inventory")}
            className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all ${
              activeSubTab === "inventory" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
            }`}
          >
            <Package size={18} /> Inventory Management
          </button>
          <button 
            onClick={() => setActiveSubTab("billing")}
            className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all ${
              activeSubTab === "billing" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
            }`}
          >
            <Receipt size={18} /> Bills & Payments
          </button>
        </div>

        {/* Dynamic Content */}
        <div>
          {activeSubTab === "inventory" ? <InventoryManager /> : <BillPayments />}
        </div>
      </div>
    </div>
  );
}