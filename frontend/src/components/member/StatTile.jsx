import GlassCard from "../ui/GlassCard";

const TONES = {
    lavender: "hc-tone-lavender",
    blue: "hc-tone-blue",
    peach: "hc-tone-peach",
    mint: "hc-tone-mint",
};

export default function StatTile({ icon: Icon, title, value, sub, tone = "lavender" }) {
    return (
        <GlassCard className="hc-stat-tile">
            <div className={`hc-stat-icon ${TONES[tone]}`}>
                <Icon size={18} />
            </div>
            <h4>{title}</h4>
            <div className="hc-stat-value">{value}</div>
            {sub && <p className="hc-stat-sub">{sub}</p>}
        </GlassCard>
    );
}