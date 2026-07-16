export default function SelectField({ label, id, children, ...rest }) {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="hc-field">
            {label && <label htmlFor={selectId}>{label}</label>}
            <select id={selectId} className="hc-input hc-select" {...rest}>
                {children}
            </select>
        </div>
    );
}