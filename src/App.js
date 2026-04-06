import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Komponen
import Navbar from './components/navbar.jsx'; 
import SidebarSiswa from './components/Sidebar-siswa.jsx'; 
import SidebarGuru from './components/Sidebar-guru.jsx'; 
import SidebarWaliKelas from './components/Sidebar-wali.jsx';
import SidebarTU from './components/Sidebar-Tendik.jsx';
import SidebarKepsek from './components/Sidebar-kepsek.jsx';


// Import Pages LOGIN DAN DAFTAR
import LandingPage from './pages/LandingPage';
import Daftar from './pages/Daftar';
import DaftarTendik from './pages/tendik/Daftar-tendik.jsx';

// Import Pages role SISWA
import LoginSiswa from './pages/Login-siswa.jsx';
import DashboardSiswa from './pages/siswa/Dashboard-siswa.jsx'; 
import AjuanSuratSiswa from './pages/siswa/AjuanSurat-siswa.jsx';
import RiwayatSuratSiswa from './pages/siswa/RiwayatSurat-siswa.jsx';
import ScanPresensiHarian from './pages/siswa/PresensiHarian-siswa.jsx';
import ScanPresensiMapel from './pages/siswa/PresensiMapel-siswa.jsx';
import RiwayatPresensiMapel from './pages/siswa/RiwayatPresensiMapel.jsx';

// Import Pages role GURU
import LoginGuru from './pages/Login-guru.jsx';
import DashboardGuru from './pages/guru/Dashboard-guru.jsx';
import AjuanSuratGuru from './pages/guru/AjuanSurat-guru.jsx';
import RiwayatVerifikasiGuru from './pages/guru/RiwayatVerifikasi-guru.jsx';
import GenerateBarcodeHarian from './pages/guru/GenerateBarcodeHarian-guru.jsx';
import RekapHarianGuru from './pages/guru/RekapHarian-guru.jsx';
import GenerateBarcodeMapel from './pages/guru/GenerateBarcodeMapel-guru.jsx';
import RekapMapelGuru from './pages/guru/RekapMapel-guru.jsx';

//import pages role wali kelas
import DashboardWaliKelas from './pages/wali/Dashboard-wali_kelas.jsx';
import AjuanSurat from './pages/wali/DaftarAjuan.jsx';
import RiwayatVerifikasi from './pages/wali/RiwayatVerifikasi.jsx';
import KehadiranHarian from './pages/wali/KehadiranHarian.jsx';
import LaporanSiswa from './pages/wali/LaporanSiswa.jsx';
import DataSiswa from './pages/wali/DataSiswa.jsx';

//import pages role kepala sekolah
import DashboardKepalaSekolah from './pages/kepsek/Dashboard-kepsek.jsx';
import DaftarValidasi from './pages/kepsek/DaftarValidasi.jsx';
import RiwayatValidasi from './pages/kepsek/RiwayatValidasi.jsx';
import PresensiHarian from './pages/kepsek/PresensiHarian.jsx';
import PresensiMapel from './pages/kepsek/PresensiMapel.jsx';
import DataGuru from './pages/kepsek/DataGuru.jsx';
import DataTendik from './pages/kepsek/DataTendik.jsx';
import DataKelas from './pages/kepsek/DataKelas.jsx';

//import pages role tendik
import DashboardTendik from './pages/tendik/Dashboard-tendik.jsx';
import AjuanSuratTendik from './pages/tendik/AjuanSurat.jsx';
import RiwayatVerifikasiTendik from './pages/tendik/RiwayatVerifikasi.jsx';
import GenerateSuratTendik from './pages/tendik/GenerateSurat.jsx';
import ArsipSurat from './pages/tendik/ArsipSurat.jsx';
import RekapHarian from './pages/tendik/RekapHarian.jsx';
import LaporanPresensi from './pages/tendik/LaporanPresensi.jsx';


// 1. NAVBAR UNTUK LOGIN DAN DAFTAR
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="content-wrapper">
      {children}
    </div>
  </>
);

// 2. SIDEBAR UNTUK SISWA
const DashboardLayout = ({ children }) => (
  <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
    <SidebarSiswa />
    <div className="dashboard-main-content" style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
      {children}
    </div>
  </div>
);

// 3. SIDEBAR UNTUK GURU (Baru)
const GuruLayout = ({ children }) => (
  <div className="guru-container" style={{ display: 'flex', minHeight: '100vh' }}>
    <SidebarGuru />
    <div className="guru-main-content" style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
      {children}
    </div>
  </div>
);

// 4. SIDEBAR UNTUK WALI KELAS
const WaliKelasLayout = ({ children }) => (
  <div 
    className="wali-container" 
    style={{ display: 'flex', minHeight: '100vh' }}
  >
    <SidebarWaliKelas />

    <div 
      className="wali-main-content" 
      style={{ flex: 1, backgroundColor: '#f4f4f4' }}
    >
      {children}
    </div>
  </div>
);

// 5. Sidebar Tendik
const TendikLayout = ({ children }) => (
  <div 
    className="tendik-container" 
    style={{ display: 'flex', minHeight: '100vh' }}
  >
    <SidebarTU />

    <div 
      className="tendik-main-content" 
      style={{ flex: 1, backgroundColor: '#f4f4f4' }}
    >
      {children}
    </div>
  </div>
);

// 6. Sidebar kepsek
const KepsekLayout = ({ children }) => (
  <div 
    className="kepsek-container" 
    style={{ display: 'flex', minHeight: '100vh' }}
  >
    <SidebarKepsek />

    <div 
      className="kepsek-main-content" 
      style={{ flex: 1, backgroundColor: '#f4f4f4' }}
    >
      {children}
    </div>
  </div>
);



function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
        <Route path="/Login-siswa" element={<MainLayout><LoginSiswa /></MainLayout>} />
        <Route path="/Login-guru" element={<MainLayout><LoginGuru /></MainLayout>} />
        <Route path="/daftar" element={<MainLayout><Daftar /></MainLayout>} />
        <Route path="/tendik/Daftar-tendik" element={<MainLayout><DaftarTendik /></MainLayout>} />

        {/* --- SISWA ROUTES --- */}
        <Route path="/siswa/Dashboard-siswa" element={<DashboardLayout><DashboardSiswa /></DashboardLayout>} />
        <Route path="/siswa/AjuanSurat-siswa" element={<DashboardLayout><AjuanSuratSiswa /></DashboardLayout>} />
        <Route path="/siswa/RiwayatSurat-siswa" element={<DashboardLayout><RiwayatSuratSiswa /></DashboardLayout>} />
        <Route path="/siswa/PresensiHarian-siswa" element={<DashboardLayout><ScanPresensiHarian /></DashboardLayout>} />
        <Route path="/siswa/PresensiMapel-siswa" element={<DashboardLayout><ScanPresensiMapel /></DashboardLayout>} />
        <Route path="/siswa/RiwayatPresensiMapel" element={<DashboardLayout><RiwayatPresensiMapel /></DashboardLayout>} />

        {/* --- GURU ROUTES (Baru) --- */}
        <Route path="/guru/Dashboard-guru" element={<GuruLayout><DashboardGuru /></GuruLayout>} />
        <Route path="/guru/AjuanSurat-guru" element={<GuruLayout><AjuanSuratGuru /></GuruLayout>} />
        <Route path="/guru/RiwayatVerifikasi-guru" element={<GuruLayout><RiwayatVerifikasiGuru /></GuruLayout>} />
        <Route path="/guru/GenerateBarcodeHarian-guru" element={<GuruLayout><GenerateBarcodeHarian /></GuruLayout>} />
        <Route path="/guru/RekapHarian-guru" element={<GuruLayout><RekapHarianGuru /></GuruLayout>} />
        <Route path="/guru/GenerateBarcodeMapel-guru" element={<GuruLayout><GenerateBarcodeMapel /></GuruLayout>} />
        <Route path="/guru/RekapMapel-guru" element={<GuruLayout><RekapMapelGuru /></GuruLayout>} />

        {/* --- Wali kelas (ROUTES) --- */}
        <Route path="/wali/Dashboard-wali_kelas" element={<WaliKelasLayout><DashboardWaliKelas /></WaliKelasLayout>} />
        <Route path="/wali/DaftarAjuan" element={<WaliKelasLayout><AjuanSurat/></WaliKelasLayout>} />
        <Route path="/wali/RiwayatVerifikasi" element={<WaliKelasLayout><RiwayatVerifikasi/></WaliKelasLayout>} />
        <Route path="/wali/KehadiranHarian" element={<WaliKelasLayout><KehadiranHarian/></WaliKelasLayout>} />
        <Route path="/wali/LaporanSiswa" element={<WaliKelasLayout><LaporanSiswa/></WaliKelasLayout>} />
        <Route path="/wali/DataSiswa" element={<WaliKelasLayout><DataSiswa/></WaliKelasLayout>} />

        {/* --- Tendik (ROUTES) --- */}
        <Route path="/tendik/Dashboard-tendik" element={<TendikLayout><DashboardTendik/></TendikLayout>} />
        <Route path="/tendik/AjuanSurat" element={<TendikLayout><AjuanSuratTendik/></TendikLayout>} />
        <Route path="/tendik/RiwayatVerifikasi" element={<TendikLayout><RiwayatVerifikasiTendik/></TendikLayout>} />
        <Route path="/tendik/GenerateSurat" element={<TendikLayout><GenerateSuratTendik/></TendikLayout>} />
        <Route path="/tendik/ArsipSurat" element={<TendikLayout><ArsipSurat/></TendikLayout>} />
        <Route path="/tendik/RekapHarian" element={<TendikLayout><RekapHarian/></TendikLayout>} />
        <Route path="/tendik/LaporanPresensi" element={<TendikLayout><LaporanPresensi/></TendikLayout>} />

        {/* --- kepala sekolah (ROUTES) --- */}
        <Route path="/kepsek/Dashboard-kepsek" element={<KepsekLayout><DashboardKepalaSekolah /></KepsekLayout>} />
        <Route path="/kepsek/DaftarValidasi" element={<KepsekLayout><DaftarValidasi /></KepsekLayout>} />
        <Route path="/kepsek/RiwayatValidasi" element={<KepsekLayout><RiwayatValidasi /></KepsekLayout>} />
        <Route path="/kepsek/PresensiHarian" element={<KepsekLayout><PresensiHarian/></KepsekLayout>} />
        <Route path="/kepsek/PresensiMapel" element={<KepsekLayout><PresensiMapel/></KepsekLayout>} />
        <Route path="/kepsek/DataGuru" element={<KepsekLayout><DataGuru/></KepsekLayout>} />
        <Route path="/kepsek/DataTendik" element={<KepsekLayout><DataTendik/></KepsekLayout>} />
        <Route path="/kepsek/DataKelas" element={<KepsekLayout><DataKelas/></KepsekLayout>} />
        



      </Routes>
    </Router>
  );
}

export default App;