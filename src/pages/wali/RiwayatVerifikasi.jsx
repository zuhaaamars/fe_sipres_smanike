import React from 'react';
import { History, CheckCircle2, XCircle, Clock } from 'lucide-react';
import '../css/RiwayatVerifikasi-wali.css';

const RiwayatVerifikasiWali = () => {
  return (
    <div className="dg-container">

      {/* HEADER */}
      <header className="dg-header">
        <div className="dg-header-info">
          <h1>Riwayat Verifikasi Surat</h1>
          <p>Data seluruh ajuan yang telah diverifikasi wali kelas</p>
        </div>

        <div className="dg-user-badge">
          <div className="dg-user-text">
            <span>Wali Kelas XII RPL 1</span>
            <strong>Budi Santoso, S.Kom</strong>
          </div>
          <div className="dg-avatar">W</div>
        </div>
      </header>

      {/* TABLE */}
      <div className="dg-table-section">
        <div className="dg-section-title">
          <h2>Riwayat Verifikasi</h2>
        </div>

        <div className="dg-table-card">
          <table className="dg-table">
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Jenis Surat</th>
                <th>Tanggal Ajuan</th>
                <th>Status</th>
                <th>Keterangan</th>
              </tr>
            </thead>

            <tbody>

              {/* APPROVED */}
              <tr>
                <td>Aditya Pratama</td>
                <td>Surat Izin</td>
                <td>01 April 2026</td>
                <td>
                  <span className="dg-badge hadir">
                    <CheckCircle2 size={14} /> Disetujui
                  </span>
                </td>
                <td>Diteruskan ke Kepala Sekolah</td>
              </tr>

              {/* REJECTED */}
              <tr>
                <td>Bina Reza Yuanda</td>
                <td>Surat Dispensasi</td>
                <td>31 Maret 2026</td>
                <td>
                  <span className="dg-badge izin">
                    <XCircle size={14} /> Ditolak
                  </span>
                </td>
                <td>Data tidak lengkap</td>
              </tr>

              {/* PENDING */}
              <tr>
                <td>Siti Aminah</td>
                <td>Surat Keterangan Aktif</td>
                <td>02 April 2026</td>
                <td>
                  <span className="dg-badge belum">
                    <Clock size={14} /> Diproses
                  </span>
                </td>
                <td>Menunggu pengecekan ulang</td>
              </tr>

              {/* APPROVED */}
              <tr>
                <td>Rizky Saputra</td>
                <td>Surat Peminjaman</td>
                <td>30 Maret 2026</td>
                <td>
                  <span className="dg-badge hadir">
                    <CheckCircle2 size={14} /> Disetujui
                  </span>
                </td>
                <td>Sudah dikirim ke TU</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default RiwayatVerifikasiWali;
