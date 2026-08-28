import { useState } from 'react';
import { LogIn, AlertCircle, Workflow, Database, Users } from 'lucide-react';
import { getToken } from '../api/inventoryApi';

const Logo = ({ scale = 1 }) => (
  <svg
    width={320 * scale}
    height={100 * scale}
    viewBox="0 0 680 160"
  >
    <defs>
      <linearGradient id="wgL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
    </defs>

    <text
      x="40"
      y="88"
      fontFamily="'Inter','Segoe UI',sans-serif"
      fontSize="62"
      fontWeight="800"
      letterSpacing="-2"
      fill="url(#wgL)"
    >
      SmartSupply
    </text>

    <text
      x="46"
      y="140"
      fontFamily="'Inter','Segoe UI',sans-serif"
      fontSize="58"
      fontWeight="200"
      letterSpacing="22"
      fill="#60a5fa"
    >
      Hub
    </text>
  </svg>
);

const PipelinePreview = () => {
  const nodes = [
    {
      label: 'SUP',
      bg: '#1e3a5f',
      color: '#60a5fa',
      lineColor: '#60a5fa',
      delay: '0s'
    },
    {
      label: 'CAM',
      bg: '#2d1b4e',
      color: '#c084fc',
      lineColor: '#c084fc',
      delay: '0.3s'
    },
    {
      label: 'KFK',
      bg: '#2d1f00',
      color: '#fbbf24',
      lineColor: '#fbbf24',
      delay: '0.6s'
    },
    {
      label: 'ENR',
      bg: '#0d2a2a',
      color: '#2dd4bf',
      lineColor: '#2dd4bf',
      delay: '0.9s'
    },
    {
      label: 'API',
      bg: '#0d2a1a',
      color: '#4ade80',
      lineColor: null,
      delay: null
    }
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
    >
      {nodes.map((node, i) => (
        <div
          key={node.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: i < nodes.length - 1 ? 1 : 'none',
            gap: '6px'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: node.bg,
              color: node.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              fontWeight: '700',
              flexShrink: 0,
              fontFamily: 'monospace'
            }}
          >
            {node.label}
          </div>

          {node.lineColor && (
            <div
              style={{
                flex: 1,
                height: '1px',
                background: '#1e2537',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(
                    90deg,
                    transparent,
                    ${node.lineColor},
                    transparent
                  )`,
                  animation: `flow 1.5s linear ${node.delay} infinite`
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await getToken(username, password);
      onLogin(token);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: <Workflow size={14} color="#fbbf24" />,
      label: 'Kafka topic: product-updates',
      value: '10 partitions'
    },
    {
      icon: <Database size={14} color="#60a5fa" />,
      label: 'Enriched products',
      value: '15 records'
    },
    {
      icon: <Users size={14} color="#4ade80" />,
      label: 'Active suppliers',
      value: '3 sources'
    }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0e1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter','Segoe UI',sans-serif"
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(#1e2537 1px,transparent 1px),linear-gradient(90deg,#1e2537 1px,transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.2
        }}
      />

      {/* Top Glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 70%)',
          top: '-150px',
          left: '-150px'
        }}
      />

      {/* Bottom Glow */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle,rgba(13,148,136,0.05) 0%,transparent 70%)',
          bottom: '-150px',
          right: '-100px'
        }}
      />

      {/* Main Container */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '960px',
          minHeight: '560px',
          overflow: 'hidden',
          border: '1px solid #1e2537',
          position: 'relative',
          zIndex: 1,
          margin: '20px',
          borderRadius: '16px'
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            flex: 1,
            background: '#0d1221',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid #1e2537'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px'
            }}
          >
            {/* LEFT-ALIGNED LOGO */}
          <div
            style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%'
            }}
          >
            <Logo scale={0.9} />
          </div>

            <div>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#f1f5f9',
                  lineHeight: '1.35',
                  marginBottom: '14px'
                }}
              >
                Monitor your{' '}
                <span style={{ color: '#60a5fa' }}>
                  integration pipeline
                </span>{' '}
                in real time
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#4a5568',
                  lineHeight: '1.7'
                }}
              >
                Three suppliers. One Kafka stream. 15 enriched products.
                Full visibility into every event flowing through your supply
                chain.
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: '11px',
                color: '#2d3748',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              Live pipeline
            </div>

            <PipelinePreview />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '20px'
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {stat.icon}

                  <span
                    style={{
                      fontSize: '12px',
                      color: '#64748b',
                      fontFamily: 'monospace'
                    }}
                  >
                    {stat.label}
                  </span>

                  <span
                    style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      fontFamily: 'monospace',
                      marginLeft: 'auto'
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            width: '380px',
            background: '#111827',
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {/* CENTERED SIGN IN HEADER */}
          <div
            style={{
              textAlign: 'center',
              width: '100%',
              marginBottom: '32px'
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#f1f5f9',
                marginBottom: '4px'
              }}
            >
              Sign in
            </div>

            <div
              style={{
                fontSize: '13px',
                color: '#4a5568'
              }}
            >
              Access the monitoring dashboard
            </div>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  color: '#64748b',
                  marginBottom: '6px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontWeight: '500'
                }}
              >
                Username
              </label>

              <input
                style={{
                  width: '100%',
                  background: '#0f1117',
                  border: '1px solid #1e2537',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontFamily: "'Inter','Segoe UI',sans-serif",
                  outline: 'none'
                }}
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  color: '#64748b',
                  marginBottom: '6px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontWeight: '500'
                }}
              >
                Password
              </label>

              <input
                style={{
                  width: '100%',
                  background: '#0f1117',
                  border: '1px solid #1e2537',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontFamily: "'Inter','Segoe UI',sans-serif",
                  outline: 'none'
                }}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background:
                  'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: "'Inter','Segoe UI',sans-serif",
                opacity: loading ? 0.7 : 1,
                transition: 'opacity 0.15s'
              }}
            >
              {loading ? (
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite'
                  }}
                />
              ) : (
                <LogIn size={16} />
              )}

              {loading ? 'Authenticating...' : 'Sign in'}
            </button>
          </form>

          {error && (
            <div
              style={{
                background: '#2d1a1a',
                border: '1px solid #991b1b',
                color: '#fca5a5',
                borderRadius: '6px',
                padding: '10px 14px',
                fontSize: '13px',
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={14} />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;