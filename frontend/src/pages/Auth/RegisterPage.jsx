import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../../api/auth";
import "../../styles/loginandregister.css";

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
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
            await register(formData);

            alert("Registration Successful!");

            navigate("/login");
        } catch (err) {
            console.log("Response:", err.response);
            console.log("Data:", err.response?.data);

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
                <span className="auth-eyebrow">Get Started</span>
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">
                    Join HealthCircle AI to start tracking your family's health together.
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="full_name">Full Name</label>
                        <input
                            id="full_name"
                            type="text"
                            name="full_name"
                            placeholder="Saumya Sharma"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="auth-input"
                            required
                        />
                    </div>

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
                        {loading ? "Registering..." : "Register"}
                    </button>

                    {error && <p className="auth-error">{error}</p>}
                </form>

                <div className="auth-switch-row">
                    <p className="auth-switch-text">Already have an account?</p>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="auth-switch-btn"
                    >
                        Login instead
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;