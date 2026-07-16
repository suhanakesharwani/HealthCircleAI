import { Home } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import TextField from "../ui/TextField";
import PrimaryButton from "../ui/PrimaryButton";

export default function CreateFamilyForm({ familyName, onChange, onSubmit }) {
    return (
        <GlassCard className="hc-setup-card">
            <div className="hc-tone-lavender hc-setup-card-icon">
                <Home size={20} />
            </div>

            <div>
                <h2>Create a family</h2>
                <p>Start a new HealthCircle and invite the people you care for.</p>
            </div>

            <TextField
                label="Family name"
                placeholder="e.g. The Sharmas"
                value={familyName}
                onChange={(e) => onChange(e.target.value)}
            />

            <PrimaryButton block onClick={onSubmit} disabled={!familyName.trim()}>
                Create family
            </PrimaryButton>
        </GlassCard>
    );
}