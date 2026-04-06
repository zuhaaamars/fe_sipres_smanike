import React from 'react';
import './css/navbar.css'; // Pastikan jalur CSS-nya sudah benar

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Bagian Logo */}
        <div className="navbar-logo-section">
          {/* PANGGIL LANGSUNG DENGAN PATH STRING JIKA DI PUBLIC */}
          <img 
            src="/assets/logo smanike.png" 
            alt="Logo SMANIKE" 
            className="navbar-logo-img" 
          />
        </div>

        {/* Bagian Teks Judul */}
        <div className="navbar-text-section">
          <h1 className="navbar-title">SIPRES SMANIKE</h1>
          <p className="navbar-subtitle">
            Sistem Informasi Presensi dan Surat SMA N 1 KEDUNGGALAR
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;