import { useState } from "react";
import BookingForm from "./BookingForm";
import DoctorInfo from "./DoctorInfo";

function Appointments() {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  return (
    // Added w-full to ensure the base container spans the entire viewport
    <div className="min-h-screen w-full bg-white flex flex-col">
      <main className="flex-1 w-full">
        <div className="w-full px-6 py-8">
          
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Book an Appointment
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Select a doctor and preferred time
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <BookingForm onDoctorSelect={setSelectedDoctorId} />
            </div>
            <div className="lg:col-span-1">
              <DoctorInfo doctorId={selectedDoctorId} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Appointments;