import { Search, AlertCircle, Plus } from "lucide-react";

const MOCK_INVENTORY = [
  { id: "BAT-771", name: "Amoxicillin", stock: 45, unit: "Capsules", expiry: "12/2026", status: "In Stock" },
  { id: "BAT-402", name: "Paracetamol", stock: 8, unit: "Strips", expiry: "08/2026", status: "Low Stock" },
  { id: "BAT-119", name: "Metformin", stock: 120, unit: "Tablets", expiry: "01/2027", status: "In Stock" },
];

export default function InventoryManager() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search by drug name or Batch ID..." />
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all">
          <Plus size={18} /> Add Batch
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
              <th className="px-6 py-4">Batch ID (On-Chain)</th>
              <th className="px-6 py-4">Medicine</th>
              <th className="px-6 py-4">Stock Level</th>
              <th className="px-6 py-4">Expiry</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_INVENTORY.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/20 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-blue-600">{item.id}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.stock} {item.unit}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.expiry}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    item.status === 'Low Stock' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}