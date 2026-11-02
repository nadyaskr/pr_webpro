export default function ServiceCard({ service, onToggleStatus, onDelete }) {
  const isSelesai = service.status === 'Selesai';

  return (
    <div style={{ 
      border: '1px solid #cbd5e1', 
      borderRadius: '8px', 
      padding: '1rem', 
      backgroundColor: isSelesai ? '#f0fdf4' : '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>{service.namaPemilik} ({service.platNomor})</h4>
        <p style={{ margin: '0.2rem 0', color: '#475569' }}><strong>Kendaraan:</strong> {service.jenisKendaraan}</p>
        <p style={{ margin: '0.2rem 0', color: '#475569' }}><strong>Layanan:</strong> {service.layanan}</p>
        <p style={{ margin: '0.2rem 0', color: '#475569' }}><strong>Tanggal:</strong> {service.tanggal}</p>
        <span style={{ 
          display: 'inline-block', 
          marginTop: '0.5rem', 
          padding: '0.2rem 0.6rem', 
          borderRadius: '4px', 
          fontSize: '0.85rem',
          backgroundColor: isSelesai ? '#bbf7d0' : '#fef08a',
          color: isSelesai ? '#166534' : '#854d0e',
          fontWeight: 'bold'
        }}>
          {service.status}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        <button 
          onClick={() => onToggleStatus(service.id)} 
          style={{ padding: '0.4rem 0.8rem', backgroundColor: isSelesai ? '#64748b' : '#16a34a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {isSelesai ? 'Batal Selesai' : 'Tandai Selesai'}
        </button>
        <button 
          onClick={() => onDelete(service.id)} 
          style={{ padding: '0.4rem 0.8rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}