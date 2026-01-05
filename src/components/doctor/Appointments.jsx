import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";

function Toast({ message, type = "success", onClose }) {
  if (!message) return null;
  setTimeout(() => onClose(), 3000);
  const bgColor = type === "success" ? "bg-green-500" : "bg-blue-500";
  const icon = type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />;
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50`}>
      {icon}
      <span>{message}</span>
    </div>
  );
}

// Mock appointments data for doctor
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    patientName: "John Doe",
    patientEmail: "john.doe@email.com",
    patientPhone: "+91 1234567890",
    date: "2026-01-06",
    time: "9:00 AM",
    department: "Cardiology",
    reason: "Regular checkup",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientEmail: "jane.smith@email.com",
    patientPhone: "+91 9876543210",
    date: "2026-01-06",
    time: "10:00 AM",
    department: "Cardiology",
    reason: "Heart palpitations",
    status: "Confirmed",
  },
  {
    id: 3,
    patientName: "Mike Johnson",
    patientEmail: "mike.johnson@email.com",
    patientPhone: "+91 5555555555",
    date: "2026-01-07",
    time: "2:00 PM",
    department: "Cardiology",
    reason: "Blood pressure monitoring",
    status: "Pending",
  },
];

function Appointments() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [toast, setToast] = useState({ message: "", type: "success" });

  const filteredAppointments =
    filterStatus === "All"
      ? MOCK_APPOINTMENTS
      : MOCK_APPOINTMENTS.filter((apt) => apt.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">My Schedule</h1>
          <p className="text-sm text-gray-600 mt-1">
            View and manage your appointments
          </p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-3">
          {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Appointments List */}
          <div className="lg:col-span-2 space-y-3">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => setSelectedAppointment(apt)}
                  className={`p-4 bg-white rounded-lg border cursor-pointer transition-all ${
                    selectedAppointment?.id === apt.id
                      ? "border-blue-500 ring-2 ring-blue-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {apt.patientName}
                      </h3>
                      <p className="text-sm text-gray-600">{apt.reason}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        apt.status
                      )}`}
                    >
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {apt.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {apt.time}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">No appointments found</p>
              </div>
            )}
          </div>

          {/* Appointment Details */}
          <div className="lg:col-span-1">
            {selectedAppointment ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-6">
                  Appointment Details
                </h3>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Patient</p>
                        <p className="font-medium text-gray-900">
                          {selectedAppointment.patientName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Email</p>
                      <p className="flex items-center gap-2 text-sm text-gray-900">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {selectedAppointment.patientEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Phone</p>
                      <p className="flex items-center gap-2 text-sm text-gray-900">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {selectedAppointment.patientPhone}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Date & Time</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedAppointment.date} at{" "}
                        {selectedAppointment.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Department</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedAppointment.department}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Reason</p>
                      <p className="text-sm text-gray-900">
                        {selectedAppointment.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setToast({ message: "Appointment marked as complete!", type: "success" });
                        setSelectedAppointment(null);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => {
                        setToast({ message: "Appointment cancelled successfully!", type: "success" });
                        setSelectedAppointment(null);
                      }}
                      className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-500">
                  Select an appointment to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
