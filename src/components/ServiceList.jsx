import ServiceCard from './ServiceCard.jsx';

export default function ServiceList({ services, onToggleStatus, onDelete }) {
  if (services.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b', background: '#f8fafc', borderRadius: '8px' }}>
        <p>Belum ada antrean jadwal service kendaraan saat ini.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>Daftar Antrean Service ({services.length})</h3>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}