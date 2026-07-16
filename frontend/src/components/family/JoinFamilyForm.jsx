import { KeyRound } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import TextField from "../ui/TextField";
import PrimaryButton from "../ui/PrimaryButton";

export default function JoinFamilyForm({ inviteCode, onChange, onSubmit }) {
    return (
        <GlassCard className="hc-setup-card">
            <div className="hc-tone-mint hc-setup-card-icon">
                <KeyRound size={20} />
            </div>

            <div>
                <h2>Join a family</h2>
                <p>Already have an invite code? Enter it to join their circle.</p>
            </div>

            <TextField
                label="Invite code"
                placeholder="e.g. 8F2K-91QZ"
                value={inviteCode}
                onChange={(e) => onChange(e.target.value)}
            />

            <PrimaryButton block onClick={onSubmit} disabled={!inviteCode.trim()}>
                Join family
            </PrimaryButton>
        </GlassCard>
    );
}