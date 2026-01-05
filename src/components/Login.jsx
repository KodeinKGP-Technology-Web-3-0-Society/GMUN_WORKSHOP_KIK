import React, { useEffect, useState } from "react";
import dummy from "../data/dummyUsers.json";
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(id);
  }, [message]);

  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500";
  const icon = type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />;

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 text-white px-6 py-3 rounded-lg shadow-lg ${bgColor} flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 z-50`}>
      {icon}
      <span>{message}</span>
    </div>
  );
}

function PatientRegister({ onRegistered }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistered(form);
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">First Name</label>
          <input required placeholder="John" value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} className={inputClasses} />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Last Name</label>
          <input required placeholder="Doe" value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} className={inputClasses} />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">Email</label>
        <input type="email" required placeholder="john@example.com" value={form.email} onChange={e => handleChange('email', e.target.value)} className={inputClasses} />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">Password</label>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={form.password} onChange={e => handleChange('password', e.target.value)} className={inputClasses} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Phone</label>
          <input required placeholder="+91 9876543210" value={form.phone} onChange={e => handleChange('phone', e.target.value)} className={inputClasses} />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">DOB</label>
          <input type="date" required value={form.dateOfBirth} onChange={e => handleChange('dateOfBirth', e.target.value)} className={inputClasses} />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">Gender</label>
        <select required value={form.gender} onChange={e => handleChange('gender', e.target.value)} className={inputClasses}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">Address</label>
        <input placeholder="123 Main St" value={form.address} onChange={e => handleChange('address', e.target.value)} className={inputClasses} />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="text-xs font-semibold text-blue-900 mb-2">Emergency Contact</h4>
        <div className="space-y-2">
          <input required placeholder="Contact name" value={form.emergencyName} onChange={e => handleChange('emergencyName', e.target.value)} className={inputClasses} />
          <input required placeholder="Relationship" value={form.emergencyRelation} onChange={e => handleChange('emergencyRelation', e.target.value)} className={inputClasses} />
          <input required placeholder="Phone" value={form.emergencyPhone} onChange={e => handleChange('emergencyPhone', e.target.value)} className={inputClasses} />
        </div>
      </div>

      <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Register</button>
    </form>
  );
}

export default function Login({ role, onLogin, onBack }) {
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [doctors, setDoctors] = useState(dummy.doctors || []);
  const [patients, setPatients] = useState(dummy.patients || []);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const handleLogin = (e) => {
    e && e.preventDefault();
    if (role === "doctor") {
      const found = doctors.find(d => d.email === email && d.password === password);
      if (found) {
        showToast("Doctor login successful!", "success");
        setTimeout(() => onLogin(), 800);
      } else {
        showToast("Invalid credentials", "error");
      }
    } else {
      const found = patients.find(p => p.email === email && p.password === password);
      if (found) {
        showToast("Patient login successful!", "success");
        setTimeout(() => onLogin(), 800);
      } else {
        showToast("Invalid credentials", "error");
      }
    }
  };

  const handleRegister = (formData) => {
    const exists = patients.find(p => p.email === formData.email);
    if (exists) {
      showToast("Email already registered", "error");
      return;
    }
    const newPatient = { id: `p${patients.length + 1}`, ...formData };
    setPatients(prev => [newPatient, ...prev]);
    showToast("Registration successful! Please login.", "success");
    setEmail("");
    setPassword("");
    setTab("login");
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "" })} />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">MedChain</h2>
            <p className="text-sm text-gray-600">{role === "doctor" ? "Doctor Login" : "Patient Login"}</p>
          </div>
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
        </div>

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input type="email" required placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} className={inputClasses} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className={inputClasses} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Sign In</button>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && role !== "doctor" && (
          <PatientRegister onRegistered={handleRegister} />
        )}

        {/* Toggle Link */}
        {role !== "doctor" && (
          <div className="mt-6 text-center">
            {tab === "login" ? (
              <p className="text-sm text-gray-600">
                New here?{" "}
                <button onClick={() => setTab("register")} className="text-blue-600 font-semibold hover:underline">
                  Register
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have account?{" "}
                <button onClick={() => setTab("login")} className="text-blue-600 font-semibold hover:underline">
                  Sign In
                </button>
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
