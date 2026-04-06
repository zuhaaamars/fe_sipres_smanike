import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  RefreshCw, 
  BookOpen, 
  Users, 
  Clock, 
  Play
} from 'lucide-react';
import '../css/GenerateBarcodeMapel.css'; // Menggunakan base CSS yang sama dengan Harian

const GenerateBarcodeMapel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStarted, setIsStarted] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedMapel, setSelectedMapel] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartPresensi = () => {
    if (selectedClass && selectedMapel) {
      setIsStarted(true);
    } else {
      alert("Silakan pilih Kelas dan Mata Pelajaran terlebih dahulu!");
    }
  };

  return (
    <div className="gb-container">
      <header className="gb-header">
        <div className="gb-header-text">
          <h1>Presensi Mata Pelajaran</h1>
          <p>Guru Pengajar: <strong>Budi Santoso, S.Kom</strong></p>
        </div>
        <div className="gb-status-badge">
          <Clock size={18} />
          <span>{currentTime.toLocaleTimeString('id-ID')}</span>
        </div>
      </header>

      <div className="gb-main-card">
        {!isStarted ? (
          /* FORM PEMILIHAN SEBELUM START */
          <div className="gb-setup-form">
            <div className="gb-icon-circle">
              <BookOpen size={40} color="#1a746b" />
            </div>
            <h2>Mulai Sesi Mengajar</h2>
            <p>Tentukan kelas dan mata pelajaran sebelum menampilkan barcode.</p>
            
            <div className="gb-form-group">
              <label>Pilih Mata Pelajaran</label>
              <select value={selectedMapel} onChange={(e) => setSelectedMapel(e.target.value)}>
                <option value="">-- Pilih Mapel --</option>
                <option value="Pemrograman Web">Pemrograman Web</option>
                <option value="Basis Data">Basis Data</option>
                <option value="Mobile Apps">Mobile Apps</option>
              </select>
            </div>

            <div className="gb-form-group">
              <label>Pilih Kelas</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="">-- Pilih Kelas --</option>
                <option value="XII RPL 1">XII RPL 1</option>
                <option value="XII RPL 2">XII RPL 2</option>
                <option value="XI RPL 1">XI RPL 1</option>
              </select>
            </div>

            <button className="gb-btn-start" onClick={handleStartPresensi}>
              <Play size={18} /> Mulai Presensi
            </button>
          </div>
        ) : (
          /* TAMPILAN BARCODE SAAT SUDAH START */
          <div className="gb-active-session">
            <div className="gb-info-section">
              <div className="gb-info-item">
                <span className="label">Mata Pelajaran</span>
                <span className="value">{selectedMapel}</span>
              </div>
              <div className="gb-info-item">
                <span className="label">Kelas</span>
                <span className="value">{selectedClass}</span>
              </div>
            </div>

            <div className="gb-qr-wrapper">
              <div className="gb-qr-box active">
                <QrCode size={250} strokeWidth={1.5} color="#0f3d3a" />
                <div className="gb-qr-overlay">MAPEL SCAN</div>
              </div>
              <p className="gb-qr-instruction">Siswa silakan scan untuk absen masuk kelas</p>
            </div>

            <div className="gb-controls">
              <button className="gb-btn secondary" onClick={() => setIsStarted(false)}>
                Selesaikan Sesi
              </button>
              <button className="gb-btn primary">
                <RefreshCw size={18} /> Refresh QR
              </button>
            </div>
          </div>
        )}
      </div>

      {isStarted && (
        <div className="gb-stats-grid">
          <div className="gb-stat-card">
            <Users size={20} />
            <div className="stat-text">
              <span>Sudah Absen</span>
              <strong>28 / 36 Siswa</strong>
            </div>
          </div>
          <div className="gb-live-indicator">
            <span className="dot"></span> Live Monitoring
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateBarcodeMapel;