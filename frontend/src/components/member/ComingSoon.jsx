import { Check } from "lucide-react";
import GlassCard from "../ui/GlassCard";

export default function ComingSoon({ icon: Icon, title, features }) {
    return (
        <GlassCard className="hc-coming-soon">
            <div className="hc-coming-soon-icon hc-tone-lavender">
                <Icon size={20} />
            </div>

            <span className="hc-coming-soon-badge">Coming soon</span>
            <h2>{title}</h2>

            <ul className="hc-feature-list">
                {features.map((f) => (
                    <li key={f}>
                        <Check size={14} color="var(--hc-purple-deep)" /> {f}
                    </li>
                ))}
            </ul>
        </GlassCard>
    );
}