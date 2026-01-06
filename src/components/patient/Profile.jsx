import React from "react";
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
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+91 1234567890",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    address: "123 Main Street, City, State 12345",
    bloodType: "A+",
    height: "5'10\"",
    weight: "170 lbs",
    allergies: "Penicillin, Shellfish",
    chronicConditions: "Hypertension",
    currentMedications: "Dolo 10mg daily",
    emergencyName: "Jane Doe",
    emergencyRelation: "Spouse",
    emergencyPhone: "+91 8890190188",
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="group py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 sm:-mx-6 px-6 transition-colors">
      <div className="flex items-start gap-4">
        <div className="mt-1 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            {label}
          </div>
          <div className="text-gray-900 font-medium leading-relaxed break-words">
            {value || <span className="text-gray-400 italic font-normal">Not specified</span>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Hero Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Patient Profile & Medical Records
              </p>
            </div>
          </div>

          {/* Quick Stats: Responsive Grid (1 col on mobile, 2 on tablet, 4 on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Blood Type", value: profileData.bloodType, icon: Droplet, color: "text-red-600", bg: "bg-red-50" },
              { label: "Height", value: profileData.height, icon: Ruler, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Weight", value: profileData.weight, icon: Weight, color: "text-green-600", bg: "bg-green-50" },
              { label: "Age", value: new Date().getFullYear() - new Date(profileData.dateOfBirth).getFullYear(), icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{stat.label}</div>
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Personal Information - Stacks on mobile, 2/3 width on desktop */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <InfoRow icon={User} label="First Name" value={profileData.firstName} />
              <InfoRow icon={User} label="Last Name" value={profileData.lastName} />
              <InfoRow icon={Mail} label="Email Address" value={profileData.email} />
              <InfoRow icon={Phone} label="Phone Number" value={profileData.phone} />
              <InfoRow icon={Calendar} label="Date of Birth" value={profileData.dateOfBirth} />
              <InfoRow icon={User} label="Gender" value={profileData.gender} />
            </div>
            <div className="mt-0">
              <InfoRow icon={MapPin} label="Address" value={profileData.address} />
            </div>
          </div>

          {/* Emergency Contact - Stacks on mobile, 1/3 width on desktop */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Emergency</h2>
            </div>

            <div className="space-y-6">
              {[
                { label: "Full Name", value: profileData.emergencyName },
                { label: "Relationship", value: profileData.emergencyRelation },
                { label: "Phone Number", value: profileData.emergencyPhone }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-purple-200">{item.label}</div>
                  <div className="text-lg font-semibold">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex items-start gap-3 text-sm text-purple-100">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="leading-tight">Notified in case of medical emergencies.</p>
              </div>
            </div>
          </div>

          {/* Medical Information - Full width on desktop grid row */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Medical Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <InfoRow icon={AlertTriangle} label="Allergies" value={profileData.allergies} />
              <InfoRow icon={Activity} label="Chronic Conditions" value={profileData.chronicConditions} />
              <InfoRow icon={Pill} label="Current Medications" value={profileData.currentMedications} />
            </div>
          </div>
        </div>

        {/* Responsive Footer Note */}
        <div className="mt-8 bg-white/50 backdrop-blur rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Keep Your Information Current</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accurate data enables providers to deliver better care. Please review and update regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;