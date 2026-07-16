// import { useNavigate } from "react-router-dom";

// import {
//     createFamily,
//     joinFamily,
// } from "../../api/family";

// import { useState } from "react";

// function FamilySetupPage() {
// //await for respective api's

//     const navigate=useNavigate();
//     const [familyName,setFamilyName]=useState("");
//     const [error,setError]=useState("");
//     const [inviteCode, setInviteCode] = useState("");
    
//     const handleCreate =async ()=>{
//         try{
//             const family=await createFamily({
//                 name:familyName
//             });

//             // navigate("/family/created", {
//             //     state: family,
//             // });

//             navigate("/complete-profile");
//         }
//         catch(err){
//             setError("Unable to Create Family");
//         }

//     }
//     const handleJoin = async ()=>{
//         try{
//             await joinFamily(inviteCode);
//             navigate("/complete-profile");

//         }
//         catch(err){
//             setError("Invalid Invite Code");
//         }

        
//     }

//     return (

//         <div
//             style={{
//                 width: "450px",
//                 margin: "50px auto",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "20px",
//             }}
//         >


//             <h1>Welcome to HealthCircle AI</h1>

//             <p>
//                 Create your own family or join an existing one.
//             </p>

//             <hr />

//             <h2>Create or Join Family</h2>
//             <hr/>

//             <h2>Create Family </h2>
//             <input 
//                 placeholder="Family Name"
//                 value={familyName}
//                 onChange={(e)=>
//                     setFamilyName(e.target.value)
//                 }
//             />
//             <button onClick={handleCreate}> Create Family </button>
//             <hr />
//             <h2>Join Family</h2>
//             <input 
//                 placeholder="Invite Code"
//                 value={inviteCode}
//                 onChange={(e)=>
//                     setInviteCode(e.target.value)
                
//                 }
//             />
//             <button onClick={handleJoin}> Join Family</button>

//             {error && (
//                 <p style={{ color: "red" }}>
//                     {error}
//                 </p>
//             )}
 
//         </div>

//     );

// }

// export default FamilySetupPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

import { createFamily, joinFamily } from "../../api/family";

import "../../styles/family.css";
import PageShell from "../../components/layout/PageShell";
import CreateFamilyForm from "../../components/family/CreateFamilyForm";
import JoinFamilyForm from "../../components/family/JoinFamilyForm";

export default function FamilySetupPage() {
    const navigate = useNavigate();

    const [familyName, setFamilyName] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [error, setError] = useState("");

    async function handleCreate() {
        try {
            const family = await createFamily({ name: familyName });
            navigate("/dashboard", { state: family });
        } catch(err){
            if (
                err.response?.status === 400 &&
                err.response?.data?.[0] === "You are already part of a family."
            ) {
                navigate("/dashboard");
            } else {
                console.error(err.response?.data);
            }
        }
    }

    async function handleJoin() {
        try {
            await joinFamily(inviteCode);
            navigate("/complete-profile");
        } catch {
            setError("Invalid invite code.");
        }
    }

    return (
        <PageShell width="medium">
            <span className="hc-eyebrow">
                <Sparkles size={13} /> Get started
            </span>

            <div className="hc-section-head" style={{ marginTop: 0 }}>
                <h2>Welcome to HealthCircle AI</h2>
                <p>Create your own family or join an existing one with an invite code.</p>
            </div>

            <div className="hc-setup-grid">
                <CreateFamilyForm familyName={familyName} onChange={setFamilyName} onSubmit={handleCreate} />
                <JoinFamilyForm inviteCode={inviteCode} onChange={setInviteCode} onSubmit={handleJoin} />
            </div>

            {error && <p className="hc-error-text" style={{ marginTop: 20 }}>{error}</p>}
        </PageShell>
    );
}