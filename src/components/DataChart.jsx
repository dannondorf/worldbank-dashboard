import {
  ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { COUNTRIES } from '../constants';
import { formatCompact } from '../utils/formatCompact';
import styles from './DataChart.module.css';


function ChartTooltip({ active, payload, label, format }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <div className={styles.ttYear}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.dataKey} className={styles.ttRow}>
          <span className={styles.ttName}>
            <span className={styles.ttDot} style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className={styles.ttVal}>{formatCompact(entry.value, format)}</span>
        </div>
      ))}
    </div>
  );
}


export function DataChart({ data, countryNames, loading, error, format, label }) {
    return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <div className={styles.cardTitle}>{label}</div>
      </div>
        <div className={styles.chartBox}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 0, right: 12, bottom: 0, left: 4}}>
                    <defs>
                        {COUNTRIES.map((c) => (
                            <linearGradient key={c.code} id={`grad-${c.code}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={c.color} stopOpacity={1} />
                            <stop offset="100%" stopColor={c.color} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid
                        stroke="rgba(102, 106, 134, 0.18)"   
                        strokeDasharray="4 4"
                    />
                    <XAxis
                        dataKey="year"                        
                        tick={{ fill: '#8C92B0', fontSize: 13, fontFamily: "'IBM Plex Mono', monospace" }}
                        axisLine={{ stroke: 'rgba(102, 106, 134, 0.34)' }}
                        tickLine={false}
                    />
                    <YAxis
                        tickFormatter={(v) => formatCompact(v, format)}
                        tick={{ fill: '#8C92B0', fontSize: 13, fontFamily: "'IBM Plex Mono', monospace" }}
                        axisLine={false}
                        tickLine={false}
                        width={48}
                    />
                    <Tooltip
                        content={<ChartTooltip format={format} />}
                        cursor={{ stroke: 'rgba(102, 106, 134, 0.34)', strokeDasharray: '3 4' }}
                    />
                    {countryNames.map((name) => {
                        const country = COUNTRIES.find((c) => c.name === name);
                            return (
                                <Area
                                    key={name}
                                    type="monotone"
                                    dataKey={name}
                                    stroke={country.color}
                                    strokeWidth={2.25}
                                    dot={false}
                                    activeDot={{ r: 4.5, strokeWidth: 2, fill: '#040F16' }}
                                    fill={`url(#grad-${country.code})`}
                                    fillOpacity={0.20}
                                    animationDuration={1200}
                                />
                            );
                        })}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
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
        <div className={styles.source}>SOURCE: WORLD BANK OPEN DATA</div>
    </div>
  );
}
