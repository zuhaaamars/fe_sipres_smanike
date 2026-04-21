import React, { useState } from 'react'; // Tambahkan useState
import {  
  FileCheck, 
  QrCode, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2,
  CalendarCheck, // Tambahkan ikon untuk piket
} from 'lucide-react';
import '../css/Dashboard-guru.css';

const DashboardGuru = () => {
  // --- LOGIKA FRONTEND ---
  // Sama dengan Sidebar, ubah ke false untuk simulasi guru biasa
  const [isPiket] = useState(true);

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
            <span>Wali Kelas XII RPL 1</span>
            <strong>Budi Santoso, S.Kom</strong>
          </div>
          <div className="dg-avatar">G</div>
        </div>
      </header>

      {/* QUICK ACTIONS */}
      <div className="dg-action-grid">
        {/* 1. VERIFIKASI SURAT (Tampil untuk semua Wali Kelas) */}
        <div className="dg-action-card">
          <div className="dg-icon-box orange"><FileCheck size={24} /></div>
          <div className="dg-action-content">
            <h3>Verifikasi E-Surat</h3>
            <p>5 Siswa mengajukan izin hari ini</p>
            <button className="dg-btn">Periksa Sekarang <ArrowRight size={16} /></button>
          </div>
        </div>

        {/* 2. PRESENSI HARIAN (HANYA MUNCUL JIKA GURU PIKET) */}
        {isPiket && (
          <div className="dg-action-card" style={{ borderLeft: '5px solid #3b82f6' }}>
            <div className="dg-icon-box blue" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
              <CalendarCheck size={24} />
            </div>
            <div className="dg-action-content">
              <h3>Petugas Piket</h3>
              <p>Generate QR Presensi Gerbang</p>
              <button className="dg-btn" style={{ backgroundColor: '#3b82f6' }}>Buka QR Harian <ArrowRight size={16} /></button>
            </div>
          </div>
        )}

        {/* 3. PRESENSI MAPEL (Semua Guru) */}
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
        {/* TABEL MONITORING SISWA */}
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

        {/* NOTIFIKASI SYSTEM */}
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