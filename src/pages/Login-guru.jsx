import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './css/Daftar.css';

const LoginGuru = () => {
  const navigate = useNavigate();

  // ✅ state untuk jabatan
  const [jabatan, setJabatan] = useState("");

  const handleFinish = (e) => {
    e.preventDefault();

    if (jabatan === "guru") {
      navigate('/guru/Dashboard-guru');
    } else if (jabatan === "wali_kelas") {
      navigate('/wali/Dashboard-wali_kelas'); // sementara sama
    } else if (jabatan === "kepala_sekolah") {
      navigate('/kepsek/Dashboard-kepsek'); // bisa kamu buat nanti
    } else if (jabatan === "tendik") {
      navigate('/tendik/Dashboard-tendik'); // bisa kamu buat nanti
    } else {
      alert("Silakan pilih jabatan terlebih dahulu!");
    }
  };

  return (
    <div className="daftar-container">

      <div className="daftar-card">
        <h2 className="daftar-title">LOGIN GURU</h2>

        <form className="daftar-form" onSubmit={handleFinish}>
          
          {/* Email / NIP / NIK */}
          <div className="form-group-row">
            <label>Email / NIP / NIK</label>
            <input 
              type="text" 
              placeholder="Masukkan Email / NIP / NIK" 
              required 
            />
          </div>

          {/* 🔥 JABATAN DROPDOWN */}
          <div className="form-group-row">
            <label>Jabatan</label>
            <select 
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              required
            >
              <option value="">Pilih Jabatan</option>
              <option value="kepala_sekolah">Kepala Sekolah</option>
              <option value="wali_kelas">Wali Kelas</option>
              <option value="guru">Guru</option>
              <option value="tendik">Tenaga Kependidikan</option>
            </select>
          </div>

          {/* Kode Otoritas */}
          <div className="form-group-row">
            <label>Kode Otoritas</label>
            <input 
              type="text" 
              placeholder="Masukkan kode otoritas" 
              required 
            />
          </div>

          {/* Tombol Navigasi */}
          <div className="daftar-footer-buttons">
            <button 
              type="button" 
              className="btn-kembali-daftar" 
              onClick={() => navigate('/daftar')}
            >
              Kembali
            </button>

            <button type="submit" className="btn-lanjut">
              MASUK <CheckCircle size={18} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginGuru;
