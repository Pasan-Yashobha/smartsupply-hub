import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { BarChart2 } from 'lucide-react';

const COLORS = {
  'Supplier A': '#3b82f6',
  'Supplier B': '#f59e0b',
  'Supplier C': '#22c55e'
};

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
          {label}
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

const SupplierChart = ({ data }) => {
  return (
    <div className="chart-card">
      <div className="chart-title">
        <BarChart2 size={16} color="#64748b" />
        Products by supplier
      </div>

      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e2537"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: '#64748b', fontSize: 12 }}
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
              cursor={{ fill: '#1e2537' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name] || '#3b82f6'}
                />
              ))}
            </Bar>
          </BarChart>
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

export default SupplierChart;