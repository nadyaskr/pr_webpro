import { useState } from 'react';

export default function ServiceForm({ onAddService }) {
  const [namaPemilik, setNamaPemilik] = useState('');
  const [platNomor, setPlatNomor] = useState('');
  const [jenisKendaraan, setJenisKendaraan] = useState('Motor');
  const [layanan, setLayanan] = useState('');
  const [tanggal, setTanggal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namaPemilik || !platNomor || !layanan || !tanggal) return;

    const newService = {
      id: Date.now(),
      namaPemilik,
      platNomor,
      jenisKendaraan,
      layanan,
      tanggal,
      status: 'Menunggu'
    };

    onAddService(newService);

    setNamaPemilik('');
    setPlatNomor('');
    setJenisKendaraan('Motor');
    setLayanan('');
    setTanggal('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
      <h3>Tambah Jadwal Service Baru</h3>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Nama Pemilik"
          value={namaPemilik}
          onChange={(e) => setNamaPemilik(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Plat Nomor (cth: D 1234 ABC)"
          value={platNomor}
          onChange={(e) => setPlatNomor(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select 
          value={jenisKendaraan} 
          onChange={(e) => setJenisKendaraan(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="Motor">Motor</option>
          <option value="Mobil">Mobil</option>
        </select>
        <input
          type="text"
          placeholder="Jenis Layanan (cth: Ganti Oli, Tune Up)"
          value={layanan}
          onChange={(e) => setLayanan(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '0.6rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Simpan Jadwal
        </button>
      </div>
    </form>
  );
}