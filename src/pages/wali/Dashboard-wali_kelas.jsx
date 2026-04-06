import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  
  FileCheck, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2,
  Users
} from 'lucide-react';
import '../css/Dashboard-wali.css';

const DashboardWaliKelas = () => {
  const navigate = useNavigate();

  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Dashboard Wali Kelas</h1>
          <p>Monitoring Siswa & Verifikasi E-Surat</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Wali Kelas XII RPL 1</span>
            <strong>Budi Santoso, S.Kom</strong>
          </div>
          <div className="dg-avatar">W</div>
        </div>
      </header>

      {/* ACTION CARDS */}
      <div className="dg-action-grid">

        {/* VERIFIKASI SURAT */}
        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <FileCheck size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Verifikasi E-Surat</h3>
            <p>5 ajuan menunggu verifikasi</p>
            <button 
              className="dg-btn"
              onClick={() => navigate('/wali/DaftarAjuan')}
            >
              Periksa Sekarang <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* DATA SISWA */}
        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <Users size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Data Siswa</h3>
            <p>Lihat data lengkap siswa kelas</p>
            <button 
              className="dg-btn"
              onClick={() => navigate('/wali/DataSiswa')}
            >
              Lihat Data <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* MAIN LAYOUT */}
      <div className="dg-main-layout">

        {/* MONITORING SISWA */}
        <div className="dg-table-section">
          <div className="dg-section-title">
            <h2>Monitoring Kehadiran Kelas (XII RPL 1)</h2>
          </div>

          <div className="dg-table-card">
            <table className="dg-table">
              <thead>
                <tr>
                  <th>Nama Siswa</th>
                  <th>Status Harian</th>
                  <th>Status Mapel</th>
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

        {/* NOTIFIKASI */}
        <div className="dg-side-section">
          <div className="dg-section-title">
            <h2>Pemberitahuan</h2>
          </div>

          <div className="dg-notif-list">

            <div className="dg-notif-item alert">
              <AlertCircle size={18} />
              <p>4 siswa belum scan presensi mapel hari ini.</p>
            </div>

            <div className="dg-notif-item info">
              <CheckCircle2 size={18} />
              <p>3 surat telah diverifikasi dan dikirim ke kepala sekolah.</p>
            </div>

            <div className="dg-notif-item info">
              <CheckCircle2 size={18} />
              <p>Laporan kehadiran mingguan siap diunduh.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardWaliKelas;
