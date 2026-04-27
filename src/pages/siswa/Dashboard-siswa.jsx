import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, User, ChevronDown, QrCode, Clock, CheckCircle } from 'lucide-react';
import '../css/Dashboard-siswa.css';

const DashboardSiswa = () => {

  const [nama, setNama] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setNama(res.data.data.nama_lengkap);

      } catch (err) {
        console.error("Gagal ambil user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="dashboard-content-inner">
      
      {/* Header Profile - Pojok Kanan Atas */}
      <header className="content-header">
        <div className="user-profile-dropdown">
          <div className="profile-info">
            <div className="user-avatar">
              <User size={18} strokeWidth={3} />
            </div>
            <span>{nama || "Nama Siswa"}</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </header>

      {/* Teks Sambutan */}
      <h1 className="welcome-text">
        Halo, {nama || "(Nama Siswa)"} ! Selamat datang di SIPRES SMANIKE !
      </h1>

      {/* Grid Utama */}
      <div className="dashboard-grid">
        
        <div className="dashboard-card">
          <div className="card-header-box">
             <h3>Ringkasan Surat</h3>
             <p className="card-subtitle">Pantau alur ajuan surat Anda</p>
          </div>
          <div className="card-body">
            <div className="flow-status waiting">
              <Clock size={16} /> <span>1 Menunggu Verifikasi TU</span>
            </div>
            <div className="flow-status validated">
              <CheckCircle size={16} /> <span>2 Surat Telah divalidasi Kepsek</span>
            </div>
          </div>
          <button className="btn-action blue">
            <Mail size={18} /> Buat Surat Baru
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-header-box">
            <h3>Status Presensi Harian</h3>
            <p className="card-subtitle">Radius 50m dari area sekolah</p>
          </div>
          <div className="card-body">
            <div className="status-row present">
              <span className="dot"></span>
              <p>Datang - 07.05</p>
            </div>
            <div className="status-row not-yet">
              <span className="dot"></span>
              <p>Pulang - Belum</p>
            </div>
          </div>
          <button className="btn-action dark-teal">
            <QrCode size={18} /> Scan Barcode Harian
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-header-box">
            <h3>Status Presensi Mapel</h3>
            <p className="card-subtitle">Scan setiap mulai & selesai mapel</p>
          </div>
          <div className="card-body list-mapel">
            <div className="mapel-badge present">
              <span className="dot"></span>
              <p>Matematika (Hadir)</p>
            </div>
            <div className="mapel-badge present">
              <span className="dot"></span>
              <p>Sejarah (Hadir)</p>
            </div>
            <div className="mapel-badge present">
              <span className="dot"></span>
              <p>Ekonomi (Hadir)</p>
            </div>
            <div className="mapel-badge not-yet">
              <span className="dot"></span>
              <p>Seni Budaya (Belum mulai)</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card card-full">
          <div className="card-header-box">
            <h3>PENGUMUMAN SEKOLAH</h3>
          </div>
          <div className="announcement-placeholder">
            <p>Belum ada pengumuman terbaru</p>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer-content">
        <div className="social-icons">
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
