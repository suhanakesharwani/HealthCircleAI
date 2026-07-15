import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../../api/auth";

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
                    width: "350px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <h1>Register</h1>

                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />

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
                    {loading ? "Registering..." : "Register"}
                </button>

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}

export default RegisterPage;