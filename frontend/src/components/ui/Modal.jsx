import { X } from "lucide-react";

export default function Modal({ onClose, children, width = 640 }) {
    return (
        <div className="hc-modal-overlay" onClick={onClose}>
            <div
                className="hc-glass hc-modal-panel"
                style={{ maxWidth: width }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="hc-modal-close" onClick={onClose} aria-label="Close">
                    <X size={16} />
                </button>
                {children}
            </div>
        </div>
    );
}