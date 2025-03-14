import { Routes, Route } from "react-router-dom";
import HomePage from "@/app/merchant/HomePage";
import Dashboard from "@/app/merchant/Dashboard";
import Rewards from "@/app/merchant/Rewards";
import Transactions from "@/app/merchant/Transactions";
import Profile from "@/app/merchant/Profile";
import ErrorPage from "@/components/ErrorPage";

function MerchantRoutes() {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />

            {/* HomePage now acts as the layout */}
            <Route path="/" element={<HomePage />}>
                <Route index element={<Dashboard />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="manage-profile" element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default MerchantRoutes;
