// import { useLocation, useNavigate } from "react-router-dom";

// function FamilyCreatedPage() {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const family = location.state;

//     if (!family) {
//         navigate("/dashboard");
//         return null;
//     }

//     const copyInviteCode = async () => {
//         await navigator.clipboard.writeText(family.invite_code);
//         alert("Invite code copied!");
//     };

//     return (
//         <div
//             style={{
//                 maxWidth: "500px",
//                 margin: "60px auto",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "20px",
//             }}
//         >
//             <h1>🎉 Family Created!</h1>

//             <p>
//                 Your family has been created successfully.
//             </p>

//             <div
//                 style={{
//                     border: "1px solid #ddd",
//                     padding: "20px",
//                     borderRadius: "10px",
//                 }}
//             >
//                 <h3>Family Name</h3>

//                 <p>{family.name}</p>

//                 <h3>Invite Code</h3>

//                 <h2>{family.invite_code}</h2>

//                 <button onClick={copyInviteCode}>
//                     Copy Invite Code
//                 </button>
//             </div>

//             <p>
//                 Share this invite code with your family members so they can join
//                 your HealthCircle.
//             </p>

//             <button
//                 onClick={() => navigate("/dashboard")}
//             >
//                 Continue to Dashboard
//             </button>
//         </div>
//     );
// }

// export default FamilyCreatedPage;
import { useLocation, useNavigate } from "react-router-dom";
import { PartyPopper } from "lucide-react";

import "../../styles/family.css";
import PageShell from "../../components/layout/PageShell";
import GlassCard from "../../components/ui/GlassCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import InviteCodeBlock from "../../components/family/InviteCodeBlock";

export default function FamilyCreatedPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const family = location.state;

    if (!family) {
        navigate("/dashboard");
        return null;
    }

    return (
        <PageShell width="narrow">
            <GlassCard className="hc-celebrate">
                <div className="hc-celebrate-badge">
                    <PartyPopper size={26} />
                </div>

                <h1>Family created</h1>
                <p>
                    <b>{family.name}</b> is ready. Share your invite code so family members can join.
                </p>

                <div className="hc-celebrate-code">
                    <InviteCodeBlock code={family.invite_code} />
                </div>

                <p className="hc-celebrate-hint">
                    Anyone with this code can join {family.name} on HealthCircle.
                </p>

                <PrimaryButton block onClick={() => navigate("/dashboard")}>
                    Continue to dashboard
                </PrimaryButton>
            </GlassCard>
        </PageShell>
    );
}