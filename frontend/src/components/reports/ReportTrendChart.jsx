import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

import { getReportTrends } from "../../api/report";
import GlassCard from "../ui/GlassCard";

function prettyLabel(key) {
    return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Backend returns { member, report_type, charts: { <normalized_test_name>: [ {date, value, status, unit, ...} ] }, history, ... }
// — not a flat array — so we let the person pick which test to chart from whatever keys actually have data.
export default function ReportTrendChart({ memberId }) {
    const [charts, setCharts] = useState({});
    const [selectedTest, setSelectedTest] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, [memberId]);

    async function load() {
        setLoading(true);
        try {
            const data = await getReportTrends(memberId);
            const rawCharts = data?.charts || {};
            setCharts(rawCharts);

            const available = Object.keys(rawCharts).filter((k) => rawCharts[k]?.length > 0);
            setSelectedTest((prev) => (available.includes(prev) ? prev : available[0] || ""));
        } catch (err) {
            console.error(err);
            setCharts({});
        } finally {
            setLoading(false);
        }
    }

    const testOptions = Object.keys(charts).filter((k) => charts[k]?.length > 0);

    const points = useMemo(() => {
        return (charts[selectedTest] || []).map((p) => ({
            date: p.date,
            value: p.value,
            status: p.status,
            unit: p.unit,
        }));
    }, [charts, selectedTest]);

    return (
        <GlassCard className="hc-trend-card">
            <div className="hc-trend-head">
                <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <TrendingUp size={17} color="var(--hc-purple-deep)" /> Report trends
                </h3>

                {testOptions.length > 0 && (
                    <select className="hc-select" value={selectedTest} onChange={(e) => setSelectedTest(e.target.value)}>
                        {testOptions.map((key) => (
                            <option key={key} value={key}>{prettyLabel(key)}</option>
                        ))}
                    </select>
                )}
            </div>

            {loading ? (
                <p style={{ color: "var(--hc-ink-soft)", fontSize: 14 }}>Loading trend…</p>
            ) : points.length === 0 ? (
                <div className="hc-trend-empty">
                    No trend data yet — trends appear once at least one processed report has extracted test values.
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={points} margin={{ top: 6, right: 12, left: -12, bottom: 0 }}>
                        <CartesianGrid stroke="rgba(41,34,63,0.08)" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6E6885" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: "#6E6885" }} axisLine={false} tickLine={false} />
                        <Tooltip
                            formatter={(value, _name, props) => [`${value} ${props.payload.unit || ""}`.trim(), prettyLabel(selectedTest)]}
                            contentStyle={{
                                borderRadius: 14,
                                border: "1px solid rgba(41,34,63,0.08)",
                                fontSize: 13,
                                boxShadow: "0 12px 28px -12px rgba(41,34,63,0.25)",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#6E5ECE"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: "#6E5ECE" }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </GlassCard>
    );
}