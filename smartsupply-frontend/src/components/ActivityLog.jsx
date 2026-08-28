import { Terminal, Radio } from 'lucide-react';

const sourceLabels = {
  'SUPPLIER_A_REST': 'REST-A',
  'SUPPLIER_B_REST': 'REST-B',
  'SUPPLIER_C_CSV': 'CSV-C'
};

const sourceBadgeColors = {
  'SUPPLIER_A_REST': { bg: '#1e3a5f', color: '#60a5fa', border: '#2563eb' },
  'SUPPLIER_B_REST': { bg: '#2d1f00', color: '#fbbf24', border: '#d97706' },
  'SUPPLIER_C_CSV': { bg: '#0d2a1a', color: '#4ade80', border: '#16a34a' }
};

const ActivityLog = ({ activityLog }) => {
  return (
    <div className="activity-card">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Terminal size={14} color="#64748b" />
          <p className="section-title" style={{ marginBottom: 0 }}>
            Activity log
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Radio size={12} color="#4ade80" />
          <span style={{
            fontSize: '11px',
            color: '#4ade80',
            fontFamily: 'monospace'
          }}>
            LIVE
          </span>
        </div>
      </div>

      <div className="activity-list">
        {activityLog.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#4a5568',
            fontSize: '13px',
            gap: '8px'
          }}>
            <Terminal size={16} />
            Waiting for events...
          </div>
        ) : (
          activityLog.map((entry) => {
            const badgeStyle = sourceBadgeColors[entry.source] || {
              bg: '#1e2537',
              color: '#94a3b8',
              border: '#2d3748'
            };

            return (
              <div
                key={entry.id}
                className={`activity-item ${entry.color}`}
              >
                <span className="activity-time">{entry.time}</span>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '2px'
                  }}>
                    <span className="activity-id">
                      {entry.productId}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      background: badgeStyle.bg,
                      color: badgeStyle.color,
                      border: `1px solid ${badgeStyle.border}`,
                      fontFamily: 'monospace'
                    }}>
                      {sourceLabels[entry.source] || entry.source}
                    </span>
                  </div>
                  <span className="activity-text">
                    {entry.name} saved to PostgreSQL
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={{
        marginTop: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '12px',
        borderTop: '1px solid #1e2537'
      }}>
        <span style={{ fontSize: '11px', color: '#4a5568' }}>
          Showing last {activityLog.length} events
        </span>
        <span style={{
          fontSize: '11px',
          color: '#4a5568',
          fontFamily: 'monospace'
        }}>
          max 50 entries
        </span>
      </div>
    </div>
  );
};

export default ActivityLog;