import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import '../css/GenerateBarcodeMapel-guru.css';

const GenerateQRMapel = () => {
  const [mapel, setMapel] = useState('');
  const [kelas, setKelas] = useState('');
  const [jam, setJam] = useState('');
  const [qrData, setQrData] = useState(null);

  // 🔹 STATE UNTUK DATA MAPEL DARI DATABASE
  const [listMapel, setListMapel] = useState([]);

  // 🔹 AMBIL DATA MAPEL DARI BACKEND
  const getMapel = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/mapel/');
      setListMapel(res.data);
    } catch (error) {
      console.error('Error ambil mapel:', error);
    }
  };
  
  // 🔹 LOAD DATA SAAT HALAMAN DIBUKA
  useEffect(() => {
    getMapel();
  }, []);

  // 🔥 GENERATE QR (SUDAH TERHUBUNG BACKEND)
  const handleGenerate = async () => {
    if (!mapel || !kelas || !jam) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/presensi/generate',
        {
          mapel,
          kelas,
          jam
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // 🔐 JWT LOGIN
          }
        }
      );

      // 🔥 QR dari backend
      setQrData(res.data.qr_code);

    } catch (error) {
      console.error('Error generate QR:', error);
      alert('Gagal generate QR');
    }
  };

  return (
    <div className="container-mapel">
      <h2>Generate QR Presensi Mapel</h2>

      {/* FORM */}
      <div className="form-mapel">
        <h3>Form Generate QR</h3>

        <div className="form-grid">

          {/* 🔥 MAPEL DARI DATABASE */}
          <select value={mapel} onChange={(e) => setMapel(e.target.value)}>
            <option value="">Pilih Mapel</option>
            {listMapel.map((item) => (
              <option key={item.id} value={item.nama_mapel}>
                {item.nama_mapel}
              </option>
            ))}
          </select>

          {/* KELAS */}
          <select value={kelas} onChange={(e) => setKelas(e.target.value)}>
            <option value="">Pilih Kelas</option>
            <option>XII RPL 1</option>
            <option>XII RPL 2</option>
          </select>

          {/* JAM */}
          <select value={jam} onChange={(e) => setJam(e.target.value)}>
            <option value="">Pilih Jam</option>
            <option>Jam ke 1-2</option>
            <option>Jam ke 3-4</option>
          </select>

        </div>

        <button className="btn-submit" onClick={handleGenerate}>
          Generate QR
        </button>
      </div>

      {/* QR RESULT */}
      {qrData && (
        <div className="form-mapel" style={{ textAlign: 'center' }}>
          <h3>QR Presensi Aktif</h3>

          {/* 🔥 QR DARI BACKEND */}
          <QRCodeCanvas value={qrData} size={220} />

          <div style={{ marginTop: '15px', textAlign: 'left' }}>
            <p><b>Mapel:</b> {mapel}</p>
            <p><b>Kelas:</b> {kelas}</p>
            <p><b>Jam:</b> {jam}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateQRMapel;
