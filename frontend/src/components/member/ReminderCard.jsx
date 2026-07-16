// function ReminderCard() {

//     return (

//         <div
//             style={{
//                 background: "#fff6da",
//                 padding: 20,
//                 borderRadius: 12,
//                 marginBottom: 30,
//             }}
//         >

//             <h3>

//                 ⚠ Needs Attention

//             </h3>

//             <ul>

//                 <li>

//                     Missed medicines 2 times

//                 </li>

//                 <li>

//                     Missed Morning Walk today

//                 </li>

//                 <li>

//                     Latest CBC shows LOW Hemoglobin

//                 </li>

//             </ul>

//             <button>

//                 Send Reminder

//             </button>

//         </div>

//     );

// }

// export default ReminderCard;

import { AlertTriangle, BellRing } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import PrimaryButton from "../ui/PrimaryButton";

function ReminderCard() {
    return (
        <GlassCard className="hc-attention">
            <div className="hc-attention-glow" />

            <div className="hc-attention-head">
                <AlertTriangle size={17} color="var(--hc-peach-deep)" />
                Needs attention
            </div>

            <ul className="hc-attention-list">
                <li>Missed medicines 2 times</li>
                <li>Missed morning walk today</li>
                <li>Latest CBC shows low hemoglobin</li>
            </ul>

            <PrimaryButton icon={BellRing}  onClick={() => alert("🚧 Coming soon! Reminder functionality is under development.")}>Send reminder</PrimaryButton>
        </GlassCard>
    );
}

export default ReminderCard;