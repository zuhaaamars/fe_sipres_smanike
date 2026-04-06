import React from 'react';
import { CalendarCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';
import '../css/KehadiranHarian-wali.css';

const KehadiranHarianWali = () => {
  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Kehadiran Harian Siswa</h1>
          <p>Monitoring presensi datang & pulang siswa</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Wali Kelas XII RPL 1</span>
            <strong>Budi Santoso, S.Kom</strong>
          </div>
          <div className="dg-avatar">W</div>
        </div>
      </header>

      {/* FILTER (OPTIONAL UI) */}
      <div className="dg-action-grid">
        <div className="dg-action-card">
          <div className="dg-icon-box teal">
            <CalendarCheck size={24} />
          </div>
          <div className="dg-action-content">
            <h3>Hari Ini</h3>
            <p>02 April 2026</p>
          </div>
        </div>
      </div>

      {/* TABEL KEHADIRAN */}
      <div className="dg-table-section">
        <div className="dg-section-title">
          <h2>Data Kehadiran Kelas (XII RPL 1)</h2>
        </div>

        <div className="dg-table-card">
          <table className="dg-table">
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Status Datang</th>
                <th>Waktu Masuk</th>
                <th>Status Pulang</th>
                <th>Waktu Pulang</th>
                <th>Keterangan</th>
              </tr>
            </thead>

            <tbody>

              {/* HADIR NORMAL */}
              <tr>
                <td>Aditya Pratama</td>
                <td><span className="dg-badge hadir"><CheckCircle2 size={14}/> Hadir</span></td>
                <td>07:05</td>
                <td><span className="dg-badge hadir">Pulang</span></td>
                <td>15:10</td>
                <td>-</td>
              </tr>

              {/* TERLAMBAT */}
              <tr>
                <td>Bina Reza Yuanda</td>
                <td><span className="dg-badge izin"><Clock size={14}/> Terlambat</span></td>
                <td>07:35</td>
                <td><span className="dg-badge hadir">Pulang</span></td>
                <td>15:05</td>
                <td>Telat 30 menit</td>
              </tr>

              {/* IZIN */}
              <tr>
                <td>Siti Aminah</td>
                <td><span className="dg-badge izin">Izin</span></td>
                <td>-</td>
                <td><span className="dg-badge izin">Izin</span></td>
                <td>-</td>
                <td>Sakit</td>
              </tr>

              {/* BELUM PULANG */}
              <tr>
                <td>Rizky Saputra</td>
                <td><span className="dg-badge hadir">Hadir</span></td>
                <td>07:10</td>
                <td><span className="dg-badge belum"><Clock size={14}/> Belum Scan</span></td>
                <td>-</td>
                <td>Belum scan pulang</td>
              </tr>

              {/* TIDAK HADIR */}
              <tr>
                <td>Dewi Lestari</td>
                <td><span className="dg-badge belum"><XCircle size={14}/> Alpha</span></td>
                <td>-</td>
                <td><span className="dg-badge belum">-</span></td>
                <td>-</td>
                <td>Tidak hadir tanpa keterangan</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default KehadiranHarianWali;
