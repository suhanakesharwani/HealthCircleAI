// export default function MedicinesTab() {
//     return (
//         <div>
//             <h2>Medicines</h2>

//             <p>
//                 Coming Soon 🚧
//             </p>

//             <p>
//                 This section will allow you to:
//             </p>

//             <ul>
//                 <li>Add medicines</li>
//                 <li>Upload prescriptions</li>
//                 <li>AI prescription parsing</li>
//                 <li>Medicine reminders</li>
//                 <li>Missed dose tracking</li>
//             </ul>
//         </div>
//     );
// }

import { Pill } from "lucide-react";
import ComingSoon from "../ComingSoon";

export default function MedicinesTab() {
    return (
        <ComingSoon
            icon={Pill}
            title="Medicines"
            features={[
                "Add medicines",
                "Upload prescriptions",
                "AI prescription parsing",
                "Medicine reminders",
                "Missed dose tracking",
            ]}
        />
    );
}