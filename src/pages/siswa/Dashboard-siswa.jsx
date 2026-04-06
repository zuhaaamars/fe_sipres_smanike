import React from 'react';
import { Mail, User, ChevronDown, QrCode, Clock, CheckCircle } from 'lucide-react';
import '../css/Dashboard-siswa.css';

const DashboardSiswa = () => {
  return (
    <div className="dashboard-content-inner">
      {/* Header Profile - Pojok Kanan Atas */}
      <header className="content-header">
        <div className="user-profile-dropdown">
          <div className="profile-info">
            <div className="user-avatar">
              <User size={18} strokeWidth={3} />
            </div>
            <span>Nama Siswa</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </header>

      {/* Teks Sambutan */}
      <h1 className="welcome-text">
        Halo, (Nama Siswa) ! Selamat datang di SIPRES SMANIKE !
      </h1>

      {/* Grid Utama - 3 Kolom Penuh [cite: 2] */}
      <div className="dashboard-grid">
        
        {/* Kartu 1: Ringkasan Surat (Alur Tkt 1) [cite: 1, 2] */}
        <div className="dashboard-card">
          <div className="card-header-box">
             <h3>Ringkasan Surat</h3>
             <p className="card-subtitle">Pantau alur ajuan surat Anda [cite: 4]</p>
          </div>
          <div className="card-body">
            <div className="flow-status waiting">
              <Clock size={16} /> <span>1 Menunggu Verifikasi TU [cite: 4]</span>
            </div>
            <div className="flow-status validated">
              <CheckCircle size={16} /> <span>2 Surat Telah divalidasi Kepsek [cite: 4]</span>
            </div>
          </div>
          <button className="btn-action blue">
            <Mail size={18} /> Buat Surat Baru
          </button>
        </div>

        {/* Kartu 2: Status Presensi Harian (Geofencing) [cite: 3, 4] */}
        <div className="dashboard-card">
          <div className="card-header-box">
            <h3>Status Presensi Harian</h3>
            <p className="card-subtitle">Radius 50m dari area sekolah [cite: 3, 4]</p>
          </div>
          <div className="card-body">
            <div className="status-row present">
              <span className="dot"></span>
              <p>Datang - 07.05 [cite: 2, 4]</p>
            </div>
            <div className="status-row not-yet">
              <span className="dot"></span>
              <p>Pulang - Belum [cite: 2, 4]</p>
            </div>
          </div>
          <button className="btn-action dark-teal">
            <QrCode size={18} /> Scan Barcode Harian [cite: 4]
          </button>
        </div>

        {/* Kartu 3: Status Presensi Mapel [cite: 1, 4] */}
        <div className="dashboard-card">
          <div className="card-header-box">
            <h3>Status Presensi Mapel</h3>
            <p className="card-subtitle">Scan setiap mulai & selesai mapel [cite: 4]</p>
          </div>
          <div className="card-body list-mapel">
            <div className="mapel-badge present">
              <span className="dot"></span>
              <p>Matematika (Hadir) [cite: 2]</p>
            </div>
            <div className="mapel-badge present">
              <span className="dot"></span>
              <p>Sejarah (Hadir) [cite: 2]</p>
            </div>
            <div className="mapel-badge present">
              <span className="dot"></span>
              <p>Ekonomi (Hadir) [cite: 2]</p>
            </div>
            <div className="mapel-badge not-yet">
              <span className="dot"></span>
              <p>Seni Budaya (Belum mulai)</p>
            </div>
          </div>
        </div>

        {/* Kartu 4: Pengumuman (Lebar Penuh) [cite: 2, 4] */}
        <div className="dashboard-card card-full">
          <div className="card-header-box">
            <h3>PENGUMUMAN SEKOLAH</h3>
          </div>
          <div className="announcement-placeholder">
            <p>Belum ada pengumuman terbaru</p>
          </div>
        </div>
      </div>

      {/* Footer Navigasi Sosial */}
      <footer className="dashboard-footer-content">
        <div className="social-icons">
          {/* Pastikan path icon sesuai dengan folder public Anda */}
          <img src="/icons/web.png" alt="" />
          <img src="/icons/fb.png" alt="" />
          <img src="/icons/ig.png" alt="" />
          <img src="/icons/yt.png" alt="" />
          <img src="/icons/tt.png" alt="" />
        </div>
        <p>© 2026 SMAN 1 Kedunggalar Ngawi. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};

export default DashboardSiswa;