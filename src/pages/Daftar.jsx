import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Wajib import axios
import { Eye, EyeOff, ChevronRight } from 'lucide-react';
import './css/Daftar.css';

const Daftar = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Untuk loading button
  
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    email: '',
    no_hp: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validasi Password
    if (formData.password !== formData.confirmPassword) {
      alert("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Kirim ke Backend Flask (Endpoint yang tadi kita buat)
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.nama_lengkap, // Pakai nama sebagai username sementara
        password: formData.password,
        role: formData.role,
        nama_lengkap: formData.nama_lengkap,
        jenis_kelamin: formData.jenis_kelamin,
        tempat_lahir: formData.tempat_lahir,
        tanggal_lahir: formData.tanggal_lahir,
        alamat: formData.alamat,
        email: formData.email,
        no_hp: formData.no_hp
      });

      // 3. Jika Berhasil, pindah ke halaman profil spesifik
      if (response.status === 201 || response.data.status === "success") {
        const userId = response.data.userId;
        const userRole = formData.role;

        alert("Akun berhasil dibuat! Lanjut lengkapi profil.");

        // Navigasi dinamis berdasarkan role
        // Pastikan path ini SAMA PERSIS dengan yang ada di App.js kamu
        const targetPath = `/${userRole}/Daftar-${userRole}`;
        
        navigate(targetPath, { 
          state: { userId: userId, role: userRole } 
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mendaftar, cek koneksi backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="daftar-container">
      <div className="daftar-card">
        <h2 className="daftar-title">DAFTAR AKUN BARU</h2>
        <form className="daftar-form" onSubmit={handleSubmit}>
          
          <div className="form-group-row">
            <label>Nama Lengkap</label>
            <input type="text" name="nama_lengkap" placeholder="Sesuai ijazah" onChange={handleChange} required />
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
            <label>Tempat Lahir</label>
            <input type="text" name="tempat_lahir" placeholder="Contoh: Ngawi" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label>Tanggal Lahir</label>
            <input type="date" name="tanggal_lahir" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label>Alamat Lengkap</label>
            <input type="text" name="alamat" placeholder="Domisili sekarang" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label>Alamat Email</label>
            <input type="email" name="email" placeholder="contoh@gmail.com" onChange={handleChange} required />
          </div>

          <div className="form-group-row">
            <label>Nomor HP Aktif</label>
            <div className="phone-input-group">
              <div className="country-select"><span>🇮🇩 +62</span></div>
              <input type="text" name="no_hp" placeholder="8xxxxxxxx" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group-row">
            <label>Mendaftar Sebagai</label>
            <select name="role" onChange={handleChange} required>
              <option value="">-- Pilih Peran --</option>
              <option value="siswa">Siswa</option>
              <option value="guru">Guru</option>
              <option value="kepsek">Kepala Sekolah</option>
              <option value="staf">Staf TU</option>
            </select>
          </div>

          <div className="form-group-row">
            <label>Kata Sandi</label>
            <div className="input-with-icon">
              <input type={showPass ? "text" : "password"} name="password" placeholder="Minimal 6 karakter" onChange={handleChange} required />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group-row">
            <label>Konfirmasi Sandi</label>
            <div className="input-with-icon">
              <input type={showConfirmPass ? "text" : "password"} name="confirmPassword" placeholder="Ulangi kata sandi" onChange={handleChange} required />
              <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="daftar-footer-buttons">
            <button type="button" className="btn-kembali-daftar" onClick={() => navigate('/login')}>Batal</button>
            <button type="submit" className="btn-lanjut" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Lanjut Ke Profil"} <ChevronRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Daftar;