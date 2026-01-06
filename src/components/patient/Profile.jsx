import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  AlertTriangle,
  MapPin,
  Droplet,
  Ruler,
  Weight,
  Pill,
  Activity,
} from "lucide-react";

function Profile() {
  const profileData = {
    // Personal Information
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+91 1234567890",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    address: "123 Main Street, City, State 12345",

    // Medical Information
    bloodType: "A+",
    height: "5'10\"",
    weight: "170 lbs",
    allergies: "Penicillin, Shellfish",
    chronicConditions: "Hypertension",
    currentMedications: "dolo 10mg daily",

    // Emergency Contact
    emergencyName: "Jane Doe",
    emergencyRelation: "Spouse",
    emergencyPhone: "+91 8890190188",
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="group py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 -mx-6 px-6 transition-colors">
      <div className="flex items-start gap-4">
        <div className="mt-1 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {label}
          </div>
          <div className="text-gray-900 font-medium leading-relaxed">
            {value || (
              <span className="text-gray-400 italic">Not specified</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Header */}
        <div className="mb-12">
          <div className="mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-600 text-lg">
                Patient Profile & Medical Records
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Blood Type
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {profileData.bloodType}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Ruler className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Height
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {profileData.height}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Weight className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Weight
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {profileData.weight}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Age
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {new Date().getFullYear() -
                      new Date(profileData.dateOfBirth).getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Personal Information - Spans 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Personal Information
              </h2>
            </div>

            <div>
              <div className="grid md:grid-cols-2 gap-x-8">
                <InfoRow
                  icon={User}
                  label="First Name"
                  value={profileData.firstName}
                />
                <InfoRow
                  icon={User}
                  label="Last Name"
                  value={profileData.lastName}
                />
              </div>
              <InfoRow
                icon={Mail}
                label="Email Address"
                value={profileData.email}
              />
              <InfoRow
                icon={Phone}
                label="Phone Number"
                value={profileData.phone}
              />
              <InfoRow
                icon={Calendar}
                label="Date of Birth"
                value={profileData.dateOfBirth}
              />
              <InfoRow icon={User} label="Gender" value={profileData.gender} />
              <InfoRow
                icon={MapPin}
                label="Address"
                value={profileData.address}
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Emergency Contact</h2>
            </div>

            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">
                  Full Name
                </div>
                <div className="text-lg font-semibold">
                  {profileData.emergencyName}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">
                  Relationship
                </div>
                <div className="text-lg font-semibold">
                  {profileData.emergencyRelation}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">
                  Phone Number
                </div>
                <div className="text-lg font-semibold">
                  {profileData.emergencyPhone}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-start gap-2 text-sm text-white/90">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <p>
                  This contact will be notified in case of medical emergencies.
                </p>
              </div>
            </div>
          </div>

          {/* Medical Information - Full width */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Medical Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8">
              <InfoRow
                icon={AlertTriangle}
                label="Allergies"
                value={profileData.allergies}
              />
              <InfoRow
                icon={Activity}
                label="Chronic Conditions"
                value={profileData.chronicConditions}
              />
            </div>
            <InfoRow
              icon={Pill}
              label="Current Medications"
              value={profileData.currentMedications}
            />
          </div>
        </div>

        {/* Information Note */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Keep Your Information Current
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accurate and up-to-date medical information enables healthcare
                providers to deliver better care during appointments and
                emergencies. Please review and update your profile regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
