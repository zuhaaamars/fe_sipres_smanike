import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck, 
  ClipboardList, 
  History, 
  FileText,
  Archive,
  BarChart3,
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import './css/Sidebar-tendik.css';

const SidebarTU = () => {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    verifikasiSurat: true,
    generateSurat: true,
    arsipSurat: true,
    presensi: true
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
        <Link to="/staff/Dashboard-staff" className="sbg-link">
          <div className={`sbg-item ${isActive('/tu/dashboard')}`}>
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
              <Link to="/staff/AjuanSurat-staff" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/tu/ajuan-surat')}`}>
                  <ClipboardList size={18} /> <span>Daftar Ajuan</span>
                </div>
              </Link>

              <Link to="/staff/RiwayatVerifikasi-staff" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/tu/riwayat-verifikasi')}`}>
                  <History size={18} /> <span>Riwayat Verifikasi</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* GENERATE SURAT */}
        <div className="sbg-group">
          <div className="sbg-item-header" onClick={() => toggleMenu('generateSurat')}>
            <div className="sbg-label">
              <FileText size={20} />
              <span>GENERATE SURAT</span>
            </div>
            <ChevronDown size={16} className={openMenus.generateSurat ? 'sbg-rotate' : ''} />
          </div>

          {openMenus.generateSurat && (
            <div className="sbg-sub-container">
              <Link to="/staff/GenerateSurat-staff" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/tu/buat-surat')}`}>
                  <FileText size={18} /> <span>Buat Surat</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* ARSIP SURAT */}
        <div className="sbg-group">
          <div className="sbg-item-header" onClick={() => toggleMenu('arsipSurat')}>
            <div className="sbg-label">
              <Archive size={20} />
              <span>ARSIP SURAT</span>
            </div>
            <ChevronDown size={16} className={openMenus.arsipSurat ? 'sbg-rotate' : ''} />
          </div>

          {openMenus.arsipSurat && (
            <div className="sbg-sub-container">
              <Link to="/staff/ArsipSurat-staff" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/tu/arsip')}`}>
                  <Archive size={18} /> <span>Semua Surat</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* PRESENSI */}
        <div className="sbg-group">
          <div className="sbg-item-header" onClick={() => toggleMenu('presensi')}>
            <div className="sbg-label">
              <BarChart3 size={20} />
              <span>PRESENSI</span>
            </div>
            <ChevronDown size={16} className={openMenus.presensi ? 'sbg-rotate' : ''} />
          </div>

          {openMenus.presensi && (
            <div className="sbg-sub-container">
              <Link to="/staff/RekapHarian-staff" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/tu/rekap-harian')}`}>
                  <History size={18} /> <span>Rekap Harian</span>
                </div>
              </Link>

              <Link to="/staff/LaporanPresensi-staff" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/tu/laporan')}`}>
                  <ClipboardList size={18} /> <span>Laporan Presensi</span>
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

export default SidebarTU;
