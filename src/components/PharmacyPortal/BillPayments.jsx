import { QrCode, CreditCard, CheckCircle, RefreshCw } from "lucide-react";

export default function BillPayments() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Verification Terminal */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-white/10 p-6 rounded-3xl border border-white/10 mb-6">
          <QrCode size={120} className="text-blue-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">Scan Rx Token</h3>
        <p className="text-slate-400 text-sm mb-8 px-10">
          Point the scanner at the patient's MedChain mobile app to verify prescription and automate billing.
        </p>
        <button className="w-full bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/40">
          <RefreshCw size={18} /> Initialize Smart-Settle
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <CreditCard className="text-gray-400" size={20} />
          Settled Payments
        </h3>
        <div className="space-y-4">
          {[
            { id: "TX-9901", patient: "0x71...89", amount: "0.012 ETH", status: "Success" },
            { id: "TX-9872", patient: "0x44...12", amount: "0.008 ETH", status: "Success" },
          ].map((tx) => (
            <div key={tx.id} className="p-5 border border-gray-100 rounded-2xl flex justify-between items-center shadow-sm">
              <div>
                <p className="text-[10px] font-bold text-blue-600 font-mono uppercase tracking-tighter">{tx.id}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">Patient: {tx.patient}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{tx.amount}</p>
                <p className="text-[10px] text-green-600 font-bold flex items-center gap-1 justify-end">
                  <CheckCircle size={10} /> {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-all text-sm">
          Generate Daily Revenue Report (PDF)
        </button>
      </div>
    </div>
  );
}