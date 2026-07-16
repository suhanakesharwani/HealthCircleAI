export default function GhostButton({ children, icon: Icon, className = "", ...rest }) {
    return (
        <button className={`hc-btn-ghost ${className}`} {...rest}>
            {Icon && <Icon size={15} />}
            {children}
        </button>
    );
}