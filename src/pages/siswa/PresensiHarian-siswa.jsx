import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, MapPin, Navigation, History, 
  CheckCircle2, Clock, Map as MapIcon, RefreshCw, X 
} from 'lucide-react';
import '../css/ScanPresensiHarian.css';

const ScanPresensiHarian = () => {
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const [presensiStatus, setPresensiStatus] = useState('idle'); // idle, taking_photo, success
  const [currentTime, setCurrentTime] = useState(new Date());
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);

  // Update Jam Real-time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulasi Geofencing
  useEffect(() => {
    setIsWithinRadius(true); 
  }, []);

  // Fungsi Membuka Kamera & Langsung Ambil Foto (Simple Flow)
  const handlePresensiAction = async () => {
    if (presensiStatus === 'idle') {
      setPresensiStatus('taking_photo');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Gagal mengakses kamera: " + err);
        setPresensiStatus('idle');
      }
    } else if (presensiStatus === 'taking_photo' && !capturedImage) {
      // Ambil Foto
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL('image/png'));
      
      // Matikan Kamera
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const submitPresensi = () => {
    setPresensiStatus('success');
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setPresensiStatus('idle');
  };

  return (
    <div className="sph-container">
      <header className="sph-header">
        <div className="sph-header-title">
          <h1>PRESENSI HARIAN</h1>
          <p>SMAN 1 Kedunggalar - Presensi Geofencing</p>
        </div>
        <div className={`sph-location-badge ${isWithinRadius ? 'in' : 'out'}`}>
          <MapPin size={16} />
          <span>{isWithinRadius ? 'Dalam Area Sekolah' : 'Luar Area'}</span>
        </div>
      </header>

      <div className="sph-grid">
        <div className="sph-main-card">
          <div className="sph-time-section">
            <p className="sph-date-label">
              {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <h2 className="sph-digital-clock">
              {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </h2>
          </div>

          <div className="sph-qr-viewport">
            {presensiStatus === 'success' ? (
              <div className="sph-result-overlay">
                <CheckCircle2 size={70} color="#22c55e" />
                <h3>Presensi Berhasil!</h3>
                <p>Data telah diverifikasi berdasarkan lokasi & foto.</p>
                <button onClick={resetCamera} className="sph-btn-reset">Kembali</button>
              </div>
            ) : presensiStatus === 'taking_photo' ? (
              <div className="sph-camera-box">
                {!capturedImage ? (
                  <video ref={videoRef} autoPlay playsInline className="sph-video-feed" />
                ) : (
                  <div className="sph-preview-container">
                    <img src={capturedImage} alt="Preview" className="sph-captured-preview" />
                    <button onClick={resetCamera} className="sph-retake-btn"><X size={20} /></button>
                  </div>
                )}
              </div>
            ) : (
              <div className="sph-scanner-box">
                <Camera size={100} className={isWithinRadius ? 'sph-pulse' : 'sph-disabled'} />
                <p>{isWithinRadius ? 'Area Terdeteksi' : 'Fitur Terkunci (Luar Area)'}</p>
              </div>
            )}
          </div>

          <div className="sph-action-area">
            {/* Tombol Pintar: Berubah fungsi sesuai status */}
            {!capturedImage && presensiStatus !== 'success' && (
              <button 
                className="sph-btn-primary" 
                disabled={!isWithinRadius}
                onClick={handlePresensiAction}
              >
                <Camera size={18} /> 
                {presensiStatus === 'idle' ? 'BUKA KAMERA' : 'AMBIL FOTO SEKARANG'}
              </button>
            )}
            
            {capturedImage && presensiStatus === 'taking_photo' && (
              <button className="sph-btn-primary" onClick={submitPresensi}>
                <Navigation size={18} /> KIRIM SEKARANG
              </button>
            )}
          </div>
        </div>

        <div className="sph-side-panel">
          <div className="sph-info-card location-box">
            <div className="sph-card-header">
              <MapIcon size={18} /> <span>STATUS LOKASI</span>
              <button className="sph-btn-refresh"><RefreshCw size={14} /></button>
            </div>
            <div className="sph-coord">
              <p>LATITUDE <span>-7.603496</span></p>
              <p>LONGITUDE <span>111.550720</span></p>
            </div>
            <div className="sph-distance">
              <span className="dist-val">13.1</span> <span className="dist-unit">m</span>
              <p className="dist-label">Jarak ke Titik Sekolah</p>
            </div>
          </div>

          <div className="sph-info-card status-box">
             <div className="status-item">
                <div className="icon-in"><Clock size={16} /></div>
                <div>
                  <label>JAM DATANG</label>
                  <strong>06:45:12</strong>
                </div>
             </div>
             <div className="status-item">
                <div className="icon-out"><Clock size={16} /></div>
                <div>
                  <label>JAM PULANG</label>
                  <strong>-- : -- : --</strong>
                </div>
             </div>
          </div>

          <div className="sph-history-card">
            <div className="sph-card-header">
              <History size={18} /> <span>RIWAYAT TERAKHIR</span>
            </div>
            <div className="sph-hist-item">
              <div className="hist-date">02<span>APR</span></div>
              <div className="hist-info">Hadir - 07:02</div>
              <div className="hist-status success">Hadir</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPresensiHarian;