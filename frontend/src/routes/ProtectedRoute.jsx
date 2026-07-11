// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//     const isAuthenticated = document.cookie.includes("access_token");

//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                await getCurrentUser();
                setAuthenticated(true);
            } catch {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;