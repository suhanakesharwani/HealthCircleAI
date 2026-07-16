export default function InfoRow({ label, value }) {
    return (
        <div className="hc-info-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
        </div>
    );
}