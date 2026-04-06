import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck, 
  ClipboardList, 
  History, 
  CalendarCheck, 
  BookOpenCheck, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import './css/Sidebar-guru.css';

const SidebarGuru = () => {
  const location = useLocation();

  // --- LOGIKA ROLE (User Tkt 2) ---
  const [isPiket] = useState(true); 

  // State untuk mengontrol dropdown E-Surat
  const [openMenus, setOpenMenus] = useState({
    verifikasiSurat: true
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path ? 'sbg-active' : '';

  return (
    <div className="sidebar-guru-container">
      <div className="sbg-header">
        <img src="/assets/logo smanike.png" alt="Logo SMANIKE" className="sbg-logo-img" />
        <h2 className="sbg-app-title">SIPRES SMANIKE</h2>
      </div>

      <div className="sbg-menu-content">
        {/* DASHBOARD */}
        <Link to="/guru/Dashboard-guru" className="sbg-link">
          <div className={`sbg-item ${isActive('/guru/Dashboard-guru')}`}>
            <LayoutDashboard size={20} />
            <span>DASHBOARD</span>
          </div>
        </Link>

        {/* E-SURAT (TETAP DROPDOWN) */}
        <div className="sbg-group">
          <div className="sbg-item-header" onClick={() => toggleMenu('verifikasiSurat')}>
            <div className="sbg-label">
              <FileCheck size={20} />
              <span>VERIFIKASI SURAT</span>
            </div>
            <ChevronDown size={16} className={openMenus.verifikasiSurat ? 'sbg-rotate' : ''} />
          </div>
          {openMenus.verifikasiSurat && (
            <div className="sbg-sub-container">
              <Link to="/guru/AjuanSurat-guru" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/guru/AjuanSurat-guru')}`}>
                  <ClipboardList size={18} /> <span>Daftar Ajuan</span>
                </div>
              </Link>
              <Link to="/guru/RiwayatVerifikasi-guru" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/guru/RiwayatVerifikasi-guru')}`}>
                  <History size={18} /> <span>Riwayat Verifikasi</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* REKAP PRESENSI HARIAN (LANGSUNG MENU UTAMA) */}
        {isPiket && (
          <Link to="/guru/RekapHarian-guru" className="sbg-link">
            <div className={`sbg-item ${isActive('/guru/RekapHarian-guru')}`}>
              <CalendarCheck size={20} />
              <span>REKAP PRESENSI HARIAN</span>
            </div>
          </Link>
        )}

        {/* REKAP PRESENSI MAPEL (LANGSUNG MENU UTAMA) */}
        <Link to="/guru/RekapMapel-guru" className="sbg-link">
          <div className={`sbg-item ${isActive('/guru/RekapMapel-guru')}`}>
            <BookOpenCheck size={20} />
            <span>REKAP PRESENSI MAPEL</span>
          </div>
        </Link>
      </div>

      <div className="sbg-footer-section">
        <Link to="/login" className="sbg-link">
          <div className="sbg-item sbg-logout-btn">
            <LogOut size={20} />
            <span>KELUAR</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarGuru;