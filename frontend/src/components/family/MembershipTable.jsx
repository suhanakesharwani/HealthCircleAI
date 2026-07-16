import GlassCard from "../ui/GlassCard";
import MembershipRow from "./MembershipRow";

export default function MembershipTable({ memberships, onRoleChange }) {
    return (
        <GlassCard className="hc-roster">
            <div className="hc-roster-head">
                <span>Name</span>
                <span>Email</span>
                <span>Role</span>
            </div>

            {memberships.map((membership) => (
                <MembershipRow key={membership.id} membership={membership} onRoleChange={onRoleChange} />
            ))}
        </GlassCard>
    );
}