import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronRight } from 'lucide-react';
import './css/Daftar.css';

const Daftar = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  // 1. Tambahkan state untuk menangkap pilihan role
  const [selectedRole, setSelectedRole] = useState(""); 
  
  const navigate = useNavigate();

  // 2. Fungsi untuk mengarahkan halaman berdasarkan role
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === "siswa") {
      navigate('/Login-siswa');
    } else if (selectedRole === "guru") {
      navigate('/Login-guru');
    } else if (selectedRole === "tendik") {
      navigate('/Login-guru');
    } else {
      alert("Silakan pilih peran terlebih dahulu!");
    }
  };

  return (
    <div className="daftar-container">

      <div className="daftar-card">
        <h2 className="daftar-title">INFORMASI AKUN ANDA</h2>

        {/* 3. Tambahkan onSubmit pada form */}
        <form className="daftar-form" onSubmit={handleSubmit}>
          {/* Nama Lengkap */}
          <div className="form-group-row">
            <label>Nama Lengkap</label>
            <input type="text" placeholder="misal: Budi Santoso" />
          </div>

          {/* Alamat Email */}
          <div className="form-group-row">
            <label>Alamat Email</label>
            <input type="email" placeholder="contoh@gmail.com" />
          </div>

          {/* Nomor HP Aktif */}
          <div className="form-group-row">
            <label>Nomor HP Aktif</label>
            <div className="phone-input-group">
              <div className="country-select">
                <img src="https://flagcdn.com/w20/id.png" alt="ID" />
                <span>+62</span>
                <span className="caret">▼</span>
              </div>
              <input type="text" placeholder="+62xxxxxxxxxxx" />
            </div>
          </div>

          {/* Kata Sandi */}
          <div className="form-group-row">
            <label>Kata Sandi</label>
            <div className="input-with-icon">
              <input 
                type={showPass ? "text" : "password"} 
                placeholder="*pilih password yang kuat*" 
              />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Konfirmasi Kata Sandi */}
          <div className="form-group-row">
            <label>Konfirmasi Kata Sandi</label>
            <div className="input-with-icon">
              <input 
                type={showConfirmPass ? "text" : "password"} 
                placeholder="*ketik ulang password*" 
              />
              <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Pilih Role */}
          <div className="form-group-row">
            <label>Pilih Role</label>
            {/* 4. Hubungkan select dengan state */}
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              required
            >
              <option value="" disabled>Pilih peran</option>
              <option value="siswa">Siswa</option>
              <option value="kepsek">Kepala Sekolah</option>
              <option value="walkes">Wali Kelas</option>
              <option value="guru">Guru</option>
              <option value="tendik">Tenaga Kependidikan</option>
            </select>
          </div>

          {/* Tombol Navigasi */}
          <div className="daftar-footer-buttons">
            <button type="button" className="btn-kembali-daftar" onClick={() => navigate('/siswa/Login')}>
              Kembali
            </button>
            <button type="submit" className="btn-lanjut">
              Lanjut lengkapi data <ChevronRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Daftar;