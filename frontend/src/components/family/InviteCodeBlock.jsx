import { Copy, Check } from "lucide-react";
import GhostButton from "../ui/GhostButton";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

export default function InviteCodeBlock({ code, label = "Invite code" }) {
    const [copied, copy] = useCopyToClipboard();

    return (
        <div>
            <label style={{ display: "block", fontSize: 13, color: "var(--hc-ink-soft)", marginBottom: 6 }}>
                {label}
            </label>
            <div className="hc-code" style={{ marginBottom: 12 }}>{code}</div>
            <GhostButton icon={copied ? Check : Copy} onClick={() => copy(code)}>
                {copied ? "Copied" : "Copy code"}
            </GhostButton>
        </div>
    );
}