export default function TextField({ label, id, ...rest }) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="hc-field">
            {label && <label htmlFor={inputId}>{label}</label>}
            <input id={inputId} className="hc-input" {...rest} />
        </div>
    );
}