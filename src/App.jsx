// import React from "react";

// function App() {
//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <h1 className="text-red-500 text-4xl font-bold">KIK GMUN WORKSHOP</h1>
//     </div>
//   );
// }

// export default App;

import  Navbar  from "./components/Navbar";
import Appointments  from "./components/Appointments"



function App() {
 return (
   <>
     <Navbar />
     <Appointments />
   </>
 );
}


export default App;