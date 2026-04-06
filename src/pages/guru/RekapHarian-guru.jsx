import React, { useState } from 'react';
import { 
  Search, Filter, Download, Calendar, Users, 
  UserCheck, UserMinus, Clock, CheckCircle, 
  MessageCircle, MapPin, Eye, XCircle
} from 'lucide-react';
import '../css/RekapHarian-guru.css';

const RekapHarianGuru = () => {
  const [dataRekap, setDataRekap] = useState([
    { 
      id: 1, nis: '24001', nama: 'Aditya Pratama', kelas: 'XII RPL 1', 
      waktuMasuk: '06:45', waktuPulang: '15:30', status: 'Hadir', wa: 'Terkirim', 
      jarak: '12m', foto: 'https://via.placeholder.com/150', validated: true 
    },
    { 
      id: 2, nis: '24002', nama: 'Bina Reza Yuanda', kelas: 'XII RPL 1', 
      waktuMasuk: '07:15', waktuPulang: '--:--', status: 'Terlambat', wa: 'Terkirim', 
      jarak: '45m', foto: 'https://via.placeholder.com/150', validated: false 
    },
    { 
      id: 3, nis: '24005', nama: 'Rizky Ramadhan', kelas: 'X DKV 3', 
      waktuMasuk: '-', waktuPulang: '-', status: 'Alpa', wa: 'Pending', 
      jarak: '-', foto: null, validated: false 
    },
  ]);

  const handleValidate = (id) => {
    setDataRekap(dataRekap.map(item => 
      item.id === id ? { ...item, validated: !item.validated } : item
    ));
  };

  return (
    <div className="rh-full-wrapper"> {/* Container Full Width */}
      <div className="rh-container">
        <header className="rh-header">
          <div className="rh-header-info">
            <h1>Rekap Presensi Harian</h1>
            <p>Validasi kehadiran berdasarkan NIS, Selfie, dan Geofencing </p>
          </div>
          <div className="rh-header-actions">
            <button className="rh-btn secondary"><Calendar size={18} /> 2 Apr 2026</button>
            <button className="rh-btn primary"><Download size={18} /> Export Laporan</button>
          </div>
        </header>

        {/* STATS SECTION */}
        <div className="rh-stats-grid">
          <div className="rh-stat-card total">
            <div className="rh-stat-icon"><Users size={22} /></div>
            <div className="rh-stat-info"><span>Total Siswa</span><h3>1.240</h3></div>
          </div>
          <div className="rh-stat-card hadir">
            <div className="rh-stat-icon"><UserCheck size={22} /></div>
            <div className="rh-stat-info"><span>Hadir</span><h3>1.150</h3></div>
          </div>
          <div className="rh-stat-card pending">
            <div className="rh-stat-icon"><Clock size={22} /></div>
            <div className="rh-stat-info"><span>Belum Valid</span><h3>15</h3></div>
          </div>
          <div className="rh-stat-card alpa">
            <div className="rh-stat-icon"><UserMinus size={22} /></div>
            <div className="rh-stat-info"><span>Alpha</span><h3>30</h3></div>
          </div>
        </div>

        {/* FILTER SECTION */}
        <div className="rh-filter-section">
          <div className="rh-search-box">
            <Search size={18} />
            <input type="text" placeholder="Cari NIS atau nama..." />
          </div>
          <div className="rh-filter-options">
            <select className="rh-select">
              <option>Semua Kelas</option>
              <option>XII RPL 1</option>
            </select>
            <button className="rh-btn-icon"><Filter size={18} /></button>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="rh-table-card">
          <div className="rh-table-wrapper">
            <table className="rh-table">
              <thead>
                <tr>
                  <th>NIS</th>
                  <th>Siswa & Bukti</th>
                  <th>Waktu Masuk</th>
                  <th>Waktu Pulang</th>
                  <th>Lokasi (Geo)</th>
                  <th>Status</th>
                  <th>Notif WA</th>
                  <th>Verifikasi</th>
                </tr>
              </thead>
              <tbody>
                {dataRekap.map((item) => (
                  <tr key={item.id}>
                    <td className="rh-col-nis">
                      <span className="rh-nis-badge">{item.nis}</span>
                    </td>
                    <td>
                      <div className="rh-student-cell">
                        <div className="rh-avatar-wrapper">
                          {item.foto ? (
                            <img src={item.foto} alt="Selfie" className="rh-student-photo" />
                          ) : (
                            <div className="rh-no-photo"><XCircle size={20} /></div>
                          )}
                        </div>
                        <div className="rh-student-info">
                          <span className="rh-student-name">{item.nama}</span>
                          <span className="rh-student-kelas">{item.kelas}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="rh-time masuk">{item.waktuMasuk}</span></td>
                    <td><span className="rh-time pulang">{item.waktuPulang}</span></td>
                    <td>
                      <div className="rh-geo-info">
                        <MapPin size={14} color={item.jarak !== '-' ? '#22c55e' : '#ef4444'} />
                        <span>{item.jarak}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`rh-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className={`rh-wa-pill ${item.wa.toLowerCase()}`}>
                        <MessageCircle size={14} />
                        <span>{item.wa}</span>
                      </div>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleValidate(item.id)}
                        className={`rh-btn-vld ${item.validated ? 'active' : ''}`}
                      >
                        {item.validated ? <CheckCircle size={16} /> : <Eye size={16} />}
                        {item.validated ? 'Valid' : 'Cek'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapHarianGuru;