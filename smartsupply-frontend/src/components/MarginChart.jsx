import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1a1f2e',
        border: '1px solid #2d3748',
        borderRadius: '8px',
        padding: '10px 14px'
      }}>
        <p style={{
          color: '#94a3b8',
          fontSize: '12px',
          marginBottom: '4px'
        }}>
          Margin range: {label}
        </p>
        <p style={{
          color: '#f1f5f9',
          fontSize: '16px',
          fontWeight: '700'
        }}>
          {payload[0].value} products
        </p>
      </div>
    );
  }
  return null;
};

const MarginChart = ({ data }) => {
  return (
    <div className="chart-card">
      <div className="chart-title">
        <TrendingUp size={16} color="#64748b" />
        Margin distribution
      </div>

      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={data}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="marginGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e2537"
              vertical={false}
            />
            <XAxis
              dataKey="range"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#2d3748', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#marginGradient)"
              dot={{
                fill: '#a855f7',
                r: 4,
                strokeWidth: 0
              }}
              activeDot={{
                fill: '#c084fc',
                r: 6,
                strokeWidth: 0
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div style={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4a5568',
          fontSize: '13px'
        }}>
          Loading chart data...
        </div>
      )}
    </div>
  );
};

export default MarginChart;