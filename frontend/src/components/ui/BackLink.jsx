import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackLink({ to, children }) {
    return (
        <Link to={to} className="hc-back">
            <ArrowLeft size={15} /> {children}
        </Link>
    );
}