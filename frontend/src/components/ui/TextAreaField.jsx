export default function TextAreaField({ label, id, ...rest }) {
    const areaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="hc-field">
            {label && <label htmlFor={areaId}>{label}</label>}
            <textarea id={areaId} className="hc-input" {...rest} />
        </div>
    );
}