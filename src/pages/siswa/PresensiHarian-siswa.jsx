import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Camera, MapPin, Navigation, History, 
  CheckCircle2, Clock, RefreshCw, Map as MapIcon 
} from 'lucide-react';
import '../css/ScanPresensiHarian.css';

const ScanPresensiHarian = () => {
  const [isWithinRadius, setIsWithinRadius] = useState(false);
  const [presensiStatus, setPresensiStatus] = useState('idle');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [capturedImage, setCapturedImage] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsWithinRadius(true); // Simulasi radius
      });
    }
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const savedId = localStorage.getItem('profile_id');
    if (savedId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/presensi/riwayat/${savedId}`);
        if (response.data.status === 'success') {
          setHistory(response.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil riwayat:", err);
      }
    }
  };

  const handlePresensiAction = async () => {
    if (presensiStatus === 'idle') {
      setPresensiStatus('taking_photo');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        alert("Kamera tidak akses: " + err);
        setPresensiStatus('idle');
      }
    } else if (presensiStatus === 'taking_photo' && !capturedImage) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL('image/png'));
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const submitPresensi = async () => {
    setLoading(true);
    const savedId = localStorage.getItem('profile_id');
    const payload = {
      siswa_id: parseInt(savedId),
      image: capturedImage,
      latitude: location.lat,
      longitude: location.lng,
      status: 'Hadir'
    };

    try {
      const response = await axios.post('http://localhost:5000/api/presensi/harian', payload);
      if (response.data.status === 'success') {
        setPresensiStatus('success');
        fetchHistory();
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Gagal kirim"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sph-container">
      {/* HEADER ATAS */}
      <div className="sph-header">
        <div className="sph-header-left">
          <h1>Presensi Harian</h1>
          <p>SMAN 1 Kedunggalar - Presensi Geofencing</p>
        </div>
        <div className={`sph-status-badge ${isWithinRadius ? 'in' : 'out'}`}>
          <MapPin size={14} />
          {isWithinRadius ? 'Dalam Area Sekolah' : 'Luar Area Sekolah'}
        </div>
      </div>

      <div className="sph-grid">
        {/* KOLOM KIRI: CAMERA & CLOCK */}
        <div className="sph-main-card">
          <div className="sph-date-display">
            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <h2 className="sph-clock-display">
            {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/\./g, ':')}
          </h2>

          <div className="sph-qr-viewport">
            {presensiStatus === 'success' ? (
              <div className="sph-result-overlay">
                <CheckCircle2 size={80} color="#1a746b" />
                <h3>Presensi Berhasil!</h3>
              </div>
            ) : presensiStatus === 'taking_photo' ? (
              <div className="sph-camera-box">
                {!capturedImage ? (
                  <video ref={videoRef} autoPlay playsInline className="sph-video-feed" />
                ) : (
                  <img src={capturedImage} alt="Preview" className="sph-captured-preview" />
                )}
              </div>
            ) : (
              <div className="sph-scanner-box">
                <Camera size={60} className="sph-viewport-icon" />
                <p className="sph-instruction">Area Terdeteksi</p>
              </div>
            )}
          </div>

          <div className="sph-action-area">
            {!capturedImage && presensiStatus !== 'success' && (
              <button className="sph-btn-primary" onClick={handlePresensiAction} disabled={!isWithinRadius}>
                <Camera size={20} /> {presensiStatus === 'idle' ? 'BUKA KAMERA' : 'AMBIL FOTO'}
              </button>
            )}
            {capturedImage && presensiStatus === 'taking_photo' && (
              <button className="sph-btn-primary" onClick={submitPresensi} disabled={loading}>
                {loading ? <RefreshCw className="sph-spin" size={20} /> : <Navigation size={20} />}
                {loading ? 'MENGIRIM...' : 'KIRIM PRESENSI'}
              </button>
            )}
            {presensiStatus === 'success' && (
              <button className="sph-btn-primary" onClick={() => {setCapturedImage(null); setPresensiStatus('idle');}}>
                KEMBALI
              </button>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: STATUS & HISTORY */}
        <div className="sph-right-column">
          {/* Card Status Lokasi */}
          <div className="sph-side-card">
            <div className="sph-card-title">
              <span><MapIcon size={14} /> Status Lokasi</span>
              <RefreshCw size={14} />
            </div>
            <div className="dist-container">
              <span className="dist-val">13.1</span>
              <span className="dist-unit">m</span>
            </div>
            <p style={{fontSize: '0.8rem', color: '#64748b', fontWeight: '600'}}>Jarak ke Titik Sekolah</p>
          </div>

          {/* Card Jam Masuk/Pulang */}
          <div className="sph-side-card">
            <div className="status-row">
              <div className="status-icon-box in"><Clock size={18} /></div>
              <div className="status-info">
                <label>Jam Datang</label>
                <span>{history[0]?.jam_masuk || '--:--:--'}</span>
              </div>
            </div>
            <div className="status-row">
              <div className="status-icon-box out"><Clock size={18} /></div>
              <div className="status-info">
                <label>Jam Pulang</label>
                <span>{history[0]?.jam_pulang || '--:--:--'}</span>
              </div>
            </div>
          </div>

          {/* Card Riwayat Terakhir */}
          <div className="sph-side-card">
            <div className="sph-card-title">
              <span><History size={14} /> Riwayat Terakhir</span>
            </div>
            {history.slice(0, 3).map((item, idx) => (
              <div className="hist-item" key={idx}>
                <div className="hist-date-box">
                   <div className="date-num">{item.tanggal.split('-')[2]}</div>
                   <div className="date-month">APR</div>
                </div>
                <div className="hist-label">Hadir - {item.jam_masuk.substring(0,5)}</div>
                <div className="hist-label" style={{color: '#1a746b'}}>Hadir</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanPresensiHarian;