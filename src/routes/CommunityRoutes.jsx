import { Routes, Route } from "react-router-dom";
import CommunityPage from "@/app/community/page";
import CommunityHome from "@/app/community/dashboard";
import Members from "@/app/community/Members";

function CommunityRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CommunityPage />}>
                <Route index element={<CommunityHome />} />
                <Route path="members/" element={<Members />} />
            </Route>
        </Routes>
    );
}

export default CommunityRoutes