
// import { motion } from "framer-motion";
// import { ShieldCheck, Users } from "lucide-react";
// import { Link } from "react-router-dom";

// import GlassCard from "../ui/GlassCard";
// import GhostButton from "../ui/GhostButton";
// import InviteCodeBlock from "../family/InviteCodeBlock";

// export default function FamilyManagementCard({ inviteCode }) {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//         >
//             <GlassCard className="hc-manage">
//                 <div className="hc-manage-glow" />
//                 <div className="hc-manage-head">
//                     <ShieldCheck size={16} /> Family management
//                 </div>

//                 <div className="hc-manage-grid">
//                     <InviteCodeBlock code={inviteCode} />

//                     <div className="hc-manage-actions">
//                         <Link to="/family/manage">
//                             <GhostButton icon={Users}>Manage roles</GhostButton>
//                         </Link>
//                     </div>
//                 </div>
//             </GlassCard>
//         </motion.div>
//     );
// }

import { motion } from "framer-motion";
import { ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

import GlassCard from "../ui/GlassCard";
import GhostButton from "../ui/GhostButton";
import InviteCodeBlock from "../family/InviteCodeBlock";

export default function FamilyManagementCard({ inviteCode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
            <GlassCard className="hc-manage">
                <div className="hc-manage-glow" />
                <div className="hc-manage-head">
                    <ShieldCheck size={16} /> Family management
                </div>

                <div className="hc-manage-grid">
                    <InviteCodeBlock code={inviteCode} />

                    <div className="hc-manage-actions">
                        <Link to="/family/manage">
                            <GhostButton icon={Users}>Manage roles</GhostButton>
                        </Link>
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
}