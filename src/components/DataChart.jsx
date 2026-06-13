import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { COUNTRIES, COLORS } from '../constants';
import { formatCompact } from '../utils/formatCompact';

export function DataChart({ data, countryNames, loading, error, format }) {
  return (
    <div
        style={{
          position: "relative",
          paddingTop: "20px",
          paddingRight: "60px",
        }}
    >
    <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
            tickFormatter={(value) =>
            formatCompact(value, format)
            }
        />
        {countryNames.map((name) => (
            <Line
            key={name}
            type="monotone"
            dataKey={name}
            stroke={
                COLORS[
                COUNTRIES.findIndex((c) => c.name === name) % COLORS.length
                ]
            }
            dot={false}
            />
        ))}
        <Legend />
        </LineChart>
    </ResponsiveContainer>
    {error && (
        <div
        style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#b91c1c",
            textAlign: "center",
            padding: "20px",
        }}
        >
        {error}
        </div>
    )}
    {loading && (
        <div
        style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2em",
            color: "#888",
        }}
        >
        Loading…
        </div>
    )}
    {countryNames.length === 0 && (
        <div
        style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5em",
            color: "#888",
            paddingBottom: "30px",
        }}
        >
        Click a country to begin
        </div>
        )}
      </div>
  );
}