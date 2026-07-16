// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { getCurrentUser } from "../../api/auth";
// import {
//     getFamilyMembers,
//     updateFamilyMember,
// } from "../../api/member";

// function EditProfilePage() {

//     const navigate = useNavigate();

//     const [memberId, setMemberId] = useState(null);

//     const [formData, setFormData] = useState({
//         name: "",
//         relation: "",
//         date_of_birth: "",
//         gender: "",
//         blood_group: "",
//         medical_conditions: "",
//         allergies: "",
//         notes: "",
//     });

//     useEffect(() => {

//         async function load() {

//             const user =
//                 await getCurrentUser();

//             const members =
//                 await getFamilyMembers(
//                     user.family.id
//                 );

//             const myProfile = members.find(
//                 m => m.linked_user?.id === user.id
//             );

//             if (!myProfile) {
//                 alert("Please complete your profile first.");
//                 navigate("/complete-profile");
//                 return;
//             }

//             setMemberId(myProfile.id);

//             setFormData({
//                 name: myProfile.name || "",
//                 relation: myProfile.relation || "",
//                 date_of_birth: myProfile.date_of_birth || "",
//                 gender: myProfile.gender || "",
//                 blood_group: myProfile.blood_group || "",
//                 medical_conditions:
//                     (myProfile.medical_conditions || []).join(", "),
//                 allergies:
//                     (myProfile.allergies || []).join(", "),
//                 notes: myProfile.notes || "",
//             });

//         }

//         load();

//     }, []);

//     function handleChange(e) {

//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });

//     }

//     async function handleSubmit(e) {

//         e.preventDefault();

//         await updateFamilyMember(
//             memberId,
//             {
//                 ...formData,
//                 medical_conditions:
//                     formData.medical_conditions
//                         .split(",")
//                         .map(i => i.trim())
//                         .filter(Boolean),

//                 allergies:
//                     formData.allergies
//                         .split(",")
//                         .map(i => i.trim())
//                         .filter(Boolean),
//             }
//         );

//         alert("Profile updated!");

//         navigate("/dashboard");

//     }

//     if (!memberId)
//         return <h2>Loading...</h2>;

//     return (

//         <form
//             onSubmit={handleSubmit}
//             style={{
//                 width: 500,
//                 margin: "40px auto",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 15,
//             }}
//         >

//             <h1>Edit Health Profile</h1>

//             <input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Name"
//             />

//             <input
//                 name="relation"
//                 value={formData.relation}
//                 onChange={handleChange}
//                 placeholder="Relation"
//             />

//             <input
//                 type="date"
//                 name="date_of_birth"
//                 value={formData.date_of_birth}
//                 onChange={handleChange}
//             />

//             <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//             >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//             </select>

//             <input
//                 name="blood_group"
//                 value={formData.blood_group}
//                 onChange={handleChange}
//                 placeholder="Blood Group"
//             />

//             <input
//                 name="medical_conditions"
//                 value={formData.medical_conditions}
//                 onChange={handleChange}
//                 placeholder="Diabetes, Hypertension"
//             />

//             <input
//                 name="allergies"
//                 value={formData.allergies}
//                 onChange={handleChange}
//                 placeholder="Penicillin"
//             />

//             <textarea
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 placeholder="Notes"
//             />

//             <button type="submit">
//                 Save Changes
//             </button>

//         </form>

//     );

// }

// export default EditProfilePage;


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

            const myProfile = members.find(
                m => m.linked_user?.id === user.id
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

    if (!memberId) {
        return <div className="hc-loading">Loading...</div>;
    }

    return (
        <div className="hc-page">
            <div className="hc-blob hc-blob-a" />
            <div className="hc-blob hc-blob-b" />
            <div className="hc-blob hc-blob-c" />

            <div className="hc-shell hc-shell--medium">
                <a
                    href="/dashboard"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/dashboard");
                    }}
                    className="hc-back"
                >
                    ← Back to Dashboard
                </a>

                <span className="hc-eyebrow">Health Profile</span>

                <form onSubmit={handleSubmit} className="hc-glass" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <h1 className="display" style={{ fontSize: "28px", margin: 0 }}>
                        Edit Health Profile
                    </h1>

                    <div className="hc-field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="hc-input"
                        />
                    </div>

                    <div className="hc-field">
                        <label htmlFor="relation">Relation</label>
                        <input
                            id="relation"
                            name="relation"
                            value={formData.relation}
                            onChange={handleChange}
                            placeholder="Relation"
                            className="hc-input"
                        />
                    </div>

                    <div className="hc-field">
                        <label htmlFor="date_of_birth">Date of Birth</label>
                        <input
                            id="date_of_birth"
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="hc-input"
                        />
                    </div>

                    <div className="hc-field">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="hc-select"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="hc-field">
                        <label htmlFor="blood_group">Blood Group</label>
                        <input
                            id="blood_group"
                            name="blood_group"
                            value={formData.blood_group}
                            onChange={handleChange}
                            placeholder="Blood Group"
                            className="hc-input"
                        />
                    </div>

                    <div className="hc-field">
                        <label htmlFor="medical_conditions">Medical Conditions</label>
                        <input
                            id="medical_conditions"
                            name="medical_conditions"
                            value={formData.medical_conditions}
                            onChange={handleChange}
                            placeholder="Diabetes, Hypertension"
                            className="hc-input"
                        />
                    </div>

                    <div className="hc-field">
                        <label htmlFor="allergies">Allergies</label>
                        <input
                            id="allergies"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            placeholder="Penicillin"
                            className="hc-input"
                        />
                    </div>

                    <div className="hc-field">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Notes"
                            className="hc-input"
                            rows={4}
                            style={{ resize: "vertical", fontFamily: "inherit" }}
                        />
                    </div>

                    <button type="submit" className="hc-cta hc-cta--block">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePage;