import React from 'react'
import { Outlet } from "react-router-dom";
import { Navbar } from '@/components/NavBar';
import { Footer } from '@/components/Footer'



const HomePage = () => {
  return (
    <div>
      {/* Navbar is placed outside the Outlet */}
      <Navbar />

      {/* Outlet renders the nested routes */}

      <div className="bg-gray-100 rounded-lg">

        <Outlet />
        <Footer/>
      </div>

    </div>
  );
};

export default HomePage;