import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LandingPage.css'; 
import { 
  LogIn, UserPlus, ScanBarcode, FileText, BadgeCheck, 
  ArrowRight, GraduationCap, Users, RefreshCw 
} from 'lucide-react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('siswa');

  // ✅ state dropdown
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();

  // ✅ auto close dropdown saat klik luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container-landing">

      <main className="main-content">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-text">
            <h2>SELAMAT DATANG DI <br className="break-mobile" /> SISTEM ADMINISTRASI SMANIKE</h2>
            <p>
              PORTAL DIGITAL UNTUK PRESENSI SISWA <br className="break-desktop" />
              SERTA LAYANAN SURAT MENYURAT SEKOLAH YANG TERINTEGRASI
            </p>
          </div>

          <div className="hero-buttons">

            {/* ✅ LOGIN DROPDOWN FIX */}
            <div className="dropdown-login" ref={dropdownRef}>
              <button 
                className="btn-login"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <LogIn size={20} /> LOGIN ▼
              </button>

              {openDropdown && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/Login-siswa')}>
                    Login Siswa
                  </button>
                  <button onClick={() => navigate('/Login-guru')}>
                    Login Guru
                  </button>
                </div>
              )}
            </div>

            {/* DAFTAR */}
            <button 
              className="btn-daftar"
              onClick={() => navigate('/daftar')}
            >
              <UserPlus size={20} /> DAFTAR
            </button>

          </div>
 
        </section>

        {/* FEATURES GRID */}
        <section className="features-grid">
          <div className="feature-card">
            <div className="icon-circle">
              <ScanBarcode size={40} />
            </div>
            <h3>PRESENSI SISWA</h3>
            <p>Presensi harian dan mata pelajaran khusus siswa dengan fitur scan barcode otomatis yang terintegrasi dengan teknologi geofencing sekolah.</p>
          </div>

          <div className="feature-card">
            <div className="icon-circle">
              <FileText size={40} />
            </div>
            <h3>PERSURATAN DIGITAL</h3>
            <p>Pengajuan berbagai jenis surat untuk Siswa, Guru, dan Tendik secara mandiri dengan pemantauan status proses yang transparan.</p>
          </div>

          <div className="feature-card">
            <div className="icon-circle">
              <BadgeCheck size={40} />
            </div>
            <h3>VALIDASI RESMI</h3>
            <p>Seluruh dokumen diverifikasi oleh Tata Usaha dan divalidasi dengan tanda tangan digital resmi oleh Kepala Sekolah.</p>
          </div>
        </section>

        {/* SECTION DAFTAR LAYANAN */}
        <section className="services-section">
          <h2 className="section-title">Layanan Persuratan Online</h2>
          <div className="services-grid">
            <div className="service-category">
              <div className="category-header">
                <GraduationCap size={24} />
                <h3>Layanan Siswa</h3>
              </div>
              <ul>
                <li>Surat Keterangan Aktif Siswa</li>
                <li>Surat Keterangan Belum Punya KTA</li>
                <li>Rekomendasi Lomba, PIP, dll</li>
                <li>Surat Dispensasi & Mutasi</li>
                <li>Surat Keterangan Lulus (SKL)</li>
              </ul>
            </div>

            <div className="service-category">
              <div className="category-header">
                <Users size={24} />
                <h3>Layanan Guru & Tendik</h3>
              </div>
              <ul>
                <li>Surat Perintah Tugas (SPT)</li>
                <li>Surat Keterangan Aktif Kerja</li>
                <li>Surat Keterangan Gaji</li>
                <li><RefreshCw size={14} style={{display:'inline', marginBottom:'-2px'}} /> Reset HP Presensi</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TUTORIAL SECTION */}
        <section className="tutorial-section">
          <div className="tutorial-header-wrapper">
            <h2 className="tutorial-title">TUTORIAL PENGGUNAAN SISTEM</h2>
            <div className="tutorial-tabs">
              <button 
                className={activeTab === 'siswa' ? 'tab-btn active' : 'tab-btn'} 
                onClick={() => setActiveTab('siswa')}
              >
                Siswa
              </button>
              <button 
                className={activeTab === 'guru' ? 'tab-btn active' : 'tab-btn'} 
                onClick={() => setActiveTab('guru')}
              >
                Guru & Tendik
              </button>
            </div>
          </div>

          <div className="step-container">
            {activeTab === 'siswa' ? (
              <>
                <div className="step-box">
                  <div className="img-area"><img src="/assets/step1.png" alt="Step 1" /></div>
                  <p>Siswa membuat ajuan surat melalui sistem secara mandiri.</p>
                </div>
                <ArrowRight className="arrow-icon" size={32} />
                <div className="step-box">
                  <div className="img-area"><img src="/assets/step2.png" alt="Step 2" /></div>
                  <p>Tata Usaha/Wali Kelas memeriksa kelengkapan data ajuan.</p>
                </div>
                <ArrowRight className="arrow-icon" size={32} />
                <div className="step-box">
                  <div className="img-area"><img src="/assets/step3.png" alt="Step 3" /></div>
                  <p>Kepala Sekolah memvalidasi surat dengan TTD digital.</p>
                </div>
                <ArrowRight className="arrow-icon" size={32} />
                <div className="step-box">
                  <div className="img-area"><img src="/assets/step4.png" alt="Step 4" /></div>
                  <p>Siswa menerima dan mencetak hasil validasi (PDF).</p>
                </div>
              </>
            ) : (
              <>
                <div className="step-box">
                  <div className="img-area"><img src="/assets/guru_step1.png" alt="Guru Step 1" /></div>
                  <p>Guru memilih layanan persuratan dan mengisi data tugas/gaji.</p>
                </div>
                <ArrowRight className="arrow-icon" size={32} />
                <div className="step-box">
                  <div className="img-area"><img src="/assets/guru_step2.png" alt="Guru Step 2" /></div>
                  <p>Bagian Tata Usaha melakukan verifikasi draf surat pengajuan.</p>
                </div>
                <ArrowRight className="arrow-icon" size={32} />
                <div className="step-box">
                  <div className="img-area"><img src="/assets/guru_step3.png" alt="Guru Step 3" /></div>
                  <p>Penerbitan Tanda Tangan Elektronik oleh Kepala Sekolah.</p>
                </div>
                <ArrowRight className="arrow-icon" size={32} />
                <div className="step-box">
                  <div className="img-area"><img src="/assets/guru_step4.png" alt="Guru Step 4" /></div>
                  <p>Dokumen resmi siap digunakan untuk keperluan kedinasan.</p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
