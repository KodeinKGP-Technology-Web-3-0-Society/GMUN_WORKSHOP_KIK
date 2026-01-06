import { Stethoscope, Users, TestTube } from "lucide-react"; // Added TestTube icon

function RoleSelection({ onSelectRole }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full"> {/* Increased max-width to accommodate 3 cards */}
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MedChain</h1>
          <p className="text-xl text-gray-600">
            Select your role to get started
          </p>
        </div>

        {/* Role Selection Cards - Updated to 3 columns on medium screens */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Patient Card */}
          <div
            onClick={() => onSelectRole("patient")}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 border border-gray-200 h-full flex flex-col">
              <div className="flex flex-col items-center flex-grow">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Patient
                </h2>
                <p className="text-center text-gray-600 mb-8">
                  Book appointments, view prescriptions, and manage your health records
                </p>

                <div className="space-y-3 w-full mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    Book appointments with doctors
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    Access your medical records
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    View prescriptions from doctors
                  </div>
                </div>
              </div>
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-auto">
                Continue as Patient
              </button>
            </div>
          </div>

          {/* Doctor Card */}
          <div
            onClick={() => onSelectRole("doctor")}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 border border-gray-200 h-full flex flex-col">
              <div className="flex flex-col items-center flex-grow">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <Stethoscope className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Doctor
                </h2>
                <p className="text-center text-gray-600 mb-8">
                  Manage your appointments, patients, and issue prescriptions
                </p>

                <div className="space-y-3 w-full mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    View your appointment schedule
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    Manage patient records
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    Issue and track prescriptions
                  </div>
                </div>
              </div>
              <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors mt-auto">
                Continue as Doctor
              </button>
            </div>
          </div>

          {/* Laboratory Card */}
          <div
            onClick={() => onSelectRole("laboratory")}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 border border-gray-200 h-full flex flex-col">
              <div className="flex flex-col items-center flex-grow">
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <TestTube className="w-10 h-10 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Laboratory
                </h2>
                <p className="text-center text-gray-600 mb-8">
                  Upload reports to IPFS and issue diagnostic NFT records [cite: 38, 39]
                </p>

                <div className="space-y-3 w-full mb-8">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    Upload X-rays/Blood reports [cite: 38]
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    Mint NFT diagnostic reports [cite: 39]
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                    Manage decentralized history
                  </div>
                </div>
              </div>
              <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors mt-auto">
                Continue as Lab
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            A decentralized healthcare platform powered by blockchain technology [cite: 3]
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;