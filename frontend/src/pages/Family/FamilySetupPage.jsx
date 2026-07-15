import { useNavigate } from "react-router-dom";

import {
    createFamily,
    joinFamily,
} from "../../api/family";

import { useState } from "react";

function FamilySetupPage() {
//await for respective api's

    const navigate=useNavigate();
    const [familyName,setFamilyName]=useState("");
    const [error,setError]=useState("");
    const [inviteCode, setInviteCode] = useState("");
    
    const handleCreate =async ()=>{
        try{
            const family=await createFamily({
                name:familyName
            });

            // navigate("/family/created", {
            //     state: family,
            // });

            navigate("/complete-profile");
        }
        catch(err){
            setError("Unable to Create Family");
        }

    }
    const handleJoin = async ()=>{
        try{
            await joinFamily(inviteCode);
            navigate("/complete-profile");

        }
        catch(err){
            setError("Invalid Invite Code");
        }

        
    }

    return (

        <div
            style={{
                width: "450px",
                margin: "50px auto",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >


            <h1>Welcome to HealthCircle AI</h1>

            <p>
                Create your own family or join an existing one.
            </p>

            <hr />

            <h2>Create or Join Family</h2>
            <hr/>

            <h2>Create Family </h2>
            <input 
                placeholder="Family Name"
                value={familyName}
                onChange={(e)=>
                    setFamilyName(e.target.value)
                }
            />
            <button onClick={handleCreate}> Create Family </button>
            <hr />
            <h2>Join Family</h2>
            <input 
                placeholder="Invite Code"
                value={inviteCode}
                onChange={(e)=>
                    setInviteCode(e.target.value)
                
                }
            />
            <button onClick={handleJoin}> Join Family</button>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}
 
        </div>

    );

}

export default FamilySetupPage;