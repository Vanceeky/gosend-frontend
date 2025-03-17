import { Routes, Route } from "react-router-dom";
import HomePage from "@/app/members/HomePage";
import Dashboard from "@/app/members/dashboard";
import Profile from "@/app/members/Profile";

function CommunityRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}>
                <Route index element={<Dashboard />} />
                <Route path="profile/" element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default CommunityRoutes