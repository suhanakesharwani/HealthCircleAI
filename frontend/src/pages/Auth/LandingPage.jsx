import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "40px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    textAlign: "center",
                }}
            >
                <h1>FamilyCircleAI</h1>

                <p>Manage your family's health with ease.</p>

                <div
                    style={{
                        marginTop: "20px",
                        display: "flex",
                        gap: "15px",
                        justifyContent: "center",
                    }}
                >
                    <Link to="/register">
                        <button>Register</button>
                    </Link>

                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;