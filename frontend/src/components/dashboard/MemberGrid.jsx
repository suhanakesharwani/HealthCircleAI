import MemberTile from "./MemberTile";

export default function MemberGrid({ members }) {
    return (
        <>
            <div className="hc-section-head">
                <h2>Family health profiles</h2>
                <p>Click any profile to view medical history, reports, medicines and habits.</p>
            </div>

            {members.length === 0 ? (
                <div className="hc-glass hc-empty">
                    No profiles yet — invite your family to get started.
                </div>
            ) : (
                <div className="hc-grid">
                    {members.map((member, i) => (
                        <MemberTile key={member.id} member={member} index={i} />
                    ))}
                </div>
            )}
        </>
    );
}