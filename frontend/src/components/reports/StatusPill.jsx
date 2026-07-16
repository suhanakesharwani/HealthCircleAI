const TONE = {
    DONE: "hc-status-pill--done",
    PROCESSING: "hc-status-pill--processing",
    PENDING: "hc-status-pill--pending",
    FAILED: "hc-status-pill--failed",
};

export default function StatusPill({ label, status }) {
    return (
        <span className={`hc-status-pill ${TONE[status] || "hc-status-pill--pending"}`}>
            {label}: {status}
        </span>
    );
}