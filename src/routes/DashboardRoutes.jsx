import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "@/app/dashboard/page";
import ActivatedMembers from "@/app/dashboard/members/ActivatedMembers";
import InactiveAccounts from "@/app/dashboard/members/InactiveAccounts";
import Merchants from "@/app/dashboard/merchant/merchants";
import Motherwallet from "@/app/dashboard/motherwallet/Motherwallet";
import Community from "@/app/dashboard/community/Community";

import DashboardHome from "@/app/dashboard/Home";

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboardPage />}>
      <Route index element={<DashboardHome />} /> {/* 👈 Default Route */}
        <Route path="activated-members" element={<ActivatedMembers />} />
        <Route path="inactive-accounts" element={<InactiveAccounts />} />

        <Route path="merchants" element={<Merchants />} />
        <Route path="motherwallet" element={<Motherwallet />} />
        <Route path="community" element={<Community />} />
      </Route>
    </Routes>
  );
}

export default DashboardRoutes;
