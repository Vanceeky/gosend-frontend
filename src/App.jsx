import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './app/login/page.jsx';
import MemberLoginPage from './app/login/login.jsx';
import MerchantRegister from './app/merchant/MerchantRegistration.jsx';


import HomeRoutes from "@/routes/HomeRoutes";
import DashboardRoutes from "@/routes/DashboardRoutes"; // 👈 Import Dashboard Routes
import CommunityRoutes from "@/routes/CommunityRoutes";


import ErrorPage from "./components/ErrorPage";



import { Toaster  } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" />
    
      <Router>
        <Routes>

          {/* Home Routes */}
          <Route path="/*" element={<HomeRoutes />} />

          
          
          {/* Public Routes */}
          <Route path="/v1/merchants/create/:referrer_id" element={<MerchantRegister />} /> /* CREATE MERCHANT */ /* CREATE MERCHANT */

          <Route path="/v1/admin/:account_url/login" element={<LoginPage />} /> /* LOGIN ADMIN ACCOUNTS */ /* LOGIN ADMIN ACCOUNTS */

          <Route path="/login" element={<MemberLoginPage />} />


          {/* Dashboard Routes (Private) */}
          <Route path="/dashboard/*" element={<DashboardRoutes />} />


          {/* Community Routes (Private) */}
          <Route path="/community/*" element={<CommunityRoutes />} />



          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </Router>
      
    </>
  );
}

export default App;
