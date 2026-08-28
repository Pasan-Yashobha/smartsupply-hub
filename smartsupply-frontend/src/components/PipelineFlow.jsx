import {
  Server,
  GitBranch,
  Zap,
  Database,
  HardDrive,
  Globe,
  Lock
} from 'lucide-react';

const nodes = [
  { id: 'suppliers', label: 'Suppliers', sublabel: 'A / B / C', port: ':8085', icon: <Globe size={20} />, color: 'blue' },
  { id: 'camel', label: 'Apache Camel', sublabel: '3 routes', port: ':8081', icon: <GitBranch size={20} />, color: 'purple' },
  { id: 'kafka', label: 'Kafka', sublabel: '10 partitions', port: ':9092', icon: <Zap size={20} />, color: 'amber' },
  { id: 'enrichment', label: 'Enrichment', sublabel: 'margin x 0.2', port: ':8082', icon: <Server size={20} />, color: 'teal' },
  { id: 'postgres', label: 'PostgreSQL', sublabel: 'enriched_products', port: ':5433', icon: <Database size={20} />, color: 'green' },
  { id: 'mongo', label: 'MongoDB', sublabel: 'raw_events', port: ':27017', icon: <HardDrive size={20} />, color: 'coral' },
  { id: 'api', label: 'Inventory API', sublabel: 'JWT + Swagger', port: ':8083', icon: <Lock size={20} />, color: 'purple' }
];

const colorMap = {
  blue:   { bg: '#1e3a5f', border: '#2563eb', icon: '#60a5fa', line: '#2563eb' },
  purple: { bg: '#2d1b4e', border: '#7c3aed', icon: '#c084fc', line: '#7c3aed' },
  amber:  { bg: '#2d1f00', border: '#d97706', icon: '#fbbf24', line: '#d97706' },
  teal:   { bg: '#0d2a2a', border: '#0d9488', icon: '#2dd4bf', line: '#0d9488' },
  green:  { bg: '#0d2a1a', border: '#16a34a', icon: '#4ade80', line: '#16a34a' },
  coral:  { bg: '#2d1a0e', border: '#c2410c', icon: '#fb923c', line: '#c2410c' }
};

const PipelineFlow = ({ eventsPerMin }) => {
  return (
    <div className="pipeline-section">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <p className="section-title">Live pipeline flow</p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#0d2a1a',
          border: '1px solid #166534',
          borderRadius: '20px',
          padding: '4px 12px'
        }}>
          <span style={{
            fontSize: '12px',
            color: '#4ade80',
            fontFamily: 'monospace'
          }}>
            {eventsPerMin} events / min
          </span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}>
        {nodes.map((node, index) => {
          const c = colorMap[node.color] || colorMap.blue;
          const isLast = index === nodes.length - 1;
          return (
            <div
              key={node.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: isLast ? 'none' : 1,
                minWidth: 0
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  color: c.icon,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {node.icon}
                </div>
                <span style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  textAlign: 'center',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}>
                  {node.label}
                </span>
                <span style={{
                  fontSize: '10px',
                  color: '#4a5568',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}>
                  {node.sublabel}
                </span>
                <span style={{
                  fontSize: '10px',
                  color: '#2d3748',
                  fontFamily: 'monospace'
                }}>
                  {node.port}
                </span>
              </div>

              {!isLast && (
                <div style={{
                  flex: 1,
                  height: '2.5px',
                  background: '#2d3748',
                  position: 'relative',
                  overflow: 'hidden',
                  margin: '0 8px',
                  marginBottom: '48px'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${c.line}, transparent)`,
                    animation: `flow ${1.4 + index * 0.2}s linear infinite`
                  }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineFlow;