import React from 'react';
import { Users, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import '../css/LaporanSiswa-wali.css';

const LaporanSiswaWali = () => {
  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Laporan Siswa</h1>
          <p>Rekap kehadiran dan status siswa per kelas</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Wali Kelas XII RPL 1</span>
            <strong>Budi Santoso, S.Kom</strong>
          </div>
          <div className="dg-avatar">W</div>
        </div>
      </header>

      {/* RINGKASAN */}
      <div className="dg-action-grid">

        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <Users size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Total Siswa</h3>
            <p>32 Siswa</p>
          </div>
        </div>

        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <CheckCircle2 size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Kehadiran Rata-rata</h3>
            <p>92%</p>
          </div>
        </div>

        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <FileText size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Total Ajuan Surat</h3>
            <p>15 Surat</p>
          </div>
        </div>

        <div className="dg-action-card">
          <div className="dg-icon-box orange">
            <AlertCircle size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Siswa Bermasalah</h3>
            <p>3 Siswa</p>
          </div>
        </div>

      </div>

      {/* TABEL LAPORAN */}
      <div className="dg-table-section">
        <div className="dg-section-title">
          <h2>Detail Laporan Siswa (XII RPL 1)</h2>
        </div>

        <div className="dg-table-card">
          <table className="dg-table">
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Kehadiran</th>
                <th>Izin/Sakit</th>
                <th>Alpha</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {/* SISWA NORMAL */}
              <tr>
                <td>Aditya Pratama</td>
                <td>95%</td>
                <td>2 Hari</td>
                <td>0</td>
                <td><span className="dg-badge hadir">Baik</span></td>
              </tr>

              {/* SISWA CUKUP */}
              <tr>
                <td>Bina Reza Yuanda</td>
                <td>85%</td>
                <td>3 Hari</td>
                <td>1</td>
                <td><span className="dg-badge izin">Perlu Perhatian</span></td>
              </tr>

              {/* SISWA BERMASALAH */}
              <tr>
                <td>Siti Aminah</td>
                <td>70%</td>
                <td>5 Hari</td>
                <td>4</td>
                <td><span className="dg-badge belum">Bermasalah</span></td>
              </tr>

              {/* SISWA NORMAL */}
              <tr>
                <td>Rizky Saputra</td>
                <td>93%</td>
                <td>1 Hari</td>
                <td>0</td>
                <td><span className="dg-badge hadir">Baik</span></td>
              </tr>

              {/* SISWA BERMASALAH */}
              <tr>
                <td>Dewi Lestari</td>
                <td>60%</td>
                <td>2 Hari</td>
                <td>6</td>
                <td><span className="dg-badge belum">Bermasalah</span></td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default LaporanSiswaWali;
