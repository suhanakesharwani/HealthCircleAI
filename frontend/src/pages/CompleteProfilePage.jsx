import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../api/auth";
import { createFamilyMember } from "../api/member";

function CompleteProfilePage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        relation: "",
        gender: "",
        date_of_birth: "",
        blood_group: "",
        allergies: "",
        medical_conditions: "",
        notes: "",

    });

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const user = await getCurrentUser();

            console.log("Current user:", user);

            const response = await createFamilyMember(
                user.family.id,
                {
                    ...formData,
                    allergies: formData.allergies
                        .split(",")
                        .map(x => x.trim())
                        .filter(Boolean),

                    medical_conditions: formData.medical_conditions
                        .split(",")
                        .map(x => x.trim())
                        .filter(Boolean),
                }
            );

            console.log("Profile created:", response);

            navigate("/dashboard");

        } catch (err) {
            console.log(err);
            console.log(err.response);
            console.log(err.response?.data);

            alert(JSON.stringify(err.response?.data));
        }
    }

    return (

        <form

            onSubmit={handleSubmit}

            style={{

                width: 500,

                margin: "40px auto",

                display: "flex",

                flexDirection: "column",

                gap: 15,

            }}

        >

            <h1>

                Complete Your Health Profile

            </h1>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

            <input
                name="relation"
                placeholder="Relation"
                onChange={handleChange}
            />

            <input
                type="date"
                name="date_of_birth"
                onChange={handleChange}
            />

            <select
                name="gender"
                onChange={handleChange}
            >

                <option value="">Gender</option>

                <option>Male</option>

                <option>Female</option>

                <option>Other</option>

            </select>

            <input
                name="blood_group"
                placeholder="Blood Group"
                onChange={handleChange}
            />

            <input
                name="medical_conditions"
                placeholder="Medical Conditions"
                onChange={handleChange}
            />

            <input
                name="allergies"
                placeholder="Allergies"
                onChange={handleChange}
            />

            <textarea
                name="notes"
                placeholder="Notes"
                onChange={handleChange}
            />

            <button>

                Save Profile

            </button>

        </form>

    );

}

export default CompleteProfilePage;