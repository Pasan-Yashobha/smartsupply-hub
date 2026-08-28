import { TrendingUp } from 'lucide-react';

const MetricCard = ({ icon, label, value, color, change }) => {
  return (
    <div className={`metric-card ${color}`}>
      <div className={`metric-icon ${color}`}>
        {icon}
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      {change && (
        <div className="metric-change">
          <TrendingUp size={12} />
          {change}
        </div>
      )}
    </div>
  );
};

export default MetricCard;