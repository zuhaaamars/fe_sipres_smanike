import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import axios from 'axios';
import { Camera, CheckCircle2, Loader2 } from 'lucide-react';
import '../css/PresensiMapel-siswa.css';

const PresensiMapelSiswa = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const scannerRef = useRef(null);

  // ==============================
  // START SCAN
  // ==============================
  const handleStartScan = async () => {
    console.log("Mencoba memulai...");

    setShowScanner(true);
    setIsScanning(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Browser tidak support kamera");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());

      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (text) => {
          html5QrCode.stop();
          handleSuccessFlow(text);
        }
      );

    } catch (err) {
      console.error("Error:", err);
      alert("Kamera Error: " + err.message);
      setIsScanning(false);
      setShowScanner(false);
    }
  };

  // ==============================
  // STOP SCANNER
  // ==============================
  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      }
    } catch (err) {
      console.log("Scanner sudah berhenti");
    }
  };

  // ==============================
  // SUCCESS FLOW
  // ==============================
  const handleSuccessFlow = async (data) => {
    setIsScanning(false);
    setShowScanner(false);
    setIsProcessing(true);

    try {
      const token = localStorage.getItem('token');

      let presensi_id = null;
      if (data.includes('|')) {
        const parts = data.split('|');
        if (parts.length >= 5) {
          presensi_id = parts[0];
        }
      }

      const response = await axios.post(
        'http://localhost:5000/api/presensi/mapel',
        {
          qr_code: data,
          presensi_id: presensi_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setScanResult({
        message: response.data.message,
        raw: data
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal presensi");
    } finally {
      setIsProcessing(false);
    }
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

          {/* ============================== */}
          {/* SCANNER */}
          {/* ============================== */}
          {showScanner && (
            <div className="scanner-fullscreen">

              <div id="reader" className="scanner-box"></div>

              <div className="barcode-overlay">
                <p>Arahkan kamera ke QR guru</p>
              </div>

              <button
                className="close-scanner"
                onClick={() => {
                  stopScanner();
                  setShowScanner(false);
                  setIsScanning(false);
                }}
              >
                Tutup
              </button>

            </div>
          )}

          {/* ============================== */}
          {/* LOADING */}
          {/* ============================== */}
          {isProcessing && (
            <div className="pm-status-display">
              <Loader2 className="animate-spin" size={48} />
              <p>Memverifikasi data kehadiran...</p>
            </div>
          )}

          {/* ============================== */}
          {/* SUCCESS */}
          {/* ============================== */}
          {scanResult && (
            <div className="pm-status-display success-fade-in">
              <CheckCircle2 size={60} color="#22c55e" />
              <h3>Absensi Berhasil!</h3>

              <p><strong>{scanResult.message}</strong></p>

              {scanResult.raw && scanResult.raw.includes('|') && (() => {
                const parts = scanResult.raw.split('|');

                return (
                  <>
                    <p>Mapel: {parts[1]}</p>
                    <p>Kelas: {parts[2]}</p>
                    <p>Jam: {parts[3]}</p>
                    <p>Waktu: {new Date().toLocaleTimeString()}</p>
                  </>
                );
              })()}

              <button
                className="pm-btn-outline"
                onClick={() => setScanResult(null)}
              >
                Scan Lagi
              </button>
            </div>
          )}

          {/* ============================== */}
          {/* PLACEHOLDER */}
          {/* ============================== */}
          {!isScanning && !scanResult && !isProcessing && (
            <div className="pm-camera-placeholder">
              <Camera size={48} />
              <p>Kamera siap digunakan</p>
            </div>
          )}

          {/* ============================== */}
          {/* BUTTON */}
          {/* ============================== */}
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
