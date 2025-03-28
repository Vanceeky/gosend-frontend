import { Navigate, Outlet, useLocation } from "react-router-dom";
import ErrorPage from "./ErrorPage";
const ProtectedRoute = ({ allowedRoles }) => {
    const accessToken = localStorage.getItem("access_token");
    const userRole = localStorage.getItem("account_type"); // Store role in localStorage upon login
    const location = useLocation();

    if (!accessToken) {
        // Redirect to login if no token
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <ErrorPage />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
