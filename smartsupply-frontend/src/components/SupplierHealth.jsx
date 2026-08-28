import {
  CheckCircle,
  XCircle,
  Globe,
  FileText,
  Activity
} from 'lucide-react';

const suppliers = [
  {
    id: 'supplier-a',
    name: 'Supplier A',
    type: 'REST API',
    port: ':8085',
    source: 'SUPPLIER_A_REST',
    icon: <Globe size={16} />
  },
  {
    id: 'supplier-b',
    name: 'Supplier B',
    type: 'REST API — diff schema',
    port: ':8085',
    source: 'SUPPLIER_B_REST',
    icon: <Globe size={16} />
  },
  {
    id: 'supplier-c',
    name: 'Supplier C',
    type: 'CSV file drop',
    port: ':8085',
    source: 'SUPPLIER_C_CSV',
    icon: <FileText size={16} />
  }
];

const SupplierHealth = ({ products }) => {

  const getSupplierStatus = (source) => {
    if (!products || products.length === 0) return false;
    return products.some(p => p.source === source);
  };

  const getProductCount = (source) => {
    if (!products || products.length === 0) return 0;
    return products.filter(p => p.source === source).length;
  };

  return (
    <div className="health-card">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <Activity size={14} color="#64748b" />
        <p className="section-title" style={{ marginBottom: 0 }}>
          Supplier health
        </p>
      </div>

      {suppliers.map((supplier) => {
        const isUp = getSupplierStatus(supplier.source);
        const count = getProductCount(supplier.source);

        return (
          <div key={supplier.id} className="health-item">
            <div className="health-left">
              <div style={{ color: '#64748b' }}>
                {supplier.icon}
              </div>
              <div>
                <div className="health-name">{supplier.name}</div>
                <div className="health-type">
                  {supplier.type} {supplier.port}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                fontSize: '11px',
                color: '#4a5568',
                fontFamily: 'monospace'
              }}>
                {count} products
              </span>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {isUp ? (
                  <CheckCircle size={14} color="#4ade80" />
                ) : (
                  <XCircle size={14} color="#ef4444" />
                )}
                <span className={`health-badge ${isUp ? 'up' : 'down'}`}>
                  {isUp ? 'ACTIVE' : 'NO DATA'}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <div style={{
        marginTop: '16px',
        padding: '10px 12px',
        background: '#0f1117',
        borderRadius: '8px',
        border: '1px solid #1e2537',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '12px', color: '#4a5568' }}>
          Ingestion service
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: '#4ade80' }}>
            Apache Camel running
          </span>
        </div>
      </div>

    </div>
  );
};

export default SupplierHealth;