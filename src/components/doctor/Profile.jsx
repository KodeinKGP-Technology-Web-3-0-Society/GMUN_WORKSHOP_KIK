import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Award,
  Briefcase,
  Edit3,
  Save,
  X,
} from "lucide-react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "Arpan",
    lastName: "Sharma",
    email: "arpan.sharma@hospital.com",
    phone: "+91 9876543210",
    specialization: "Cardiology",
    licenseNumber: "MC-12345",
    registrationNumber: "REG-98765",

    // Professional Information
    yearsOfExperience: "15",
    qualifications: "MBBS, MD (Internal Medicine), DM (Cardiology)",
    hospital: "City Medical Center",
    department: "Cardiology",
    consultationFee: "500",

    // Availability
    availabilityDays: "Monday to Friday",
    availabilityTime: "9:00 AM - 5:00 PM",
    slotDuration: "30",

    // Bio
    bio: "Experienced cardiologist with 15 years of practice in cardiac care, arrhythmia management, and preventive cardiology.",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving doctor profile data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const ProfileSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InputField = ({ label, field, type = "text", placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {isEditing ? (
        type === "textarea" ? (
          <textarea
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <input
            type={type}
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )
      ) : (
        <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
          {formData[field] || "Not specified"}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Doctor Profile
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your professional information
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <ProfileSection title="Personal Information" icon={User}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" field="firstName" />
                <InputField label="Last Name" field="lastName" />
              </div>
              <InputField label="Email Address" field="email" type="email" />
              <InputField label="Phone Number" field="phone" type="tel" />
            </div>
          </ProfileSection>

          {/* Professional Information */}
          <ProfileSection title="Professional Information" icon={Briefcase}>
            <div className="space-y-4">
              <InputField
                label="Specialization"
                field="specialization"
              />
              <InputField label="Department" field="department" />
              <InputField label="Hospital/Clinic" field="hospital" />
            </div>
          </ProfileSection>

          {/* Credentials */}
          <ProfileSection title="Credentials" icon={Award}>
            <div className="space-y-4">
              <InputField label="License Number" field="licenseNumber" />
              <InputField
                label="Registration Number"
                field="registrationNumber"
              />
              <InputField label="Qualifications" field="qualifications" />
            </div>
          </ProfileSection>

          {/* Availability & Rates */}
          <ProfileSection title="Availability & Rates" icon={Phone}>
            <div className="space-y-4">
              <InputField label="Years of Experience" field="yearsOfExperience" />
              <InputField label="Availability Days" field="availabilityDays" />
              <InputField label="Availability Time" field="availabilityTime" />
              <InputField
                label="Slot Duration (mins)"
                field="slotDuration"
                type="number"
              />
              <InputField label="Consultation Fee" field="consultationFee" />
            </div>
          </ProfileSection>
        </div>

        {/* Bio Section */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Professional Bio
          </h3>
          <InputField
            label="Bio"
            field="bio"
            type="textarea"
            placeholder="Write a brief professional bio..."
          />
        </div>

        {/* Important Note */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex gap-3">
            <Award className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Verification Required</p>
              <p>
                Please ensure all credentials and professional information are
                accurate and verified. This information will be used to build
                patient trust and verify your qualifications on the platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
