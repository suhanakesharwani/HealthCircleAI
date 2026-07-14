import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { theme, statusStyle } from "../styles/theme";
import RangeIndicator from "./RangeIndicator";
import { getTestExplanation } from "../data/testGlossary";

function plainTrendSentence(history, unit) {
    if (!history) return null;
    const { trend, first_value, latest_value, percent_change } = history;

    if (trend === "Increasing") {
        return `Trending up — from ${first_value}${unit} to ${latest_value}${unit} (about ${Math.abs(percent_change)}% higher).`;
    }
    if (trend === "Decreasing") {
        return `Trending down — from ${first_value}${unit} to ${latest_value}${unit} (about ${Math.abs(percent_change)}% lower).`;
    }
    return `Moved up and down across your reports — no steady direction yet.`;
}

function TestTrendChart({ testName, points, history }) {

    const [showInfo, setShowInfo] = useState(false);

    const displayName = points[0]?.original_name || testName;
    const unit = points[0]?.unit ? ` ${points[0].unit}` : "";
    const latest = points[points.length - 1];
    const style = statusStyle(latest?.status);
    const explanation = getTestExplanation(testName);

    const chartData = points.map((p) => ({ date: p.date, value: p.value }));

    return (
        <div
            style={{
                background: theme.colors.panel,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 14,
                padding: 20,
                marginBottom: 18,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 style={{ margin: 0, fontFamily: theme.font.display, fontSize: 17, color: theme.colors.ink }}>
                    {displayName}
                </h3>
                <span
                    style={{
                        fontFamily: theme.font.body,
                        fontWeight: 600,
                        fontSize: 12,
                        color: style.color,
                        background: style.soft,
                        padding: "4px 12px",
                        borderRadius: 20,
                        whiteSpace: "nowrap",
                    }}
                >
                    ● {style.label}
                </span>
            </div>

            {explanation && (
                <div style={{ marginTop: 6 }}>
                    <button
                        onClick={() => setShowInfo(!showInfo)}
                        style={{
                            fontFamily: theme.font.body,
                            fontSize: 12.5,
                            color: theme.colors.brand,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                border: `1.5px solid ${theme.colors.brand}`,
                                fontSize: 11,
                                fontWeight: 700,
                            }}
                        >
                            i
                        </span>
                        What is {displayName}?
                    </button>

                    {showInfo && (
                        <p
                            style={{
                                fontFamily: theme.font.body,
                                fontSize: 13,
                                color: theme.colors.inkSoft,
                                background: theme.colors.brandSoft,
                                padding: "10px 12px",
                                borderRadius: 8,
                                marginTop: 8,
                            }}
                        >
                            {explanation}
                        </p>
                    )}
                </div>
            )}

            <p style={{ fontFamily: theme.font.body, fontSize: 13.5, color: theme.colors.inkSoft, margin: "10px 0 2px" }}>
                Latest result is {style.plain}.
            </p>

            <RangeIndicator
                value={latest?.value}
                referenceRange={latest?.reference_range}
                status={latest?.status}
                unit={unit}
            />

            {history && (
                <p style={{ fontFamily: theme.font.body, fontSize: 13.5, color: theme.colors.inkSoft, marginTop: 14 }}>
                    {plainTrendSentence(history, unit)}
                </p>
            )}

            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid stroke={theme.colors.border} strokeDasharray="4 4" vertical={false} />
                    <XAxis
                        dataKey="date"
                        tick={{ fontFamily: theme.font.mono, fontSize: 11, fill: theme.colors.slate }}
                        axisLine={{ stroke: theme.colors.border }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontFamily: theme.font.mono, fontSize: 11, fill: theme.colors.slate }}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                    />
                    <Tooltip
                        contentStyle={{ fontFamily: theme.font.body, fontSize: 13, borderRadius: 8, border: `1px solid ${theme.colors.border}` }}
                        formatter={(value) => [`${value}${unit}`, displayName]}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={theme.colors.brand}
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: theme.colors.brand }}
                        activeDot={{ r: 6 }}
                        connectNulls
                    />
                </LineChart>
            </ResponsiveContainer>

            {history && (
                <p style={{ fontFamily: theme.font.body, fontSize: 12, color: theme.colors.slate, marginTop: 6 }}>
                    {history.abnormal_reports} of {history.total_reports} reports showed a result outside the healthy range.
                </p>
            )}
        </div>
    );
}

export default TestTrendChart;