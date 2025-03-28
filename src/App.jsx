import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './app/login/page.jsx';
import MemberLoginPage from './app/login/login.jsx';
import MerchantRegister from './app/merchant/MerchantRegistration.jsx';


import HomeRoutes from "@/routes/HomeRoutes";
import DashboardRoutes from "@/routes/DashboardRoutes"; // 👈 Import Dashboard Routes
import CommunityRoutes from "@/routes/CommunityRoutes";
import MerchantRoutes from "@/routes/MerchantRoutes.jsx"
import MemberRoutes from "@/routes/MemberRoutes.jsx"
import InvestorRoutes from "./routes/InvestorRoutes.jsx";

import ErrorPage from "./components/ErrorPage";

import CreateAccount from "./app/members/CreateAccount.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import CustomerSupportRoutes from "./routes/CustomerSupportRoutes.jsx";

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
          <Route path="/register-merchant" element={<MerchantRegister />} /> /* CREATE MERCHANT */ /* CREATE MERCHANT */

          <Route path="/become-a-member/:referral_id" element={< CreateAccount/>}/>/* CREATE MEMBER */ /* CREATE MEMBER */

          <Route path=":account_url/login" element={<LoginPage />} /> /* LOGIN ADMIN ACCOUNTS */ /* LOGIN ADMIN ACCOUNTS */

          <Route path="/login" element={<MemberLoginPage />} />


                {/* Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                    <Route path="/dashboard/*" element={<DashboardRoutes />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["LEADER"]} />}>
                    <Route path="/community/*" element={<CommunityRoutes />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["MERCHANT"]} />}>
                    <Route path="/merchant/*" element={<MerchantRoutes />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["MEMBER"]} />}>
                    <Route path="/member/*" element={<MemberRoutes />} />
                </Route>


                <Route element={<ProtectedRoute allowedRoles={["INVESTOR"]} />}>
                    <Route path="/investor/*" element={<InvestorRoutes />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["CUSTOMER_SUPPORT"]} />}>
                    <Route path="/customer-support/*" element={<CustomerSupportRoutes />} />
                </Route>


          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </Router>
      
    </>
  );
}

export default App;
