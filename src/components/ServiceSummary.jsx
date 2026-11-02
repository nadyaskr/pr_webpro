export default function ServiceSummary({ services }) {
  const total = services.length;
  const selesai = services.filter((s) => s.status === 'Selesai').length;
  const menunggu = total - selesai;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
      <div style={{ background: '#e0f2fe', padding: '1rem', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, color: '#0369a1' }}>{total}</h3>
        <small>Total Antrean</small>
      </div>
      <div style={{ background: '#fef9c3', padding: '1rem', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, color: '#a16207' }}>{menunggu}</h3>
        <small>Proses/Menunggu</small>
      </div>
      <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, color: '#15803d' }}>{selesai}</h3>
        <small>Selesai</small>
      </div>
    </div>
  );
}