import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck, 
  ClipboardList, 
  History, 
  Users, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import './css/Sidebar-wali.css';

const SidebarWaliKelas = () => {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    verifikasiSurat: true,
    monitoringSiswa: true
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path ? 'sbg-active' : '';

  return (
    <div className="sidebar-guru-container">
      
      {/* HEADER */}
      <div className="sbg-header">
        <img src="/assets/logo smanike.png" alt="Logo SMANIKE" className="sbg-logo-img" />
        <h2 className="sbg-app-title">SIPRES SMANIKE</h2>
      </div>

      <div className="sbg-menu-content">

        {/* DASHBOARD */}
        <Link to="/wali/Dashboard-wali_kelas" className="sbg-link">
          <div className={`sbg-item ${isActive('/wali-kelas/dashboard')}`}>
            <LayoutDashboard size={20} />
            <span>DASHBOARD</span>
          </div>
        </Link>

        {/* VERIFIKASI SURAT */}
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
              <Link to="/wali/DaftarAjuan" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/wali-kelas/ajuan-surat')}`}>
                  <ClipboardList size={18} /> <span>Daftar Ajuan</span>
                </div>
              </Link>

              <Link to="/wali/RiwayatVerifikasi" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/wali-kelas/riwayat-verifikasi')}`}>
                  <History size={18} /> <span>Riwayat Verifikasi</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* MONITORING SISWA */}
        <div className="sbg-group">
          <div className="sbg-item-header" onClick={() => toggleMenu('monitoringSiswa')}>
            <div className="sbg-label">
              <Users size={20} />
              <span>MONITORING SISWA</span>
            </div>
            <ChevronDown size={16} className={openMenus.monitoringSiswa ? 'sbg-rotate' : ''} />
          </div>

          {openMenus.monitoringSiswa && (
            <div className="sbg-sub-container">
              <Link to="/wali/KehadiranHarian" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/wali-kelas/kehadiran')}`}>
                  <History size={18} /> <span>Kehadiran Harian</span>
                </div>
              </Link>

              <Link to="/wali/LaporanSiswa" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/wali-kelas/laporan')}`}>
                  <ClipboardList size={18} /> <span>Laporan Siswa</span>
                </div>
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* FOOTER */}
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

export default SidebarWaliKelas;
