import React, { useState } from "react";
import {
  Pill,
  FileText,
  Plus,
  Trash2,
  Save,
  X,
  Hash,
  CheckCircle
} from "lucide-react";

function Toast({ message, onClose }) {
  if (!message) return null;
  setTimeout(() => onClose(), 3000);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
      <CheckCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}

// Mock data for doctor's issued prescriptions
const MOCK_ISSUED_PRESCRIPTIONS = [
  {
    id: "RX-9021",
    patientName: "John Doe",
    drug: "Amoxicillin",
    dosage: "500mg",
    date: "Dec 28, 2025",
    status: "Active",
    instructions: "Take one capsule three times daily for 7 days.",
    type: "Antibiotic",
  },
  {
    id: "RX-8842",
    patientName: "Jane Smith",
    drug: "Metformin",
    dosage: "850mg",
    date: "Nov 15, 2025",
    status: "Fulfilled",
    instructions: "Take with meals once daily.",
    type: "Diabetes",
  },
];

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState(MOCK_ISSUED_PRESCRIPTIONS);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [toast, setToast] = useState("");
  const [newPrescription, setNewPrescription] = useState({
    patientName: "",
    drug: "",
    dosage: "",
    instructions: "",
    type: "",
  });

  const handleCreatePrescription = () => {
    if (
      newPrescription.patientName &&
      newPrescription.drug &&
      newPrescription.dosage
    ) {
      const prescription = {
        id: `RX-${Date.now()}`,
        ...newPrescription,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        status: "Active",
      };
      setPrescriptions([prescription, ...prescriptions]);
      setToast("Prescription issued successfully!");
      setNewPrescription({
        patientName: "",
        drug: "",
        dosage: "",
        instructions: "",
        type: "",
      });
      setIsCreating(false);
    }
  };

  const handleDeletePrescription = (id) => {
    setPrescriptions(prescriptions.filter((rx) => rx.id !== id));
    setToast("Prescription deleted successfully!");
    if (selectedPrescription?.id === id) {
      setSelectedPrescription(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Toast message={toast} onClose={() => setToast("")} />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="text-blue-600" />
                  Issue Prescriptions
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Create and manage patient prescriptions
                </p>
              </div>
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Issue Prescription
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Prescription List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                Recent Prescriptions
              </h3>
              <div className="space-y-3">
                {prescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    onClick={() => setSelectedPrescription(rx)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                      selectedPrescription?.id === rx.id
                        ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <Pill
                          className={
                            selectedPrescription?.id === rx.id
                              ? "text-blue-600"
                              : "text-gray-400"
                          }
                          size={18}
                        />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                          rx.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {rx.status}
                      </span>
                    </div>
                    <p className="font-bold text-gray-900">{rx.drug}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{rx.patientName}</span>
                      <span>•</span>
                      <span>{rx.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Prescription Details / Create */}
            <div className="lg:col-span-2">
              {isCreating ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Issue New Prescription
                    </h2>
                    <button
                      onClick={() => setIsCreating(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        value={newPrescription.patientName}
                        onChange={(e) =>
                          setNewPrescription({
                            ...newPrescription,
                            patientName: e.target.value,
                          })
                        }
                        placeholder="Enter patient name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Drug Name
                        </label>
                        <input
                          type="text"
                          value={newPrescription.drug}
                          onChange={(e) =>
                            setNewPrescription({
                              ...newPrescription,
                              drug: e.target.value,
                            })
                          }
                          placeholder="e.g., Amoxicillin"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dosage
                        </label>
                        <input
                          type="text"
                          value={newPrescription.dosage}
                          onChange={(e) =>
                            setNewPrescription({
                              ...newPrescription,
                              dosage: e.target.value,
                            })
                          }
                          placeholder="e.g., 500mg"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <input
                        type="text"
                        value={newPrescription.type}
                        onChange={(e) =>
                          setNewPrescription({
                            ...newPrescription,
                            type: e.target.value,
                          })
                        }
                        placeholder="e.g., Antibiotic"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instructions
                      </label>
                      <textarea
                        value={newPrescription.instructions}
                        onChange={(e) =>
                          setNewPrescription({
                            ...newPrescription,
                            instructions: e.target.value,
                          })
                        }
                        placeholder="e.g., Take one capsule three times daily for 7 days"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={handleCreatePrescription}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Save className="w-4 h-4" />
                        Issue Prescription
                      </button>
                      <button
                        onClick={() => setIsCreating(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : selectedPrescription ? (
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Detail Header */}
                  <div className="bg-slate-900 p-8 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                          <Hash size={16} />
                          <span className="text-xs font-mono uppercase tracking-tighter">
                            Token ID: {selectedPrescription.id}
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold">
                          {selectedPrescription.drug}
                        </h2>
                        <p className="text-slate-400 mt-1">
                          {selectedPrescription.type} •{" "}
                          {selectedPrescription.dosage}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Detail Body */}
                  <div className="p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">
                          Patient Information
                        </h4>
                        <p className="text-gray-800 font-medium">
                          {selectedPrescription.patientName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedPrescription.date}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">
                          Instructions
                        </h4>
                        <p className="text-gray-800 italic">
                          "{selectedPrescription.instructions}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          selectedPrescription.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {selectedPrescription.status}
                      </span>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeletePrescription(selectedPrescription.id)
                        }
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-125 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 bg-gray-50">
                  <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                    <FileText size={48} className="text-gray-200" />
                  </div>
                  <p className="font-medium">Select a prescription to view</p>
                  <p className="text-xs mt-1">
                    Or create a new prescription to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
