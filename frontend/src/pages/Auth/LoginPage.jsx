import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { getCurrentUser } from "../../api/user";
import "../../styles/loginandregister.css";

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

            if (user.has_family) {
                navigate("/dashboard");
            } else {
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
        <div className="auth-page">
            <div className="hc-blob hc-blob-a" />
            <div className="hc-blob hc-blob-b" />
            <div className="hc-blob hc-blob-c" />

            <div className="auth-card">
                <span className="auth-eyebrow">Welcome Back</span>
                <h1 className="auth-title">Log in</h1>
                <p className="auth-subtitle">
                    Pick up right where you and your family left off.
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="saumya@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="auth-input"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="auth-input"
                            required
                        />
                    </div>

                    <button disabled={loading} className="auth-submit">
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {error && <p className="auth-error">{error}</p>}
                </form>

                <div className="auth-switch-row">
                    <p className="auth-switch-text">New to HealthCircle AI?</p>
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="auth-switch-btn"
                    >
                        Register instead
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;