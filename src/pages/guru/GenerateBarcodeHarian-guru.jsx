import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  RefreshCw, 
  Download, 
  Clock, 
  Users, 
  ArrowLeftRight 
} from 'lucide-react';
import '../css/GenerateBarcodeHarian.css'; // Kita buat satu CSS untuk semua jenis barcode agar efisien

const GenerateBarcodeHarian = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statusPresensi, setStatusPresensi] = useState('Masuk'); // Masuk atau Pulang

  // Update jam setiap detik
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="gb-container">
      <header className="gb-header">
        <div className="gb-header-text">
          <h1>Presensi Harian Siswa</h1>
          <p>Petugas Piket: <strong>Budi Santoso, S.Kom</strong></p>
        </div>
        <div className="gb-status-badge">
          <Clock size={18} />
          <span>{formatTime(currentTime)}</span>
        </div>
      </header>

      <div className="gb-main-card">
        <div className="gb-info-section">
          <div className="gb-info-item">
            <span className="label">Tanggal</span>
            <span className="value">{formatDate(currentTime)}</span>
          </div>
          <div className="gb-info-item">
            <span className="label">Tipe Presensi</span>
            <span className={`status-pill ${statusPresensi.toLowerCase()}`}>
              {statusPresensi}
            </span>
          </div>
        </div>

        <div className="gb-qr-wrapper">
          <div className="gb-qr-box">
            {/* Placeholder untuk QR Code (Bisa diintegrasikan dengan library qrcode.react nanti) */}
            <QrCode size={250} strokeWidth={1.5} color="#0f3d3a" />
            <div className="gb-qr-overlay">
              <span>SCAN ME</span>
            </div>
          </div>
          <p className="gb-qr-instruction">Arahkan kamera siswa ke kode QR di atas</p>
        </div>

        <div className="gb-controls">
          <button 
            className="gb-btn secondary"
            onClick={() => setStatusPresensi(statusPresensi === 'Masuk' ? 'Pulang' : 'Masuk')}
          >
            <ArrowLeftRight size={18} />
            Ganti ke Presensi {statusPresensi === 'Masuk' ? 'Pulang' : 'Masuk'}
          </button>
          
          <button className="gb-btn primary">
            <RefreshCw size={18} />
            Perbarui Kode
          </button>
        </div>
      </div>

      <div className="gb-stats-grid">
        <div className="gb-stat-card">
          <Users size={20} />
          <div className="stat-text">
            <span>Total Hadir Hari Ini</span>
            <strong>420 Siswa</strong>
          </div>
        </div>
        <button className="gb-btn-download">
          <Download size={18} /> Cetak Barcode
        </button>
      </div>
    </div>
  );
};

export default GenerateBarcodeHarian;