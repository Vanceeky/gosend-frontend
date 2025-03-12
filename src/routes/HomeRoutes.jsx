import { Routes, Route } from "react-router-dom";
import HomePage from "@/app/home/page";
import Index from "@/app/home/Index";
import AboutUs from "@/app/home/AboutUs";
import ContactUs from "@/app/home/ContactUs";
import Features from "@/app/home/Features";

import ErrorPage from "@/components/ErrorPage";

function HomeRoutes() {
    return (
        <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<HomePage />}>
                <Route index element={<Index />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="Features" element={<Features />} />
            </Route>
        </Routes>
    );
}

export default HomeRoutes;