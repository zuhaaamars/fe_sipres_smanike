import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UserCheck,
  School,
  Users,
  BookOpen,
  LogOut
} from 'lucide-react';
import './css/Sidebar-master.css';

const SidebarMaster = () => {
  const location = useLocation();

  const isActive = (path) => 
    location.pathname === path ? 'sbm-active' : '';

  return (
    <div className="sidebar-master-container">

      {/* HEADER */}
      <div className="sbm-header">
        <img 
          src="/assets/logo smanike.png" 
          alt="Logo SMANIKE" 
          className="sbm-logo-img" 
        />
        <h2 className="sbm-app-title">MASTER DATA</h2>
      </div>

      {/* MENU */}
      <div className="sbm-menu-content">

        <Link to="/master/DataJurusan-Master" className="sbm-link">
          <div className={`sbm-item ${isActive('/master/DataJurusan-master')}`}>
            <UserCheck size={20} />
            <span>DATA JURUSAN</span>
          </div>
        </Link>

        <Link to="/master/DataKelas-master" className="sbm-link">
          <div className={`sbm-item ${isActive('/master/DataKelas-master')}`}>
            <School size={20} />
            <span>DATA KELAS</span>
          </div>
        </Link>

        <Link to="/master/DataGuru-master" className="sbm-link">
          <div className={`sbm-item ${isActive('/master/DataGuru-master')}`}>
            <Users size={20} />
            <span>DATA GURU</span>
          </div>
        </Link>

        <Link to="/master/DataMapel-master" className="sbm-link">
          <div className={`sbm-item ${isActive('/master/DataMapel-master')}`}>
            <BookOpen size={20} />
            <span>DATA MAPEL</span>
          </div>
        </Link>

      </div>

      {/* FOOTER */}
      <div className="sbm-footer-section">
        <Link to="/login" className="sbm-link">
          <div className="sbm-item sbm-logout-btn">
            <LogOut size={20} />
            <span>KELUAR</span>
          </div>
        </Link>
      </div>

    </div>
  );
};

export default SidebarMaster;
