// import { useState } from "react";

// import OverviewTab from "./tabs/OverviewTab";
// import ReportsTab from "./tabs/ReportsTab";
// import MedicinesTab from "./tabs/MedicinesTab";
// import HabitsTab from "./tabs/HabitsTab";

// function MemberTabs(props) {

//     const [tab, setTab] = useState("overview");

//     return (

//         <>

//             <div
//                 style={{
//                     display: "flex",
//                     gap: 15,
//                     marginBottom: 25,
//                 }}
//             >

//                 <button onClick={() => setTab("overview")}>

//                     Overview

//                 </button>

//                 <button onClick={() => setTab("reports")}>

//                     Reports

//                 </button>

//                 <button onClick={() => setTab("medicines")}>

//                     Medicines

//                 </button>

//                 <button onClick={() => setTab("habits")}>

//                     Habits

//                 </button>

//             </div>

//             {tab === "overview" && (

//                 <OverviewTab member={props.member} />

//             )}

//             {tab === "reports" && (

//                 <ReportsTab
//                     reports={props.reports}
//                     member={props.member}
//                     refresh={props.refresh}
//                 />

//             )}

//             {tab === "medicines" && (

//                 <MedicinesTab member={props.member} />

//             )}

//             {tab === "habits" && (

//                 <HabitsTab member={props.member} />

//             )}

//         </>

//     );

// }

// export default MemberTabs;

import { useState } from "react";

import OverviewTab from "./tabs/OverviewTab";
import ReportsTab from "./tabs/ReportsTab";
import MedicinesTab from "./tabs/MedicinesTab";
import HabitsTab from "./tabs/HabitsTab";

const TABS = [
    { id: "overview", label: "Overview" },
    { id: "reports", label: "Reports" },
    { id: "medicines", label: "Medicines" },
    { id: "habits", label: "Habits" },
];

function MemberTabs(props) {
    const [tab, setTab] = useState("overview");

    return (
        <div>
            <div className="hc-tabs">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        className={`hc-tab-btn ${tab === t.id ? "hc-tab-btn--active" : ""}`}
                        onClick={() => setTab(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === "overview" && <OverviewTab member={props.member} />}

            {tab === "reports" && (
                <ReportsTab reports={props.reports} member={props.member} refresh={props.refresh} />
            )}

            {tab === "medicines" && <MedicinesTab member={props.member} />}

            {tab === "habits" && <HabitsTab member={props.member} />}
        </div>
    );
}

export default MemberTabs;