import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "@/app/dashboard/page";
import ActivatedMembers from "@/app/dashboard/members/ActivatedMembers";
import InactiveAccounts from "@/app/dashboard/members/InactiveAccounts";
import Merchants from "@/app/dashboard/merchant/merchants";
import Motherwallet from "@/app/dashboard/motherwallet/Motherwallet";
import Community from "@/app/dashboard/community/Community";
import Members from "@/app/dashboard/Members";
import UserProfile from "@/app/dashboard/members/UserProfile";

import DashboardHome from "@/app/dashboard/Home";
import CommunityDetails from "@/app/dashboard/community/CommunityDetails";
import MerchantProfile from "@/app/dashboard/merchant/MerchantProfile";

import ErrorPage from "@/components/ErrorPage";


function DashboardRoutes() {
  return (
    <Routes>
      
        <Route path="*" element={<ErrorPage />} />

        <Route path="/" element={<AdminDashboardPage />}>
        
        <Route index element={<DashboardHome />} /> {/* 👈 Default Route */}

        <Route path="activated-members" element={<ActivatedMembers />} />
        <Route path="inactive-accounts" element={<InactiveAccounts />} />

        <Route path="merchants" element={<Merchants />} />
        <Route path="merchant/:merchant_id" element={<MerchantProfile />} />


        <Route path="motherwallet" element={<Motherwallet />} />

        <Route path="community" element={<Community />} />
        <Route path="community/:community_id/" element={<CommunityDetails />} />


        <Route path="members" element={<Members/>} />
        <Route path="member/:user_id" element={<UserProfile/>} />
        
      </Route>
    </Routes>
  );
}

export default DashboardRoutes;
