import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck, 
  ClipboardList, 
  History, 
  Users, 
  BarChart3,
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import './css/Sidebar-wali.css';

const SidebarKepsek = () => {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    validasiSurat: true,
    monitoringSekolah: true
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
        <Link to="/kepsek/Dashboard-kepsek" className="sbg-link">
          <div className={`sbg-item ${isActive('/kepsek/Dashboard-kepsek')}`}>
            <LayoutDashboard size={20} />
            <span>DASHBOARD</span>
          </div>
        </Link>

        {/* VALIDASI SURAT */}
        <div className="sbg-group">
          <div className="sbg-item-header" onClick={() => toggleMenu('validasiSurat')}>
            <div className="sbg-label">
              <FileCheck size={20} />
              <span>VALIDASI SURAT</span>
            </div>
            <ChevronDown size={16} className={openMenus.validasiSurat ? 'sbg-rotate' : ''} />
          </div>

          {openMenus.validasiSurat && (
            <div className="sbg-sub-container">
              <Link to="/kepsek/DaftarValidasi" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/kepsek/DaftarValidasi')}`}>
                  <ClipboardList size={18} /> <span>Daftar Ajuan</span>
                </div>
              </Link>

              <Link to="/kepsek/RiwayatValidasi" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/kepsek/RiwayatValidasi')}`}>
                  <History size={18} /> <span>Riwayat Validasi</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* MONITORING SEKOLAH */}
        <div className="sbg-group">
          <div className="sbg-item-header" onClick={() => toggleMenu('monitoringSekolah')}>
            <div className="sbg-label">
              <Users size={20} />
              <span>MONITORING SEKOLAH</span>
            </div>
            <ChevronDown size={16} className={openMenus.monitoringSekolah ? 'sbg-rotate' : ''} />
          </div>

          {openMenus.monitoringSekolah && (
            <div className="sbg-sub-container">

              <Link to="/kepsek/PresensiHarian" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/kepsek/PresensiHarian')}`}>
                  <BarChart3 size={18} /> <span>Presensi Harian</span>
                </div>
              </Link>

              <Link to="/kepsek/PresensiMapel" className="sbg-link">
                <div className={`sbg-sub-item ${isActive('/kepsek/PresensiMapel')}`}>
                  <BarChart3 size={18} /> <span>Presensi Mapel</span>
                </div>
              </Link>

              {/* DATA SEKOLAH */}
<div className="sbg-group">
  <div className="sbg-item-header" onClick={() => toggleMenu('dataSekolah')}>
    <div className="sbg-label">
      <Users size={20} />
      <span>DATA SEKOLAH</span>
    </div>
    <ChevronDown size={16} className={openMenus.dataSekolah ? 'sbg-rotate' : ''} />
  </div>

  {openMenus.dataSekolah && (
    <div className="sbg-sub-container">

      <Link to="/kepsek/DataGuru" className="sbg-link">
        <div className={`sbg-sub-item ${isActive('/kepsek/DataGuru')}`}>
          <Users size={18} /> <span>Data Guru</span>
        </div>
      </Link>

      <Link to="/kepsek/DataTendik" className="sbg-link">
        <div className={`sbg-sub-item ${isActive('/kepsek/DataTendik')}`}>
          <Users size={18} /> <span>Data Tendik</span>
        </div>
      </Link>

      <Link to="/kepsek/DataKelas" className="sbg-link">
        <div className={`sbg-sub-item ${isActive('/kepsek/DataKelas')}`}>
          <Users size={18} /> <span>Data Kelas</span>
        </div>
      </Link>

    </div>
  )}
</div>

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

export default SidebarKepsek;
