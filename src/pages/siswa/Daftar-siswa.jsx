import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/Daftar-siswa.css'; 

const DaftarSiswa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ambil userId yang dikirim dari Daftar.jsx setelah axios.post pertama berhasil
  const userId = location.state?.userId;

  const [siswaProfile, setSiswaProfile] = useState({
    nisn: '',
    kelas_id: '',
    nama_ortu: '',
    no_telp_ortu: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    setSiswaProfile({ ...siswaProfile, [id || name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      alert("ID Pengguna tidak ditemukan. Silakan daftar dari awal.");
      navigate('/daftar');
      return;
    }

    setIsLoading(true);

    try {
      // TEMBAK API UPDATE (Tahap 2)
      const response = await axios.post('http://localhost:5000/api/auth/siswa/update', {
        userId: userId, // Kirim ID agar Flask tahu siswa mana yang mau diupdate
        ...siswaProfile
      });

      if (response.data.status === "success" || response.status === 200) {
        alert("Profil Berhasil Dilengkapi!");
        navigate('/login'); 
      }
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      alert(err.response?.data?.message || "Gagal melengkapi profil.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="daftar-container">
      <div className="daftar-card">
        <h1 className="daftar-title">PROFIL SISWA</h1>
        <p style={{textAlign: 'center', marginBottom: '20px', fontSize: '14px'}}>
          Lengkapi NISN dan Data Orang Tua (User ID: {userId})
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group-row">
            <label htmlFor="nisn">NISN</label>
            <input id="nisn" type="text" placeholder="1234567890" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label htmlFor="kelas_id">Pilih Kelas</label>
            <select id="kelas_id" onChange={handleChange} required defaultValue="">
              <option value="" disabled>-- Pilih Kelas --</option>
              <option value="1">Kelas X</option>
              <option value="2">Kelas XI</option>
              <option value="3">Kelas XII</option>
            </select>
          </div>

          <div className="form-group-row">
            <label htmlFor="nama_ortu">Nama Orang Tua</label>
            <input id="nama_ortu" type="text" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label htmlFor="no_telp_ortu">No. HP Orang Tua</label>
            <input id="no_telp_ortu" type="tel" placeholder="8xxxx" onChange={handleChange} required />
          </div>

          <div className="daftar-footer-buttons">
            <button type="submit" className="btn-lanjut" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Selesai & Daftar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DaftarSiswa;