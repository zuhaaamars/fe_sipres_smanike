import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/DataMapel-master.css';

const DataMapel = () => {

  const [mapel, setMapel] = useState([]);

  const [form, setForm] = useState({
    kode_mapel: '',
    nama_mapel: '',
    kelompok: '',
  });

  // 🔹 GET DATA DARI BACKEND
  const getMapel = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/mapel/'); // ✅ FIX
      setMapel(res.data);
    } catch (error) {
      console.error('Error ambil data:', error);
    }
  };

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 SUBMIT KE BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/mapel/', form); // ✅ FIX

      alert('Mapel berhasil ditambahkan!');
      getMapel();

      setForm({
        kode_mapel: '',
        nama_mapel: '',
        kelompok: '',
      });

    } catch (error) {
      console.error('Error tambah data:', error);
      alert('Gagal menambahkan data');
    }
  };

  // 🔹 LOAD DATA
  useEffect(() => {
    getMapel();
  }, []);

  return (
    <div className="container-mapel">

      <h2>Master Data Mata Pelajaran</h2>

      {/* FORM */}
      <form className="form-mapel" onSubmit={handleSubmit}>
        <h3>Tambah Mata Pelajaran</h3>

        <div className="form-grid">

          <input
            type="text"
            name="kode_mapel"
            placeholder="Kode Mapel (MTK01)"
            value={form.kode_mapel}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="nama_mapel"
            placeholder="Nama Mapel"
            value={form.nama_mapel}
            onChange={handleChange}
            required
          />

          <select
            name="kelompok"
            value={form.kelompok}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Kelompok</option>
            <option value="Wajib">Wajib</option>
            <option value="Peminatan">Peminatan</option>
          </select>

        </div> {/* ✅ FIX: penutup form-grid */}

        <button type="submit" className="btn-submit">
          Simpan
        </button>

      </form>

      {/* TABLE */}
      <table className="table-mapel">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode</th>
            <th>Nama Mapel</th>
            <th>Kelompok</th>
          </tr>
        </thead>
        <tbody>
          {mapel.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}> {/* ✅ FIX */}
                Belum ada data
              </td>
            </tr>
          ) : (
            mapel.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.kode_mapel}</td>
                <td>{item.nama_mapel}</td>
                <td>{item.kelompok}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

export default DataMapel;