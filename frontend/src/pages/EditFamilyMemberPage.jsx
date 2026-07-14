import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getFamilyMember,
    updateFamilyMember,
} from "../api/member";

function EditFamilyMemberPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

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

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const member =
                await getFamilyMember(id);

            setFormData({

                name: member.name || "",

                relation: member.relation || "",

                gender: member.gender || "",

                date_of_birth:
                    member.date_of_birth || "",

                blood_group:
                    member.blood_group || "",

                allergies:
                    (member.allergies || []).join(", "),

                medical_conditions:
                    (
                        member.medical_conditions || []
                    ).join(", "),

                notes:
                    member.notes || "",

            });

        }

        catch (err) {

            console.log(err);

            alert("Unable to load profile.");

        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await updateFamilyMember(

                id,

                {

                    ...formData,

                    allergies:

                        formData.allergies
                            .split(",")

                            .map(x => x.trim())

                            .filter(Boolean),

                    medical_conditions:

                        formData.medical_conditions
                            .split(",")

                            .map(x => x.trim())

                            .filter(Boolean),

                }

            );

            alert("Profile updated successfully.");

            // navigate(`/family-members/${id}`); chnaged
            
            navigate(`/members/${id}`);

        }

        catch (err) {

            console.log(err);

            alert("Unable to update profile.");

        }

    }

    if (loading)

        return <h2>Loading...</h2>;

    return (

        <div
            style={{
                width: 550,
                margin: "40px auto",
            }}
        >

            <h1>

                Edit Health Profile

            </h1>

            <form

                onSubmit={handleSubmit}

                style={{

                    display: "flex",

                    flexDirection: "column",

                    gap: 15,

                }}

            >

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

                    <option value="">

                        Select Gender

                    </option>

                    <option value="Male">

                        Male

                    </option>

                    <option value="Female">

                        Female

                    </option>

                    <option value="Other">

                        Other

                    </option>

                </select>

                <input

                    name="blood_group"

                    value={formData.blood_group}

                    onChange={handleChange}

                    placeholder="Blood Group"

                />

                <input

                    name="medical_conditions"

                    value={
                        formData.medical_conditions
                    }

                    onChange={handleChange}

                    placeholder="Medical Conditions (comma separated)"

                />

                <input

                    name="allergies"

                    value={formData.allergies}

                    onChange={handleChange}

                    placeholder="Allergies (comma separated)"

                />

                <textarea

                    rows={5}

                    name="notes"

                    value={formData.notes}

                    onChange={handleChange}

                    placeholder="Notes"

                />

                <button>

                    Save Changes

                </button>

            </form>

        </div>

    );

}

export default EditFamilyMemberPage;