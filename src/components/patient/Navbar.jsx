import React, { useState } from "react";
import { LogOut, User, Menu, X } from "lucide-react";

function Navbar({ activeTab, setActiveTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Appointments", id: "appointments" },
    { name: "Prescriptions", id: "prescriptions" },
    { name: "Profile", id: "profile" },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false); // Close menu on selection (mobile)
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      {/* Container - Removed max-w-7xl to keep it consistent with your full-width request */}
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Desktop Links */}
          <div className="flex items-center gap-8 lg:gap-14">
            <div 
              className="text-xl font-bold text-blue-600 tracking-tight cursor-pointer shrink-0" 
              onClick={() => handleTabClick("appointments")}
            >
              MedChain
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 lg:gap-8 h-16">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`text-sm transition-all duration-200 h-full border-b-2 flex items-center px-1 ${
                    activeTab === item.id
                      ? "text-blue-600 font-semibold border-blue-600"
                      : "text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-200"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* User Info & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] text-gray-400 font-mono">0x71C...89</p>
            </div>
            
            <div className="flex items-center gap-2">
               <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <button className="hidden sm:block text-gray-400 hover:text-red-500 transition-colors ml-1">
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between px-4">
              <span className="text-xs font-mono text-gray-400">0x71C...89</span>
              <button className="flex items-center gap-2 text-red-500 font-medium text-sm">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;