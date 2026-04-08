import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, UserCircle, ShieldCheck } from 'lucide-react';
import './css/Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    username: '', 
    password: '', 
    role: ''      
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!loginData.role) {
      alert("Silakan pilih peran Anda!");
      return;
    }
    
    setIsLoading(true);

    try {
      // 1. Kirim request ke Backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: loginData.username,
        password: loginData.password,
        role: loginData.role
      });

      if (response.data.status === "success") {
        const { access_token, user } = response.data;

        // 2. Simpan Token dan Data User Dasar
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user_role', user.role);

        /** * 3. DINAMIS: Simpan profile_id (ID 16, 17, dsb) 
         * Disimpan dengan kunci yang spesifik agar mudah dipanggil di fitur Presensi
         */
        if (user.profile_id) {
          localStorage.setItem('profile_id', user.profile_id);
          
          // Opsional: Simpan khusus jika role-nya siswa untuk ScanPresensiHarian.jsx
          if (user.role === 'siswa') {
            localStorage.setItem('siswa_id', user.profile_id);
          }
        }

        alert(response.data.message);

        // 4. Redirect otomatis berdasarkan role
        switch (user.role) {
          case 'siswa':
            navigate('/siswa/Dashboard-siswa');
            break;
          case 'guru':
          case 'walkes':
            navigate('/guru/Dashboard-guru');
            break;
          case 'kepsek':
            navigate('/kepsek/Dashboard-kepsek');
            break;
          case 'staf':
          case 'staff':
            navigate('/staf/dashboard'); // Sesuaikan dengan route staf-mu
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/');
        }
      }
    } catch (err) {
      // Menangkap pesan error dari backend agar lebih jelas
      const errorMsg = err.response?.data?.message || "Nama, Password, atau Role salah!";
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">LOGIN AKUN</h2>
        
        <form className="login-form" onSubmit={handleSubmit}>
          
          {/* Input Nama Lengkap */}
          <div className="input-group">
            <label>Nama Lengkap / Username</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                name="username" 
                placeholder="Masukkan nama lengkap Anda" 
                value={loginData.username}
                onChange={handleChange}
                required 
              />
              <UserCircle className="input-icon" size={20} />
            </div>
          </div>

          {/* Input Pilih Role */}
          <div className="input-group">
            <label>Pilih Peran (Role)</label>
            <div className="input-wrapper">
              <select 
                name="role" 
                value={loginData.role} 
                onChange={handleChange} 
                className="select-role-login"
                required
              >
                <option value="" disabled>-- Pilih Peran Anda --</option>
                <option value="siswa">Siswa</option>
                <option value="guru">Guru / Wali Kelas</option>
                <option value="kepsek">Kepala Sekolah</option>
                <option value="staf">Tenaga Kependidikan</option>
                <option value="admin">Admin</option>
              </select>
              <ShieldCheck className="input-icon" size={20} />
            </div>
          </div>

          {/* Input Kata Sandi */}
          <div className="input-group">
            <div className="label-row">
              <label>Kata Sandi</label>
              <button 
                type="button" 
                className="forgot-link-btn"
                onClick={() => navigate('/forgot-password')}
              >
                Lupa Kata Sandi?
              </button>
            </div>
            <div className="input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Masukkan kata sandi" 
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Tombol Submit */}
          <button type="submit" className="btn-masuk" disabled={isLoading}>
            {isLoading ? "MENGECEK..." : "MASUK KE SISTEM"}
          </button>

          <div className="login-footer">
            <p>
              Belum Punya Akun? <Link to="/daftar" className="reg-link">Daftar</Link>
            </p>
            <button 
              type="button" 
              className="btn-kembali"
              onClick={() => navigate('/')}
            >
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;