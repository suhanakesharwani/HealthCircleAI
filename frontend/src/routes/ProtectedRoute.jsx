import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isAuthenticated = document.cookie.includes("access_token");

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;