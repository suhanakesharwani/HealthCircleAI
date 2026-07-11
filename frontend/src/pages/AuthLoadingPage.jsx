import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/user";

function AuthLoadingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUser() {
            try {
                const user = await getCurrentUser();

                if (user.has_family) {
                    navigate("/dashboard");
                } else {
                    navigate("/family/setup");
                }
            } catch {
                navigate("/login");
            }
        }

        checkUser();
    }, []);

    return <h2>Loading...</h2>;
}

export default AuthLoadingPage;