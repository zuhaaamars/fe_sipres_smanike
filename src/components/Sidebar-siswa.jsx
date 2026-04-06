import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  History, 
  BookOpen, 
  LogOut, 
  CalendarCheck,
  ChevronDown 
} from 'lucide-react';
import './css/Sidebar-siswa.css';

const SidebarSiswa = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    esurat: true,
    presensiMapel: true
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/assets/logo smanike.png" alt="Logo SMANIKE" className="sidebar-logo" />
        <h2 className="sidebar-title">SIPRES SMANIKE</h2>
      </div>

      <div className="sidebar-menu">
        {/* DASHBOARD */}
        <Link to="/siswa/Dashboard-siswa" className="link-style">
          <div className={`menu-item ${isActive('/siswa/Dashboard-siswa')}`}>
            <LayoutDashboard size={20} />
            <span>DASHBOARD</span>
          </div>
        </Link>

        {/* E-SURAT - Tetap Dropdown */}
        <div className="menu-group">
          <div className="menu-item-header" onClick={() => toggleMenu('esurat')}>
            <div className="menu-label">
              <FileText size={20} />
              <span>E-SURAT</span>
            </div>
            <ChevronDown size={16} className={openMenus.esurat ? 'rotate' : ''} />
          </div>
          {openMenus.esurat && (
            <div className="sub-menu">
              <Link to="/siswa/AjuanSurat-siswa" className="link-style">
                <div className={`sub-item ${isActive('/siswa/AjuanSurat-siswa')}`}>
                  <Plus size={18} /> <span>Buat Ajuan Baru</span>
                </div>
              </Link>
              <Link to="/siswa/RiwayatSurat-siswa" className="link-style">
                <div className={`sub-item ${isActive('/siswa/RiwayatSurat-siswa')}`}>
                  <History size={18} /> <span>Riwayat Surat</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        <Link to="/siswa/PresensiHarian-siswa" className="link-style">
          <div className={`menu-item ${isActive('/siswa/PresensiHarian-siswa')}`}>
            <CalendarCheck size={20} />
            <span>PRESENSI HARIAN</span>
          </div>
        </Link>

        {/* PRESENSI MAPEL - Tetap Dropdown */}
        <Link to="/siswa/PresensiMapel-siswa" className="link-style">
          <div className={`menu-item ${isActive('/siswa/PresensiMapel-siswa')}`}>
            <BookOpen size={20} />
            <span>PRESENSI MAPEL</span>
          </div>
        </Link>
      </div>

      <div className="sidebar-footer">
        <Link to="/login" className="link-style">
          <div className="menu-item logout">
            <LogOut size={20} />
            <span>LOGOUT</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarSiswa;