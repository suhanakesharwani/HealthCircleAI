import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { theme } from "../styles/theme";

function TrendSummaryDonut({ improved, worsened, stable }) {

    const data = [
        { name: "Improved", value: improved, color: theme.colors.good },
        { name: "Needs attention", value: worsened, color: theme.colors.alert },
        { name: "No change", value: stable, color: theme.colors.neutral },
    ].filter((d) => d.value > 0);

    const total = improved + worsened + stable;

    if (total === 0) return null;

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 180, height: 180, position: "relative" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={3}
                            stroke="none"
                        >
                            {data.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ fontFamily: theme.font.body, fontSize: 13, borderRadius: 8 }} />
                    </PieChart>
                </ResponsiveContainer>
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                    }}
                >
                    <span style={{ fontFamily: theme.font.display, fontSize: 26, fontWeight: 700, color: theme.colors.ink }}>
                        {total}
                    </span>
                    <span style={{ fontFamily: theme.font.body, fontSize: 11, color: theme.colors.slate }}>
                        tests tracked
                    </span>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, display: "inline-block" }} />
                        <span style={{ fontFamily: theme.font.body, fontSize: 13.5, color: theme.colors.ink }}>
                            {d.name} <span style={{ color: theme.colors.slate }}>({d.value})</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendSummaryDonut;