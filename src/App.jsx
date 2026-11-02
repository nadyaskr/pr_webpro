import { useState, useEffect } from 'react';

function Header() {
  return (
    <header style={{ 
      padding: '1.5rem', 
      backgroundColor: '#0f172a', 
      color: '#ffffff', 
      borderRadius: '12px', 
      marginBottom: '1.5rem', 
      textAlign: 'center',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: '700', margin: '0 0 0.4rem 0' }}>
        Sistem Penjadwalan Service Kendaraan
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
        Kelola jadwal perawatan berkala kendaraan kamu dengan mudah
      </p>
    </header>
  );
}

function ServiceSummary({ services }) {
  const total = services.length;
  const selesai = services.filter((s) => s.status === 'Selesai').length;
  const menunggu = total - selesai;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '10px', border: '1px solid #bae6fd', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.5rem' }}>{total}</h3>
        <span style={{ color: '#0369a1', fontSize: '0.85rem', fontWeight: '600' }}>Total Antrean</span>
      </div>
      <div style={{ background: '#fefce8', padding: '1rem', borderRadius: '10px', border: '1px solid #fef08a', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: '#ca8a04', fontSize: '1.5rem' }}>{menunggu}</h3>
        <span style={{ color: '#a16207', fontSize: '0.85rem', fontWeight: '600' }}>Dalam Proses</span>
      </div>
      <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
        <h3 style={{ margin: 0, color: '#16a34a', fontSize: '1.5rem' }}>{selesai}</h3>
        <span style={{ color: '#15803d', fontSize: '0.85rem', fontWeight: '600' }}>Selesai</span>
      </div>
    </div>
  );
}

function ServiceForm({ onSaveService, editingService, onCancelEdit }) {
  const [namaPemilik, setNamaPemilik] = useState('');
  const [platNomor, setPlatNomor] = useState('');
  const [jenisKendaraan, setJenisKendaraan] = useState('Motor');
  const [layanan, setLayanan] = useState('');
  const [tanggal, setTanggal] = useState('');

  useEffect(() => {
    if (editingService) {
      setNamaPemilik(editingService.namaPemilik);
      setPlatNomor(editingService.platNomor);
      setJenisKendaraan(editingService.jenisKendaraan);
      setLayanan(editingService.layanan);
      setTanggal(editingService.tanggal);
    } else {
      resetForm();
    }
  }, [editingService]);

  const resetForm = () => {
    setNamaPemilik('');
    setPlatNomor('');
    setJenisKendaraan('Motor');
    setLayanan('');
    setTanggal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namaPemilik || !platNomor || !layanan || !tanggal) return;

    const dataService = {
      id: editingService ? editingService.id : Date.now(),
      namaPemilik,
      platNomor,
      jenisKendaraan,
      layanan,
      tanggal,
      status: editingService ? editingService.status : 'Menunggu'
    };

    onSaveService(dataService);
    resetForm();
  };

  const inputStyle = {
    padding: '0.65rem 0.8rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.9rem',
    outline: 'none'
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.1rem' }}>
        {editingService ? 'Edit Data Service' : 'Form Tambah Jadwal Service'}
      </h3>
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        <input
          type="text"
          placeholder="Nama Pemilik"
          value={namaPemilik}
          onChange={(e) => setNamaPemilik(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Plat Nomor"
          value={platNomor}
          onChange={(e) => setPlatNomor(e.target.value)}
          required
          style={inputStyle}
        />
        <select 
          value={jenisKendaraan} 
          onChange={(e) => setJenisKendaraan(e.target.value)}
          style={inputStyle}
        >
          <option value="Motor">Motor</option>
          <option value="Mobil">Mobil</option>
        </select>
        <input
          type="text"
          placeholder="Jenis Layanan"
          value={layanan}
          onChange={(e) => setLayanan(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          required
          style={inputStyle}
        />
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
          <button 
            type="submit" 
            style={{ 
              flex: 1, 
              padding: '0.65rem', 
              backgroundColor: editingService ? '#d97706' : '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            {editingService ? 'Simpan Perubahan' : 'Tambah Jadwal'}
          </button>
          {editingService && (
            <button 
              type="button" 
              onClick={onCancelEdit} 
              style={{ padding: '0.65rem 1rem', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Batal
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function ServiceCard({ service, onToggleStatus, onEdit, onDelete }) {
  const isSelesai = service.status === 'Selesai';

  return (
    <div style={{ 
      border: '1px solid #e2e8f0', 
      borderRadius: '8px', 
      padding: '1rem', 
      backgroundColor: isSelesai ? '#f8fafc' : '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.8rem',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
    }}>
      <div>
        <h4 style={{ margin: '0 0 0.4rem 0', color: '#0f172a', fontSize: '1rem' }}>
          {service.namaPemilik} <span style={{ color: '#64748b', fontWeight: 'normal', fontSize: '0.9rem' }}>({service.platNomor})</span>
        </h4>
        <p style={{ margin: '0.2rem 0', color: '#475569', fontSize: '0.85rem' }}><strong>Kendaraan:</strong> {service.jenisKendaraan}</p>
        <p style={{ margin: '0.2rem 0', color: '#475569', fontSize: '0.85rem' }}><strong>Layanan:</strong> {service.layanan}</p>
        <p style={{ margin: '0.2rem 0', color: '#475569', fontSize: '0.85rem' }}><strong>Tanggal:</strong> {service.tanggal}</p>
        <span style={{ 
          display: 'inline-block', 
          marginTop: '0.4rem', 
          padding: '0.15rem 0.5rem', 
          borderRadius: '4px', 
          fontSize: '0.75rem',
          backgroundColor: isSelesai ? '#dcfce7' : '#fef9c3',
          color: isSelesai ? '#15803d' : '#854d0e',
          fontWeight: '600'
        }}>
          {service.status}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column' }}>
        <button 
          onClick={() => onToggleStatus(service.id)} 
          style={{ padding: '0.35rem 0.7rem', backgroundColor: isSelesai ? '#64748b' : '#16a34a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
        >
          {isSelesai ? 'Batal Selesai' : 'Tandai Selesai'}
        </button>
        <button 
          onClick={() => onEdit(service)} 
          style={{ padding: '0.35rem 0.7rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(service.id)} 
          style={{ padding: '0.35rem 0.7rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

function ServiceList({ services, onToggleStatus, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filteredServices = services.filter((service) => {
    const matchSearch = service.namaPemilik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        service.platNomor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Semua' ? true : service.status === filterStatus;
    
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          placeholder="Cari nama pemilik / plat nomor..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 2, padding: '0.5rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
        />
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ flex: 1, padding: '0.5rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
        >
          <option value="Semua">Semua Status</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>

      {filteredServices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Tidak ada antrean service yang ditemukan.</p>
        </div>
      ) : (
        filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onToggleStatus={onToggleStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default function App() {
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('jadwal_service_v5');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 1,
        namaPemilik: 'Farras',
        platNomor: 'D 1234 ABC',
        jenisKendaraan: 'Mobil',
        layanan: 'Ganti Oli & Service Rutin',
        tanggal: '2026-11-05',
        status: 'Menunggu'
      }
    ];
  });

  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    localStorage.setItem('jadwal_service_v5', JSON.stringify(services));
  }, [services]);

  const handleSaveService = (serviceData) => {
    if (editingService) {
      setServices(services.map((s) => (s.id === serviceData.id ? serviceData : s)));
      setEditingService(null);
    } else {
      setServices([...services, serviceData]);
    }
  };

  const handleToggleStatus = (id) => {
    setServices(
      services.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Menunggu' ? 'Selesai' : 'Menunggu' }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setServices(services.filter((item) => item.id !== id));
    if (editingService && editingService.id === id) {
      setEditingService(null);
    }
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Header />
      <ServiceSummary services={services} />
      <ServiceForm 
        onSaveService={handleSaveService} 
        editingService={editingService}
        onCancelEdit={() => setEditingService(null)}
      />
      <ServiceList
        services={services}
        onToggleStatus={handleToggleStatus}
        onEdit={(service) => setEditingService(service)}
        onDelete={handleDelete}
      />
    </div>
  );
}