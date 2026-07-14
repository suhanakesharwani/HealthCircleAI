import { theme, statusStyle } from "../styles/theme";

// Parses "10-20" style reference ranges. Returns null if unparseable.
function parseRange(range) {
    if (!range || typeof range !== "string") return null;
    const match = range.match(/^\s*([\d.]+)\s*-\s*([\d.]+)\s*/);
    if (!match) return null;
    return { low: parseFloat(match[1]), high: parseFloat(match[2]) };
}

function RangeIndicator({ value, referenceRange, status, unit }) {

    const parsed = parseRange(referenceRange);
    const style = statusStyle(status);

    if (!parsed || value === null || value === undefined) {
        return (
            <div style={{ fontSize: 12, color: theme.colors.slate }}>
                No numeric range available for this test.
            </div>
        );
    }

    const { low, high } = parsed;
    const span = high - low;
    // Pad the visual track 25% beyond the range on each side so out-of-range
    // values still land somewhere sensible on the bar instead of clipping.
    const padding = span * 0.25 || 1;
    const min = low - padding;
    const max = high + padding;

    const clamp = (n) => Math.max(0, Math.min(100, n));
    const toPercent = (n) => clamp(((n - min) / (max - min)) * 100);

    const lowPct = toPercent(low);
    const highPct = toPercent(high);
    const valuePct = toPercent(value);

    return (
        <div style={{ marginTop: 10 }}>
            <div
                style={{
                    position: "relative",
                    height: 10,
                    borderRadius: 6,
                    background: theme.colors.neutralSoft,
                }}
            >
                {/* Healthy zone */}
                <div
                    style={{
                        position: "absolute",
                        left: `${lowPct}%`,
                        width: `${highPct - lowPct}%`,
                        height: "100%",
                        borderRadius: 6,
                        background: theme.colors.goodSoft,
                        border: `1px solid ${theme.colors.good}`,
                    }}
                />
                {/* Marker for current value */}
                <div
                    title={`${value}${unit || ""}`}
                    style={{
                        position: "absolute",
                        left: `${valuePct}%`,
                        top: -4,
                        width: 18,
                        height: 18,
                        marginLeft: -9,
                        borderRadius: "50%",
                        background: style.color,
                        border: "2px solid white",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                    }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: theme.font.mono,
                    fontSize: 11,
                    color: theme.colors.slate,
                    marginTop: 4,
                }}
            >
                <span>{low}{unit}</span>
                <span>Healthy range</span>
                <span>{high}{unit}</span>
            </div>
        </div>
    );
}

export default RangeIndicator;