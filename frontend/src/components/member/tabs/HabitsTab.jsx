// export default function HabitsTab() {
//     return (
//         <div>
//             <h2>Habits</h2>

//             <p>
//                 Coming Soon 🚧
//             </p>

//             <ul>
//                 <li>Create daily habits</li>
//                 <li>Custom schedules</li>
//                 <li>Reminder system</li>
//                 <li>Habit completion tracking</li>
//                 <li>Progress charts</li>
//             </ul>
//         </div>
//     );
// }

import { Activity } from "lucide-react";
import ComingSoon from "../ComingSoon";

export default function HabitsTab() {
    return (
        <ComingSoon
            icon={Activity}
            title="Habits"
            features={[
                "Create daily habits",
                "Custom schedules",
                "Reminder system",
                "Habit completion tracking",
                "Progress charts",
            ]}
        />
    );
}