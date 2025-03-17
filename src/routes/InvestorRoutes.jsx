import { Routes, Route } from "react-router-dom";
import InvestorPage from "@/app/investor/page";
import Community from "@/app/investor/Community";
import Members from "@/app/investor/Members";
import Rewards from "@/app/investor/Rewards";
import Home from "@/app/investor/Home";

function InvestorRoutes() {
    return (
        <Routes>
            <Route path="/" element={<InvestorPage />}>
                <Route index element={<Home />} />
                <Route path="members/" element={<Members />} />
                <Route path="community/" element={<Community />} />
                <Route path="rewards/" element={<Rewards />} />
            </Route>
        </Routes>
    );
}

export default InvestorRoutes