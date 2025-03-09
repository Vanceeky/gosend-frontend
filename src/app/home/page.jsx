import React from 'react'
import { Outlet } from "react-router-dom";
import { Navbar } from '@/components/NavBar';


const HomePage = () => {
  return (
    <div>
      {/* Navbar is placed outside the Outlet */}
      <Navbar />

      {/* Outlet renders the nested routes */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;