import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './app/login/page.jsx';
import MemberLoginPage from './app/login/login.jsx';
import MerchantRegister from './app/merchant/MerchantRegistration.jsx';

import DashboardRoutes from "@/routes/DashboardRoutes"; // 👈 Import Dashboard Routes

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/v1/merchants/create/:referrer_id" element={<MerchantRegister />} /> /* CREATE MERCHANT */
        
        <Route path="/v1/admin/:account_url/login" element={<LoginPage />} /> /* LOGIN ADMIN ACCOUNTS */

        <Route path="/login" element={<MemberLoginPage />} />

        {/* Dashboard Routes (Private) */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
