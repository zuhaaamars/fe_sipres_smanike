import React, { useState } from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';
import '../css/ScanQR-siswa.css';

const ScanQR = () => {
  const [hasil, setHasil] = useState(null);
  const [status, setStatus] = useState('');

  const handleScan = async (result) => {
    if (!result) return;

    try {
      // 🔹 Ambil data dari QR (JSON)
      const data = JSON.parse(result?.text);

      setHasil(data);
      setStatus('Mengirim presensi...');

      // 🔥 KIRIM KE BACKEND
      await axios.post('http://localhost:5000/api/presensi', data);

      setStatus('✅ Presensi berhasil!');
    } catch (error) {
      console.error(error);
      setStatus('❌ QR tidak valid / gagal kirim');
    }
  };

  return (
  <div className="scan-container">
    <h2 className="scan-title">Scan QR Presensi</h2>

    {/* CAMERA */}
    <div className="scan-card">
      <div className="scan-camera">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result);
            }
          }}
          style={{ width: '100%' }}
        />
      </div>

      <p className={`scan-status 
        ${status.includes('berhasil') ? 'scan-success' : ''} 
        ${status.includes('gagal') ? 'scan-error' : ''}`}>
        {status}
      </p>
    </div>

    {/* HASIL */}
    {hasil && (
      <div className="scan-card scan-result">
        <h3>Data Presensi</h3>
        <p><span>Mapel:</span> {hasil.mapel}</p>
        <p><span>Kelas:</span> {hasil.kelas}</p>
        <p><span>Jam:</span> {hasil.jam}</p>
      </div>
    )}
  </div>
);
};

export default ScanQR;