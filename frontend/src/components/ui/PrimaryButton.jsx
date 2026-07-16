export default function PrimaryButton({ children, icon: Icon, block = false, className = "", ...rest }) {
    return (
        <button className={`hc-cta ${block ? "hc-cta--block" : ""} ${className}`} {...rest}>
            {Icon && <Icon size={15} />}
            {children}
        </button>
    );
}