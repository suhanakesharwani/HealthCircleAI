import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { theme } from "../styles/theme";

function ComparisonBarChart({ improved, worsened }) {

    const items = [...worsened, ...improved].slice(0, 8); // keep it readable

    if (items.length === 0) return null;

    const data = items.map((item) => ({
        test: item.test,
        Previous: item.previous,
        Current: item.current,
        isWorse: worsened.includes(item),
    }));

    return (
        <div>
            <ResponsiveContainer width="100%" height={Math.max(220, data.length * 55)}>
                <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid stroke={theme.colors.border} strokeDasharray="4 4" horizontal={false} />
                    <XAxis type="number" tick={{ fontFamily: theme.font.mono, fontSize: 11, fill: theme.colors.slate }} axisLine={false} tickLine={false} />
                    <YAxis
                        type="category"
                        dataKey="test"
                        tick={{ fontFamily: theme.font.body, fontSize: 12.5, fill: theme.colors.ink }}
                        width={130}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip contentStyle={{ fontFamily: theme.font.body, fontSize: 13, borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontFamily: theme.font.body, fontSize: 12.5 }} />
                    <Bar dataKey="Previous" fill={theme.colors.neutral} radius={[0, 4, 4, 0]} barSize={14} />
                    <Bar dataKey="Current" radius={[0, 4, 4, 0]} barSize={14}>
                        {data.map((d, i) => (
                            <Cell key={i} fill={d.isWorse ? theme.colors.alert : theme.colors.good} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ComparisonBarChart;