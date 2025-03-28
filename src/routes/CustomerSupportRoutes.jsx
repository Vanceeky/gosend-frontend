import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CsHome from '@/app/customer_support/Home'
import CustomerSupportPage from '@/app/customer_support/page'
import ErrorPage from "@/components/ErrorPage";

import MembersPage from '@/app/customer_support/Members';
import Member_Profile from '@/app/customer_support/Member_Profile';
import Community from "@/app/customer_support/Community";
import Community_details from "@/app/customer_support/Community_details";
import MerchantsPage from "@/app/customer_support/Merchants";
import Merchant_details from "@/app/customer_support/Merchant_details";
import ActivatedMembers from "@/app/customer_support/ActivatedMembers"
import InactiveMembers from "@/app/customer_support/InactiveMembers"

const CustomerSupportRoutes = () => {
  return (
    <Routes>

        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<CustomerSupportPage />}>
            <Route index element={<CsHome />} />
            <Route path="members/" element={<MembersPage />} />
            <Route path="member/:user_id" element={<Member_Profile />} />
            <Route path="activated-members/" element={<ActivatedMembers />} />
            <Route path="inactive-accounts/" element={<InactiveMembers />} />

            <Route path="merchants/" element={<MerchantsPage/>} />
            <Route path="merchants/:merchant_id" element={<Merchant_details />} />

            <Route path="community/" element={<Community />} />
            <Route path="community/:community_id/" element={<Community_details />} />

        </Route>
    </Routes>
  )
}

export default CustomerSupportRoutes
