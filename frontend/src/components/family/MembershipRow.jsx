function initials(name = "") {
    return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]?.toUpperCase()).join("");
}

export default function MembershipRow({ membership, onRoleChange }) {
    const { user, role } = membership;

    return (
        <div className="hc-roster-row">
            <div className="hc-roster-name">
                <div className="hc-roster-avatar">{initials(user.full_name)}</div>
                {user.full_name}
            </div>

            <div className="hc-roster-email">{user.email}</div>

            <div>
                {role === "OWNER" ? (
                    <span className="hc-owner-pill">OWNER</span>
                ) : (
                    <select
                        className="hc-select"
                        value={role}
                        onChange={(e) => onRoleChange(membership.id, e.target.value)}
                    >
                        <option value="MEMBER">Member</option>
                        <option value="CAREGIVER">Caregiver</option>
                    </select>
                )}
            </div>
        </div>
    );
}