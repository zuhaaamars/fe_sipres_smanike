import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, UserCircle } from 'lucide-react';
import './css/Login.css';

const LoginSiswa = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika autentikasi di sini
    console.log("Login diproses");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">LOGIN AKUN</h2>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Input Identitas */}
          <div className="input-group">
            <label>Email/NISN</label>
            <div className="input-wrapper">
              <input type="text" placeholder="Masukkan Identitas Anda" required />
              <UserCircle className="input-icon" size={20} />
            </div>
          </div>

          {/* Input Kata Sandi */}
          <div className="input-group">
            <div className="label-row">
              <label>Kata Sandi</label>
              {/* Diubah menjadi button agar tidak kena warning 'anchor-is-valid' */}
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
                placeholder="Masukkan kata sandi" 
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

          {/* Ingat Saya */}
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Ingat Saya</label>
          </div>

          {/* Tombol Login */}
          <button type="submit" className="btn-masuk">
            MASUK KE SISTEM
          </button>

          {/* Footer */}
          <div className="login-footer">
            <p>
              Belum Punya Akun? <Link to="/daftar" className="register-link">Daftar</Link>
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

export default LoginSiswa;
