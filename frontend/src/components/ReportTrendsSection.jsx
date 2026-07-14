import { useEffect, useState } from "react";
import { getReportTrends } from "../api/report";
import TestTrendChart from "./TestTrendChart";

const REPORT_TYPES = [
    "CBC",
    "LFT",
    "KFT",
    "Lipid Profile",
    "HbA1c",
    "Vitamin D",
    "Vitamin B12",
    "Thyroid Profile",
    "Urine Routine",
];

const COMPARISON_INFO = {
    improved: {
        title: "Getting Better",
        icon: "✅",
        color: "#2e7d32",
        explain: "These results moved closer to the healthy range since your last report.",
    },
    worsened: {
        title: "Needs Attention",
        icon: "⚠️",
        color: "#c62828",
        explain: "These results moved further from the healthy range since your last report — worth discussing with a doctor.",
    },
    stable: {
        title: "No Change",
        icon: "➖",
        color: "#757575",
        explain: "These results stayed about the same since your last report.",
    },
};

function ComparisonGroup({ type, items }) {
    if (!items || items.length === 0) return null;

    const info = COMPARISON_INFO[type];

    return (
        <div style={{ marginBottom: 16 }}>
            <h4 style={{ color: info.color, marginBottom: 4 }}>
                {info.icon} {info.title}
            </h4>
            <p style={{ fontSize: 13, color: "#666", marginTop: 0 }}>
                {info.explain}
            </p>
            <ul style={{ marginTop: 8 }}>
                {items.map((item, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                        <b>{item.test}</b>: went from {item.previous} to {item.current}
                        {" "}
                        <span style={{ color: "#888" }}>
                            ({item.previous_status.toLowerCase()} → {item.current_status ? item.current_status.toLowerCase() : item.status?.toLowerCase()})
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ReportTrendsSection({ memberId }) {

    const [reportType, setReportType] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTrends();
    }, [reportType]);

    async function loadTrends() {
        setLoading(true);
        try {
            const result = await getReportTrends(memberId, reportType || undefined);
            setData(result);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const testNames = data ? Object.keys(data.charts) : [];
    const hasComparison =
        data && (data.improved?.length > 0 || data.worsened?.length > 0 || data.stable?.length > 0);

    return (
        <div>
            <h2>Health Trends</h2>
            <p style={{ color: "#666", fontSize: 14 }}>
                See how test results have changed over time, explained in plain language.
            </p>

            <label style={{ display: "block", marginBottom: 12, fontSize: 14 }}>
                Filter by report type:{" "}
                <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    style={{ marginLeft: 8 }}
                >
                    <option value="">All Report Types</option>
                    {REPORT_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </label>

            {loading && <p>Loading your trends...</p>}

            {!loading && testNames.length === 0 && (
                <p style={{ color: "#666" }}>
                    Not enough reports yet to show a trend. Upload at least two reports
                    of the same type to see how values change over time.
                </p>
            )}

            {!loading && hasComparison && (
                <div style={{ border: "1px solid #eee", borderRadius: 10, padding: 16, marginBottom: 24 }}>
                    <h3 style={{ marginTop: 0 }}>What Changed Since Your Last Report</h3>
                    <ComparisonGroup type="improved" items={data.improved} />
                    <ComparisonGroup type="worsened" items={data.worsened} />
                    <ComparisonGroup type="stable" items={data.stable} />
                </div>
            )}

            {!loading &&
                testNames.map((testName) => {
                    const points = data.charts[testName];
                    const historyEntry = data.history.find((h) => h.test === testName);

                    return (
                        <TestTrendChart
                            key={testName}
                            testName={testName}
                            points={points}
                            history={historyEntry}
                        />
                    );
                })}
        </div>
    );
}

export default ReportTrendsSection;