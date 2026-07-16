import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getInitials } from "../../utils/getInitials";

const TONES = ["lavender", "blue", "peach", "mint"];

export default function MemberTile({ member, index = 0 }) {
    const tone = TONES[index % TONES.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="hc-tile"
        >
            <Link to={`/members/${member.id}`} className="hc-tile-link">
                <div className={`hc-tile-avatar hc-tone-${tone}`}>
                    {getInitials(member.full_name || member.name)}
                </div>

                <div className="hc-tile-body">
                    <h3>{member.full_name || member.name}</h3>
                    <p>{member.relation || "Family member"}</p>
                </div>

                <div className="hc-tile-arrow">
                    <ArrowUpRight size={16} strokeWidth={2} />
                </div>
            </Link>
        </motion.div>
    );
}