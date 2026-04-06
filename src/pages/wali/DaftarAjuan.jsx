import React from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import '../css/DaftarAjuan-wali.css';

const AjuanSuratWali = () => {

  const dataAjuan = [
    {
      id: 1,
      nama: "Aditya Pratama",
      jenis: "Surat Izin",
      tanggal: "02 Apr 2026",
      status: "Menunggu"
    },
    {
      id: 2,
      nama: "Siti Aminah",
      jenis: "Surat Dispensasi",
      tanggal: "01 Apr 2026",
      status: "Menunggu"
    },
    {
      id: 3,
      nama: "Bina Reza",
      jenis: "Surat Aktif Sekolah",
      tanggal: "31 Mar 2026",
      status: "Menunggu"
    }
  ];

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Daftar Ajuan Surat</h1>
          <p>Verifikasi pengajuan dari siswa</p>
        </div>
      </header>

      {/* TABLE */}
      <div className="dg-table-card">
        <table className="dg-table">
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Jenis Surat</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {dataAjuan.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td>
                <td>{item.jenis}</td>
                <td>{item.tanggal}</td>
                <td>
                  <span className="dg-badge belum">
                    {item.status}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '10px' }}>
                  
                  {/* LIHAT DETAIL */}
                  <button className="dg-btn">
                    <Eye size={16} /> Detail
                  </button>

                  {/* SETUJUI */}
                  <button 
                    className="dg-btn" 
                    style={{ backgroundColor: '#16a34a' }}
                  >
                    <CheckCircle size={16} /> Setujui
                  </button>

                  {/* TOLAK */}
                  <button 
                    className="dg-btn" 
                    style={{ backgroundColor: '#dc2626' }}
                  >
                    <XCircle size={16} /> Tolak
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default AjuanSuratWali;
