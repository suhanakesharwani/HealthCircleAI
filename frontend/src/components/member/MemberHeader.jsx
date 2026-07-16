import { BellRing } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import GhostButton from "../ui/GhostButton";

function initials(name = "") {
    return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]?.toUpperCase()).join("");
}

function MemberHeader({ member }) {
    const name = member.name || member.full_name;

    return (
        <GlassCard className="hc-member-head">
            <div className="hc-member-head-left">
                <div className="hc-member-avatar">{initials(name)}</div>

                <div>
                    <h1>{name}</h1>
                    <div className="hc-member-head-meta">
                        <p>{member.relation}</p>
                        <span className={`hc-linked-pill ${member.linked_user ? "hc-linked-pill--yes" : "hc-linked-pill--no"}`}>
                            {member.linked_user ? "Linked account" : "Not linked"}
                        </span>
                    </div>
                </div>
            </div>

            <GhostButton icon={BellRing}
             onClick={() => alert("🚧 Coming soon! Reminder functionality is under development.")}
             >Send reminder</GhostButton>
        </GlassCard>
    );
}

export default MemberHeader;