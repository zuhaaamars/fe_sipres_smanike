import React, { useState, useEffect } from 'react'; // ✅ tambah useEffect
import axios from 'axios'; // ✅ tambah axios
import {  
  FileCheck, 
  QrCode, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';
import '../css/Dashboard-guru.css';

const DashboardGuru = () => {

  const [isPiket] = useState(true);

  // ✅ STATE UNTUK NAMA & GELAR
  const [nama, setNama] = useState('');
  const [gelar, setGelar] = useState('');

  // ✅ AMBIL DATA DARI BACKEND
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setNama(res.data.data.nama_lengkap);
        setGelar(res.data.data.gelar);

      } catch (err) {
        console.log("Gagal ambil data user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="dg-container">
      {/* HEADER KHUSUS GURU */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Panel Kendali Guru</h1>
          <p>SMAN 1 Kedunggalar - Sistem Informasi Presensi & E-Surat</p>
        </div>
        <div className="dg-user-badge">
          <div className="dg-user-text">

            {/* ✅ DINAMIS DARI DATABASE */}
            <strong>
              {nama ? `${nama} ${gelar || ''}` : 'Loading...'}
            </strong>

          </div>
          <div className="dg-avatar">
          {nama ? nama.charAt(0).toUpperCase() : 'G'}
          </div>

        </div>
      </header>

      {/* QUICK ACTIONS */}
      <div className="dg-action-grid">
        <div className="dg-action-card">
          <div className="dg-icon-box orange"><FileCheck size={24} /></div>
          <div className="dg-action-content">
            <h3>Verifikasi E-Surat</h3>
            <p>5 Siswa mengajukan izin hari ini</p>
            <button className="dg-btn">Periksa Sekarang <ArrowRight size={16} /></button>
          </div>
        </div>

        {isPiket && (
          <div className="dg-action-card" style={{ borderLeft: '5px solid #3b82f6' }}>
            <div className="dg-icon-box blue" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
              <CalendarCheck size={24} />
            </div>
            <div className="dg-action-content">
              <h3>Petugas Piket</h3>
              <p>Generate QR Presensi Gerbang</p>
              <button className="dg-btn" style={{ backgroundColor: '#3b82f6' }}>
                Buka QR Harian <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="dg-action-card">
          <div className="dg-icon-box teal"><QrCode size={24} /></div>
          <div className="dg-action-content">
            <h3>Presensi Mapel</h3>
            <p>Generate QR </p>
            <button className="dg-btn">Buka Barcode <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>

      <div className="dg-main-layout">
        <div className="dg-table-section">
          <div className="dg-section-title">
            <h2>Monitoring Kehadiran Kelas (XII RPL 1)</h2>
          </div>
          <div className="dg-table-card">
            <table className="dg-table">
              <thead>
                <tr>
                  <th>Nama Siswa</th>
                  <th>Harian</th>
                  <th>Mapel (Saat Ini)</th>
                  <th>Waktu Scan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Aditya Pratama</td>
                  <td><span className="dg-badge hadir">Hadir</span></td>
                  <td><span className="dg-badge hadir">Masuk</span></td>
                  <td>07:05</td>
                </tr>
                <tr>
                  <td>Bina Reza Yuanda</td>
                  <td><span className="dg-badge hadir">Hadir</span></td>
                  <td><span className="dg-badge belum">Belum Scan</span></td>
                  <td>07:12</td>
                </tr>
                <tr>
                  <td>Siti Aminah</td>
                  <td><span className="dg-badge izin">Izin</span></td>
                  <td><span className="dg-badge izin">Izin</span></td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="dg-side-section">
          <div className="dg-section-title">
            <h2>Pemberitahuan</h2>
          </div>
          <div className="dg-notif-list">
            <div className="dg-notif-item alert">
              <AlertCircle size={18} />
              <p>4 Siswa terdeteksi di luar radius 50m saat scan.</p>
            </div>
            <div className="dg-notif-item info">
              <CheckCircle2 size={18} />
              <p>Laporan mingguan sudah siap diunduh.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGuru;
