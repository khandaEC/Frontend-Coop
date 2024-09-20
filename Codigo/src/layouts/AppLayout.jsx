import React, { useState } from "react";
import Slidebar from "../componentes/Slidebar";

function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMouseEnter = () => setSidebarOpen(true);
  const handleMouseLeave = () => setSidebarOpen(false);

  return (
    <div className="flex flex-row h-screen">
      <Slidebar 
        sidebarOpen={sidebarOpen} 
        handleMouseEnter={handleMouseEnter} 
        handleMouseLeave={handleMouseLeave} 
      />
      <div 
        className={`flex-[3] ${sidebarOpen ? "ml-60" : "ml-20"} duration-300 overflow-y-auto relative`}
      >
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
