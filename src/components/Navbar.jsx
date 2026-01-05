import { LogOut, User } from "lucide-react";


function Navbar() {
 const navItems = [
   { name: "Appointments", href: "#" },
   { name: "Prescriptions", href: "#" },
   { name: "Profile", href: "#" },
 ];


 return (
   <nav className="bg-white border-b border-gray-200">
     <div className="max-w-8xl mx-auto px-6">
       <div className="flex items-center justify-between h-16">
         <div className="flex items-center gap-14">
           <div className="text-xl font-semibold text-blue-600">MedChain</div>
           <div className="flex gap-8">
             {navItems.map((item) => (
               <a
                 key={item.name}
                 href={item.href}
                 className={`text-sm transition-colors ${
                   item.active
                     ? "text-blue-600 font-medium"
                     : "text-gray-600 hover:text-gray-900"
                 }`}
               >
                 {item.name}
               </a>
             ))}
           </div>
         </div>
         <div className="flex items-center gap-4">
           <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
             <User className="w-5 h-5 text-blue-600" />
           </div>
           <button className="text-gray-600 hover:text-gray-900">
             <LogOut className="w-5 h-5" />
           </button>
         </div>
       </div>
     </div>
   </nav>
 );
}

export default Navbar
