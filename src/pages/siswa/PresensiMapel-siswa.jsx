import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import '../css/PresensiMapel-siswa.css';

const PresensiMapelSiswa = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // Simulasi loading backend

  // Fungsi Utama Jalankan Kamera
  const handleStartScan = async () => {
  console.log("Mencoba memulai...");
  setIsScanning(true);

  try {
    // 1. Cek apakah browser mendukung getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Browser kamu tidak mendukung akses kamera. Gunakan Chrome/Edge terbaru.");
      return;
    }

    // 2. Minta izin kamera secara manual (pancingan)
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    console.log("Izin diberikan, menghentikan stream sementara untuk library...");
    stream.getTracks().forEach(track => track.stop()); // Matikan pancingan

    // 3. Jalankan library scanner
    const html5QrCode = new Html5Qrcode("reader");
    await html5QrCode.start(
      { facingMode: "user" }, 
      { fps: 10, qrbox: 250 },
      (text) => {
        html5QrCode.stop();
        handleSuccessFlow(text);
      }
    );
  } catch (err) {
    console.error("Error Lengkap:", err);
    // Jika muncul alert ini, berarti masalahnya ada di izin browser atau hardware
    alert("Kamera Error: " + err.name + " - " + err.message);
    setIsScanning(false);
  }
};

  // Simulasi alur pengiriman ke Backend
  const handleSuccessFlow = (data) => {
    setIsScanning(false);
    setIsProcessing(true); // Mulai loading "palsu"

    // Simulasi delay jaringan selama 1.5 detik
    setTimeout(() => {
      setIsProcessing(false);
      setScanResult(data);
    }, 1500);
  };

  return (
    <div className="pm-siswa-container">
      <header className="pm-siswa-header">
        <div className="pm-header-left">
          <h1>PRESENSI MATA PELAJARAN</h1>
          <p>Scan barcode guru untuk melakukan absensi kehadiran</p>
        </div>
      </header>

      <div className="pm-siswa-content">
        <div className="pm-main-card">
          <div className="pm-scan-area">
            {/* Elemen Reader tetap ada untuk wadah kamera */}
            <div id="reader" style={{ 
              width: '100%', 
              minHeight: isScanning ? '300px' : '0px',
              display: isScanning ? 'block' : 'none' 
            }}></div>
            
            {/* Tampilan Loading saat simulasi kirim data */}
            {isProcessing && (
              <div className="pm-status-display">
                <Loader2 className="animate-spin" size={48} color="#1a746b" />
                <p>Memverifikasi data kehadiran...</p>
              </div>
            )}

            {/* Tampilan Sukses */}
            {scanResult && (
              <div className="pm-status-display success-fade-in">
                <CheckCircle2 size={60} color="#22c55e" />
                <h3>Absensi Berhasil!</h3>
                <p>Kode Mapel: <strong>{scanResult}</strong></p>
                <button className="pm-btn-outline" onClick={() => setScanResult(null)}>
                  Scan Lagi
                </button>
              </div>
            )}

            {/* Tampilan Awal (Placeholder) */}
            {!isScanning && !scanResult && !isProcessing && (
              <div className="pm-camera-placeholder">
                <Camera size={48} />
                <p>Kamera siap digunakan</p>
              </div>
            )}
          </div>

          {/* Tombol Aktifkan Kamera hanya muncul jika tidak sedang scan/processing */}
          {!isScanning && !scanResult && !isProcessing && (
            <button className="pm-btn-primary" onClick={handleStartScan}>
              <Camera size={20} /> AKTIFKAN KAMERA
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresensiMapelSiswa;