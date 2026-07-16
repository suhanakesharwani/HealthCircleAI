// function StatusCard({ title, value, color }) {

//     return (

//         <div
//             style={{
//                 flex: 1,
//                 background: color,
//                 padding: 20,
//                 borderRadius: 12,
//             }}
//         >

//             <h4>{title}</h4>

//             <h2>{value}</h2>

//         </div>

//     );

// }

// function HealthStatusCard() {

//     return (

//         <div
//             style={{
//                 display: "flex",
//                 gap: 20,
//                 marginBottom: 30,
//             }}
//         >

//             <StatusCard
//                 title="Missed Medicines"
//                 value="2"
//                 color="#fff4d6"
//             />

//             <StatusCard
//                 title="Missed Habits"
//                 value="1"
//                 color="#e8f8ff"
//             />

//             <StatusCard
//                 title="Critical Reports"
//                 value="1"
//                 color="#ffe6e6"
//             />

//             <StatusCard
//                 title="Latest Report"
//                 value="CBC"
//                 color="#e8ffe9"
//             />

//         </div>

//     );

// }

// export default HealthStatusCard;

import { Pill, Activity, AlertTriangle, FileText } from "lucide-react";
import StatTile from "./StatTile";

function HealthStatusCard() {
    return (
        <div className="hc-stat-grid">
            <StatTile icon={Pill} title="Missed medicines" value="2" tone="peach" />
            <StatTile icon={Activity} title="Missed habits" value="1" tone="blue" />
            <StatTile icon={AlertTriangle} title="Critical reports" value="1" tone="lavender" />
            <StatTile icon={FileText} title="Latest report" value="CBC" tone="mint" />
        </div>
    );
}

export default HealthStatusCard;