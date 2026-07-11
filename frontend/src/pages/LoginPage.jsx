import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { getCurrentUser } from "../api/user";

function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
           await login(formData);

            const user = await getCurrentUser();

            if(user.has_family){

                navigate("/dashboard");

            }
            else{

                navigate("/family/setup");

            }
        } catch (err) {
            console.log(err);

            if (err.response) {
                setError(JSON.stringify(err.response.data));
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "80px",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    width: "350px",
                }}
            >
                <h1>Login</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}
            </form>
        </div>
    );
}

export default LoginPage;