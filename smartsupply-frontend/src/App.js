import { useState } from 'react';
import {
  Package,
  Activity,
  Clock,
  LogOut,
  RefreshCw,
  Database
} from 'lucide-react';
import Login from './components/Login';
import MetricCard from './components/MetricCard';
import PipelineFlow from './components/PipelineFlow';
import SupplierChart from './components/SupplierChart';
import MarginChart from './components/MarginChart';
import SupplierHealth from './components/SupplierHealth';
import ActivityLog from './components/ActivityLog';
import useProducts from './hooks/useProducts';
import './index.css';

const TopbarLogo = () => (
  <svg width={140} height={44} viewBox="0 0 680 160">
    <defs>
      <linearGradient id="wgT" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f1f5f9"/>
        <stop offset="100%" stopColor="#94a3b8"/>
      </linearGradient>
    </defs>
    <text
      x="40"
      y="88"
      fontFamily="'Inter','Segoe UI',sans-serif"
      fontSize="62"
      fontWeight="800"
      letterSpacing="-2"
      fill="url(#wgT)"
    >SmartSupply</text>
    <text
      x="46"
      y="140"
      fontFamily="'Inter','Segoe UI',sans-serif"
      fontSize="58"
      fontWeight="200"
      letterSpacing="22"
      fill="#60a5fa"
    >Hub</text>
  </svg>
);

const App = () => {
  const [token, setToken] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const {
    products,
    stats,
    page,
    totalPages,
    loading,
    activityLog,
    fetchProducts
  } = useProducts(token);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const handleRefresh = () => {
    fetchProducts(page);
    setLastRefresh(new Date());
  };

  const eventsPerMin = Math.floor(stats.totalProducts / 10);
  const uptime = '99.8%';

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">

      <div className="topbar">
        <div className="topbar-left">
          <TopbarLogo />
          <span className="topbar-subtitle">
            Integration Monitoring Dashboard
          </span>
        </div>

        <div className="topbar-right">
          <div className="status-pill">
            Pipeline live
          </div>

          <span style={{
            fontSize: '12px',
            color: '#4a5568',
            fontFamily: 'monospace'
          }}>
            {lastRefresh.toTimeString().slice(0, 8)}
          </span>

          <button
            onClick={handleRefresh}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'transparent', border: '1px solid #2d3748',
              color: '#94a3b8', padding: '6px 12px', borderRadius: '6px',
              cursor: 'pointer', fontSize: '13px'
            }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>

          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>

      <div className="main-content">

        <div className="metrics-grid">
          <MetricCard
            icon={<Package size={18} />}
            label="Total products"
            value={stats.totalProducts.toLocaleString()}
            color="blue"
            change="Live from PostgreSQL"
          />
          <MetricCard
            icon={<Activity size={18} />}
            label="Events per minute"
            value={eventsPerMin}
            color="green"
            change="Kafka product-updates"
          />
          <MetricCard
            icon={<Database size={18} />}
            label="Avg margin (LKR)"
            value={stats.avgMargin}
            color="amber"
            change="Calculated on enrichment"
          />
          <MetricCard
            icon={<Clock size={18} />}
            label="Pipeline uptime"
            value={uptime}
            color="purple"
            change="Docker Compose stack"
          />
        </div>

        <PipelineFlow eventsPerMin={eventsPerMin} />

        <div className="charts-grid">
          <SupplierChart data={stats.supplierBreakdown} />
          <MarginChart data={stats.marginData} />
        </div>

        <div className="bottom-grid">
          <SupplierHealth products={products} />
          <ActivityLog activityLog={activityLog} />
        </div>

        <div style={{
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderTop: '1px solid #1e2537'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '12px', color: '#4a5568' }}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => fetchProducts(page - 1)}
              disabled={page === 0 || loading}
              style={{
                background: 'transparent',
                border: '1px solid #2d3748',
                color: page === 0 ? '#2d3748' : '#94a3b8',
                padding: '5px 12px', borderRadius: '6px',
                cursor: page === 0 ? 'not-allowed' : 'pointer',
                fontSize: '12px'
              }}
            >
              Previous
            </button>
            <button
              onClick={() => fetchProducts(page + 1)}
              disabled={page >= totalPages - 1 || loading}
              style={{
                background: 'transparent',
                border: '1px solid #2d3748',
                color: page >= totalPages - 1 ? '#2d3748' : '#94a3b8',
                padding: '5px 12px', borderRadius: '6px',
                cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
                fontSize: '12px'
              }}
            >
              Next
            </button>
          </div>

          <span style={{
            fontSize: '11px',
            color: '#4a5568',
            fontFamily: 'monospace'
          }}>
            SmartSupply Hub
          </span>
        </div>

      </div>
    </div>
  );
};

export default App;