// // import { Link } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { Sparkles, Pencil } from "lucide-react";

// // export default function DashboardHero({ user }) {
// //     const firstName = user.full_name.split(" ")[0];

// //     return (
// //         <motion.div
// //             initial={{ opacity: 0, y: 16 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
// //             className="hc-hero"
// //         >
// //             <div>
// //                 <span className="hc-eyebrow">
// //                     <Sparkles size={13} /> {user.family.name}
// //                 </span>
// //                 <h1>Welcome back, {firstName}</h1>
// //                 <p>
// //                     Here's what's happening across <b>{user.family.name}</b> today.
// //                 </p>
// //                 <span className="hc-role-badge">{user.family.role}</span>
// //             </div>

// //             <Link to="/profile/edit">
// //                 <button className="hc-cta">
// //                     <Pencil size={15} /> Edit my profile
// //                 </button>
// //             </Link>
// //         </motion.div>
// //     );
// // }

// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Sparkles, Pencil } from "lucide-react";

// import PrimaryButton from "../ui/PrimaryButton";

// export default function DashboardHero({ user }) {
//     const firstName = user.full_name.split(" ")[0];

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//             className="hc-hero"
//         >
//             <div>
//                 <span className="hc-eyebrow">
//                     <Sparkles size={13} /> {user.family.name}
//                 </span>
//                 <h1>Welcome back, {firstName}</h1>
//                 <p>
//                     Here's what's happening across <b>{user.family.name}</b> today.
//                 </p>
//                 <span className="hc-role-badge">{user.family.role}</span>
//             </div>

//             <Link to="/profile/edit">
//                 <PrimaryButton icon={Pencil}>Edit my profile</PrimaryButton>
//             </Link>
//         </motion.div>
//     );
// }

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Pencil } from "lucide-react";

import PrimaryButton from "../ui/PrimaryButton";

export default function DashboardHero({ user }) {
    const firstName = user.full_name.split(" ")[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hc-hero"
        >
            <div>
                <span className="hc-eyebrow">
                    <Sparkles size={13} /> {user.family.name}
                </span>
                <h1>Welcome back, {firstName}</h1>
                <p>
                    Here's what's happening across <b>{user.family.name}</b> today.
                </p>
                <span className="hc-role-badge">{user.family.role}</span>
            </div>

            <Link to="/profile/edit">
                <PrimaryButton icon={Pencil}>Edit my profile</PrimaryButton>
            </Link>
        </motion.div>
    );
}