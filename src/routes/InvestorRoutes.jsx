import { Routes, Route } from "react-router-dom";
import InvestorPage from "@/app/investor/page";
import Community from "@/app/investor/Community";
import Members from "@/app/investor/Members";
import Rewards from "@/app/investor/Rewards";
import Home from "@/app/investor/Home";
import MerchantsPage from "@/app/investor/Merchants";

import Member_Profile from "@/app/investor/Member_Profile";
import Community_details from "@/app/investor/Community_details";
import Merchant_details from "@/app/investor/Merchant_details";


import ActivatedMembers from "@/app/investor/ActivatedMembers";
import InactiveMembers from "@/app/investor/InactiveMembers";


import ActivationHistory from "@/app/investor/ActivationHistory";

import ErrorPage from "@/components/ErrorPage";


function InvestorRoutes() {
    return (
        <Routes>

            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<InvestorPage />}>
                <Route index element={<Home />} />
                <Route path="members/" element={<Members />} />
                <Route path="member/:user_id" element={<Member_Profile />} />

                <Route path="/activated-members" element={< ActivatedMembers/>}/>
                <Route path="/inactive-accounts" element={< InactiveMembers/>}/>

                

                <Route path="community/" element={<Community />} />
                <Route path="community/:community_id/" element={<Community_details />} />

                <Route path="rewards/" element={<Rewards />} />
                <Route path="activation-history/" element={<ActivationHistory/>} />

                <Route path="merchants/" element={<MerchantsPage/>} />
                <Route path="merchants/:merchant_id" element={<Merchant_details />} />

            </Route>
        </Routes>
    );
}

export default InvestorRoutes