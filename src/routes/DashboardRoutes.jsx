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

import Accounts from "@/app/dashboard/Accounts";

import Hub from "@/app/dashboard/hub/Hub";
import Hub_profile from "@/app/dashboard/hub/Hub_profile";

import Rewards from "@/app/dashboard/Rewards";

import ErrorPage from "@/components/ErrorPage";
import ActivationHistory from "@/app/dashboard/ActivationHistory";


function DashboardRoutes() {
  return (
    <Routes>
      
        <Route path="*" element={<ErrorPage />} />

        <Route path="/" element={<AdminDashboardPage />}>
        
        <Route index element={<DashboardHome />} /> {/* 👈 Default Route */}

        <Route path="activated-members" element={<ActivatedMembers />} />
        <Route path="inactive-accounts" element={<InactiveAccounts />} />

        <Route path="merchants" element={<Merchants />} />
        <Route path="merchants/:merchant_id" element={<MerchantProfile />} />


        <Route path="motherwallet" element={<Motherwallet />} />

        <Route path="community" element={<Community />} />
        <Route path="community/:community_id/" element={<CommunityDetails />} />


        <Route path="members" element={<Members/>} />
        <Route path="member/:user_id" element={<UserProfile/>} />

        <Route path="hub" element={<Hub/>} />
        <Route path="hub/:hub_id" element={<Hub_profile/>} />

        <Route path="/rewards" element={<Rewards/>} />        
        <Route path="/activation-history" element={<ActivationHistory/>} />

        <Route path="accounts" element={<Accounts/>} />
        
      </Route>
    </Routes>
  );
}

export default DashboardRoutes;
