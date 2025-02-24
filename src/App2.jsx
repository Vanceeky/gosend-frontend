import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './app/login/page.jsx';
import MemberLoginPage from './app/login/login.jsx';
import AdminDashboardPage from './app/dashboard/page.jsx';
import MerchantRegister from './app/merchant/MerchantRegistration.jsx';
import ActiveMembers from './app/members/active_member.jsx';

function App() {
  return (

    <Router>
      <Routes>
        {/* Catch dynamic login URL */}
        <Route path="/v1/merchants/create/:referrer_id" element={<MerchantRegister />} /> /* CREATE MERCHANT */
        
        <Route path="/v1/admin/:account_url/login" element={<LoginPage />} /> /* LOGIN ADMIN ACCOUNTS */
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />  /* ADMIN DASHBOARD */
        
        
        <Route path="/activated-members" element={<ActiveMembers />} />
        <Route path="/login" element={<MemberLoginPage />} />

      </Routes>
    </Router>

  );
}

export default App;
