import React from 'react';
import { Users, Phone, Mail } from 'lucide-react';
import '../css/DataSiswa-wali.css';

const DataSiswaWali = () => {
  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Data Siswa</h1>
          <p>Daftar lengkap siswa kelas XII RPL 1</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Wali Kelas XII RPL 1</span>
            <strong>Budi Santoso, S.Kom</strong>
          </div>
          <div className="dg-avatar">W</div>
        </div>
      </header>

      {/* SUMMARY */}
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
      </div>

      {/* TABEL DATA SISWA */}
      <div className="dg-table-section">
        <div className="dg-section-title">
          <h2>Daftar Siswa</h2>
        </div>

        <div className="dg-table-card">
          <table className="dg-table">
            <thead>
              <tr>
                <th>NIS</th>
                <th>Nama Siswa</th>
                <th>Jenis Kelamin</th>
                <th>No HP Siswa</th>
                <th>No HP Orang Tua</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>22001</td>
                <td>Aditya Pratama</td>
                <td>Laki-laki</td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0812-3456-7890
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0813-1111-2222
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14}/> aditya@gmail.com
                  </span>
                </td>

                <td><span className="dg-badge hadir">Aktif</span></td>
              </tr>

              <tr>
                <td>22002</td>
                <td>Bina Reza Yuanda</td>
                <td>Laki-laki</td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0812-9876-5432
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0813-2222-3333
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14}/> bina@gmail.com
                  </span>
                </td>

                <td><span className="dg-badge hadir">Aktif</span></td>
              </tr>

              <tr>
                <td>22003</td>
                <td>Siti Aminah</td>
                <td>Perempuan</td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0821-1222-3333
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0813-3333-4444
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14}/> siti@gmail.com
                  </span>
                </td>

                <td><span className="dg-badge izin">Cuti</span></td>
              </tr>

              <tr>
                <td>22004</td>
                <td>Rizky Saputra</td>
                <td>Laki-laki</td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0856-7891-2345
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0813-4444-5555
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14}/> rizky@gmail.com
                  </span>
                </td>

                <td><span className="dg-badge hadir">Aktif</span></td>
              </tr>

              <tr>
                <td>22005</td>
                <td>Dewi Lestari</td>
                <td>Perempuan</td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0877-1234-5678
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14}/> 0813-5555-6666
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14}/> dewi@gmail.com
                  </span>
                </td>

                <td><span className="dg-badge belum">Nonaktif</span></td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DataSiswaWali;
