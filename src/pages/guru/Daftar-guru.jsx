import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Daftar-guru.css';

const DaftarGuru = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nip: '',
    nama_lengkap: '',
    gelar: '',
    jenis_kelamin: '',
    no_hp: '',
    alamat: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const token = localStorage.getItem('token');

    console.log("USER ID:", userId); // 🔥 debug

    const response = await axios.post(
      'http://localhost:5000/api/auth/guru/update',
      {
        ...formData,
        user_id: userId // ✅ FIX
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      alert("Profil guru berhasil disimpan!");
      navigate('/login');
    }

  } catch (err) {
    console.log(err); // 🔥 biar keliatan error asli
    alert(err.response?.data?.message || "Gagal menyimpan data guru");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="daftar-container">
      <div className="daftar-card">
        <h2 className="daftar-title">LENGKAPI PROFIL GURU</h2>

        <form className="daftar-form" onSubmit={handleSubmit}>

          <div className="form-group-row">
            <label>NIP</label>
            <input type="text" name="nip" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label>Nama Lengkap</label>
            <input type="text" name="nama_lengkap" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label>Gelar</label>
            <input type="text" name="gelar" placeholder="Contoh: S.Pd" onChange={handleChange} />
          </div>

          <div className="form-group-row">
            <label>Jenis Kelamin</label>
            <select name="jenis_kelamin" onChange={handleChange} required>
              <option value="">-- Pilih --</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div className="form-group-row">
            <label>Nomor HP</label>
            <div className="phone-input-group">
              <div className="country-select"><span>🇮🇩 +62</span></div>
              <input type="text" name="no_hp" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group-row">
            <label>Alamat</label>
            <input type="text" name="alamat" onChange={handleChange} />
          </div>

          <div className="daftar-footer-buttons">
            <button type="button" className="btn-kembali-daftar" onClick={() => navigate(-1)}>
              Kembali
            </button>

            <button type="submit" className="btn-lanjut" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default DaftarGuru;
