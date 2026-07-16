import { useEffect, useState } from "react";
import { GitCompare, ArrowUp, ArrowDown } from "lucide-react";

import { getReportSummary } from "../../api/report";
import GlassCard from "../ui/GlassCard";
import { parseAbnormalValue } from "../../utils/parseAbnormalValue";

function buildRows(summaryA, summaryB) {
    if (!summaryA || !summaryB) return [];

    const rows = {};

    (summaryA.abnormal_values || []).forEach((raw) => {
        const { name, valueText, numericValue, status } = parseAbnormalValue(raw);
        const key = name.toLowerCase();
        rows[key] = { ...(rows[key] || { name }), a: { valueText, numericValue, status } };
    });

    (summaryB.abnormal_values || []).forEach((raw) => {
        const { name, valueText, numericValue, status } = parseAbnormalValue(raw);
        const key = name.toLowerCase();
        rows[key] = { ...(rows[key] || { name }), b: { valueText, numericValue, status } };
    });

    return Object.values(rows).map((row) => {
        const a = row.a?.numericValue;
        const b = row.b?.numericValue;
        const delta = a != null && b != null ? b - a : null;
        return { ...row, delta };
    });
}

function Cell({ entry }) {
    if (!entry) return <span>—</span>;
    return (
        <span>
            {entry.valueText || "—"}
            {entry.status && (
                <span style={{ marginLeft: 6, fontSize: 11.5, fontWeight: 700, color: "var(--hc-ink-soft)" }}>
                    ({entry.status})
                </span>
            )}
        </span>
    );
}

export default function ReportComparison({ reports }) {
    const sorted = [...reports].sort(
        (a, b) => new Date(a.report_date || a.created_at || 0) - new Date(b.report_date || b.created_at || 0)
    );

    const [idA, setIdA] = useState(sorted[0]?.id ?? "");
    const [idB, setIdB] = useState(sorted[sorted.length - 1]?.id ?? "");
    const [summaryA, setSummaryA] = useState(null);
    const [summaryB, setSummaryB] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (idA && idB) load();
    }, [idA, idB]);

    async function load() {
        setLoading(true);
        try {
            const [a, b] = await Promise.all([getReportSummary(idA), getReportSummary(idB)]);
            setSummaryA(a);
            setSummaryB(b);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const rows = buildRows(summaryA, summaryB);

    return (
        <GlassCard className="hc-compare-card">
            <div className="hc-compare-head">
                <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <GitCompare size={17} color="var(--hc-purple-deep)" /> Compare reports
                </h3>

                {reports.length >= 2 && (
                    <div className="hc-compare-selects">
                        <select className="hc-select" value={idA} onChange={(e) => setIdA(e.target.value)}>
                            {sorted.map((r) => (
                                <option key={r.id} value={r.id}>{r.original_filename}</option>
                            ))}
                        </select>
                        <span className="hc-compare-vs">vs</span>
                        <select className="hc-select" value={idB} onChange={(e) => setIdB(e.target.value)}>
                            {sorted.map((r) => (
                                <option key={r.id} value={r.id}>{r.original_filename}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {reports.length < 2 ? (
                <div className="hc-compare-empty">Upload at least two reports to compare.</div>
            ) : loading ? (
                <p style={{ color: "var(--hc-ink-soft)", fontSize: 14 }}>Comparing…</p>
            ) : rows.length === 0 ? (
                <div className="hc-compare-empty">No comparable abnormal values found.</div>
            ) : (
                <table className="hc-compare-table">
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Earlier</th>
                            <th>Later</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.name}>
                                <td>{row.name}</td>
                                <td><Cell entry={row.a} /></td>
                                <td>
                                    <Cell entry={row.b} />
                                    {row.delta !== null && row.delta !== 0 && (
                                        <span className={`hc-delta ${row.delta > 0 ? "hc-delta--up" : "hc-delta--down"}`}>
                                            {row.delta > 0 ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                                            {Math.abs(row.delta).toFixed(1)}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </GlassCard>
    );
}