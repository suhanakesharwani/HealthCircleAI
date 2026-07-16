// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//     getFamilyMember,
//     updateFamilyMember,
// } from "../../api/member";

// function EditFamilyMemberPage() {

//     const { id } = useParams();

//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);

//     const [formData, setFormData] = useState({
//         name: "",
//         relation: "",
//         gender: "",
//         date_of_birth: "",
//         blood_group: "",
//         allergies: "",
//         medical_conditions: "",
//         notes: "",
//     });

//     useEffect(() => {

//         loadProfile();

//     }, []);

//     async function loadProfile() {

//         try {

//             const member =
//                 await getFamilyMember(id);

//             setFormData({

//                 name: member.name || "",

//                 relation: member.relation || "",

//                 gender: member.gender || "",

//                 date_of_birth:
//                     member.date_of_birth || "",

//                 blood_group:
//                     member.blood_group || "",

//                 allergies:
//                     (member.allergies || []).join(", "),

//                 medical_conditions:
//                     (
//                         member.medical_conditions || []
//                     ).join(", "),

//                 notes:
//                     member.notes || "",

//             });

//         }

//         catch (err) {

//             console.log(err);

//             alert("Unable to load profile.");

//         }

//         finally {

//             setLoading(false);

//         }

//     }

//     function handleChange(e) {

//         setFormData({

//             ...formData,

//             [e.target.name]:
//                 e.target.value,

//         });

//     }

//     async function handleSubmit(e) {

//         e.preventDefault();

//         try {

//             await updateFamilyMember(

//                 id,

//                 {

//                     ...formData,

//                     allergies:

//                         formData.allergies
//                             .split(",")

//                             .map(x => x.trim())

//                             .filter(Boolean),

//                     medical_conditions:

//                         formData.medical_conditions
//                             .split(",")

//                             .map(x => x.trim())

//                             .filter(Boolean),

//                 }

//             );

//             alert("Profile updated successfully.");

//             // navigate(`/family-members/${id}`); chnaged
            
//             navigate(`/members/${id}`);

//         }

//         catch (err) {

//             console.log(err);

//             alert("Unable to update profile.");

//         }

//     }

//     if (loading)

//         return <h2>Loading...</h2>;

//     return (

//         <div
//             style={{
//                 width: 550,
//                 margin: "40px auto",
//             }}
//         >

//             <h1>

//                 Edit Health Profile

//             </h1>

//             <form

//                 onSubmit={handleSubmit}

//                 style={{

//                     display: "flex",

//                     flexDirection: "column",

//                     gap: 15,

//                 }}

//             >

//                 <input

//                     name="name"

//                     value={formData.name}

//                     onChange={handleChange}

//                     placeholder="Name"

//                 />

//                 <input

//                     name="relation"

//                     value={formData.relation}

//                     onChange={handleChange}

//                     placeholder="Relation"

//                 />

//                 <input

//                     type="date"

//                     name="date_of_birth"

//                     value={formData.date_of_birth}

//                     onChange={handleChange}

//                 />

//                 <select

//                     name="gender"

//                     value={formData.gender}

//                     onChange={handleChange}

//                 >

//                     <option value="">

//                         Select Gender

//                     </option>

//                     <option value="Male">

//                         Male

//                     </option>

//                     <option value="Female">

//                         Female

//                     </option>

//                     <option value="Other">

//                         Other

//                     </option>

//                 </select>

//                 <input

//                     name="blood_group"

//                     value={formData.blood_group}

//                     onChange={handleChange}

//                     placeholder="Blood Group"

//                 />

//                 <input

//                     name="medical_conditions"

//                     value={
//                         formData.medical_conditions
//                     }

//                     onChange={handleChange}

//                     placeholder="Medical Conditions (comma separated)"

//                 />

//                 <input

//                     name="allergies"

//                     value={formData.allergies}

//                     onChange={handleChange}

//                     placeholder="Allergies (comma separated)"

//                 />

//                 <textarea

//                     rows={5}

//                     name="notes"

//                     value={formData.notes}

//                     onChange={handleChange}

//                     placeholder="Notes"

//                 />

//                 <button>

//                     Save Changes

//                 </button>

//             </form>

//         </div>

//     );

// }

// export default EditFamilyMemberPage;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save } from "lucide-react";

import { getFamilyMember, updateFamilyMember } from "../../api/member";

import PageShell from "../../components/layout/PageShell";
import BackLink from "../../components/ui/BackLink";
import GlassCard from "../../components/ui/GlassCard";
import TextField from "../../components/ui/TextField";
import SelectField from "../../components/ui/SelectField";
import TextAreaField from "../../components/ui/TextAreaField";
import PrimaryButton from "../../components/ui/PrimaryButton";

function EditFamilyMemberPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState(null);

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
            const member = await getFamilyMember(id);

            setFormData({
                name: member.name || "",
                relation: member.relation || "",
                gender: member.gender || "",
                date_of_birth: member.date_of_birth || "",
                blood_group: member.blood_group || "",
                allergies: (member.allergies || []).join(", "),
                medical_conditions: (member.medical_conditions || []).join(", "),
                notes: member.notes || "",
            });
        } catch (err) {
            console.log(err);
            setStatus({ type: "error", text: "Unable to load profile." });
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setStatus(null);

        try {
            await updateFamilyMember(id, {
                ...formData,
                allergies: formData.allergies.split(",").map((x) => x.trim()).filter(Boolean),
                medical_conditions: formData.medical_conditions.split(",").map((x) => x.trim()).filter(Boolean),
            });

            navigate(`/members/${id}`);
        } catch (err) {
            console.log(err);
            setStatus({ type: "error", text: "Unable to update profile." });
        } finally {
            setSaving(false);
        }
    }

    return (
        <PageShell width="narrow" isLoading={loading} loadingLabel="Loading profile…">
            <BackLink to={`/members/${id}`}>Profile</BackLink>

            <div className="hc-section-head" style={{ marginTop: 0 }}>
                <h2>Edit health profile</h2>
                <p>Keep this family member's details accurate and up to date.</p>
            </div>

            <GlassCard style={{ padding: 34 }}>
                <form onSubmit={handleSubmit}>
                    <div className="hc-form-grid">
                        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" />
                        <TextField label="Relation" name="relation" value={formData.relation} onChange={handleChange} placeholder="e.g. Mother, Son" />

                        <TextField
                            label="Date of birth"
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                        />

                        <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </SelectField>

                        <TextField
                            label="Blood group"
                            name="blood_group"
                            value={formData.blood_group}
                            onChange={handleChange}
                            placeholder="e.g. O+"
                        />

                        <div />

                        <div className="hc-form-grid--full">
                            <TextField
                                label="Medical conditions"
                                name="medical_conditions"
                                value={formData.medical_conditions}
                                onChange={handleChange}
                                placeholder="e.g. Diabetes, Hypertension"
                            />
                            <p className="hc-field-hint">Comma separated</p>
                        </div>

                        <div className="hc-form-grid--full">
                            <TextField
                                label="Allergies"
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleChange}
                                placeholder="e.g. Penicillin, Peanuts"
                            />
                            <p className="hc-field-hint">Comma separated</p>
                        </div>

                        <div className="hc-form-grid--full">
                            <TextAreaField
                                label="Notes"
                                rows={5}
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Anything else worth noting"
                            />
                        </div>
                    </div>

                    {status && <p className="hc-error-text" style={{ marginTop: 16 }}>{status.text}</p>}

                    <div style={{ marginTop: 26 }}>
                        <PrimaryButton icon={Save} type="submit" disabled={saving}>
                            {saving ? "Saving…" : "Save changes"}
                        </PrimaryButton>
                    </div>
                </form>
            </GlassCard>
        </PageShell>
    );
}

export default EditFamilyMemberPage;