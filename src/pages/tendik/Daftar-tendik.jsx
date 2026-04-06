import React from 'react';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import '../css/Daftar-tendik.css';

const DaftarTendik = () => {
  return (
    <div className="auth-container">
      <div className="auth-glass-card profile-card">
        <header className="profile-header">
          <h2>PROFIL TATA USAHA</h2>
        </header>

        <form className="auth-form-profile">
          <div className="input-group-profile">
            <label>NIP / NIK</label>
            <div className="input-wrapper-profile">
              <input type="text" placeholder="misal: 1234567890" required />
              <CreditCard size={18} className="icon-right" />
            </div>
          </div>

          <div className="input-group-profile">
            <label>Unit Kerja</label>
            <div className="input-wrapper-profile">
              <select className="auth-select-profile" required>
                <option value="" disabled selected>Pilih Unit Kerja</option>
                <option value="tu">Tata Usaha</option>
                <option value="piket">Guru Piket</option>
                <option value="kurikulum">Kurikulum</option>
              </select>
            </div>
          </div>

          <div className="input-group-profile">
            <label>Kode Otoritas</label>
            <div className="input-wrapper-profile">
              <Lock size={18} className="icon-left" />
              <input type="password" placeholder="Ketik Kode validasi Sekolah" required />
            </div>
          </div>

          <div className="auth-action-row">
            <button type="button" className="btn-back-profile" onClick={() => window.history.back()}>
              Kembali
            </button>
            <button type="submit" className="btn-submit-profile">
              Selesai & Daftar <CheckCircle size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DaftarTendik;