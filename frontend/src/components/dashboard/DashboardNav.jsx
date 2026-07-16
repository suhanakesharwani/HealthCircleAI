import { Activity } from "lucide-react";
import { getInitials } from "../../utils/getInitials";

export default function DashboardNav({ user }) {
    return (
        <nav className="hc-nav">
            <div className="hc-brand">
                <span className="hc-brand-mark">
                    <Activity size={17} strokeWidth={2.4} />
                </span>
                HealthCircle
            </div>

            {user && <div className="hc-nav-avatar">{getInitials(user.full_name)}</div>}
        </nav>
    );
}