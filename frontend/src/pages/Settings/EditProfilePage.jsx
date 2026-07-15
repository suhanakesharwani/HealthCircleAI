import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../../api/auth";
import {
    getFamilyMembers,
    updateFamilyMember,
} from "../../api/member";

function EditProfilePage() {

    const navigate = useNavigate();

    const [memberId, setMemberId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        relation: "",
        date_of_birth: "",
        gender: "",
        blood_group: "",
        medical_conditions: "",
        allergies: "",
        notes: "",
    });

    useEffect(() => {

        async function load() {

            const user =
                await getCurrentUser();

            const members =
                await getFamilyMembers(
                    user.family.id
                );

            const myProfile =
                members.find(
                    m => m.linked_user === user.id
                );

            if (!myProfile) {
                alert("Please complete your profile first.");
                navigate("/complete-profile");
                return;
            }

            setMemberId(myProfile.id);

            setFormData({
                name: myProfile.name || "",
                relation: myProfile.relation || "",
                date_of_birth: myProfile.date_of_birth || "",
                gender: myProfile.gender || "",
                blood_group: myProfile.blood_group || "",
                medical_conditions:
                    (myProfile.medical_conditions || []).join(", "),
                allergies:
                    (myProfile.allergies || []).join(", "),
                notes: myProfile.notes || "",
            });

        }

        load();

    }, []);

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        await updateFamilyMember(
            memberId,
            {
                ...formData,
                medical_conditions:
                    formData.medical_conditions
                        .split(",")
                        .map(i => i.trim())
                        .filter(Boolean),

                allergies:
                    formData.allergies
                        .split(",")
                        .map(i => i.trim())
                        .filter(Boolean),
            }
        );

        alert("Profile updated!");

        navigate("/dashboard");

    }

    if (!memberId)
        return <h2>Loading...</h2>;

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

            <h1>Edit Health Profile</h1>

            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />

            <input
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                placeholder="Relation"
            />

            <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
            />

            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            <input
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                placeholder="Blood Group"
            />

            <input
                name="medical_conditions"
                value={formData.medical_conditions}
                onChange={handleChange}
                placeholder="Diabetes, Hypertension"
            />

            <input
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="Penicillin"
            />

            <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes"
            />

            <button type="submit">
                Save Changes
            </button>

        </form>

    );

}

export default EditProfilePage;