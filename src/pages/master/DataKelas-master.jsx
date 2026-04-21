import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/DataKelas-master.css';

const DataKelasMaster = () => {

  const [kelas, setKelas] = useState([]);
  const [listJurusan, setListJurusan] = useState([]);

  const [form, setForm] = useState({
    kelas: '',
    jurusan_id: '',
    wali_kelas: ''
  });

  // 🔥 GET DATA KELAS
  const getKelas = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/kelas/');
      setKelas(res.data);
    } catch (error) {
      console.error('Error ambil kelas:', error);
    }
  };

  // 🔥 GET DATA JURUSAN
  const getJurusan = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jurusan/');
      setListJurusan(res.data);
    } catch (error) {
      console.error('Error ambil jurusan:', error);
    }
  };

  // 🔹 LOAD DATA
  useEffect(() => {
    getKelas();
    getJurusan();
  }, []);

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 SUBMIT KE BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.kelas || !form.jurusan_id || !form.wali_kelas) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/kelas/', form);

      alert('Kelas berhasil ditambahkan!');
      getKelas();

      setForm({
        kelas: '',
        jurusan_id: '',
        wali_kelas: ''
      });

    } catch (error) {
      console.error('Error tambah kelas:', error);
      alert(error.response?.data?.message || 'Gagal menambahkan kelas');
    }
  };

  return (
    <div className="container-kelas">

      <h2>Master Data Kelas</h2>

      {/* FORM */}
      <form className="form-kelas" onSubmit={handleSubmit}>
        <h3>Tambah Data Kelas</h3>

        <div className="form-grid">

          {/* NAMA KELAS */}
          <input
            type="text"
            name="kelas"
            placeholder="kelas : X / XI / XII"
            value={form.kelas}
            onChange={handleChange}
            required
          />

          {/* JURUSAN */}
          <select
            name="jurusan_id"
            value={form.jurusan_id}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Jurusan</option>
            {listJurusan.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama_jurusan}
              </option>
            ))}
          </select>

          {/* WALI KELAS */}
          <input
            type="text"
            name="wali_kelas"
            placeholder="Nama wali kelas"
            value={form.wali_kelas}
            onChange={handleChange}
            required
          />

        </div>

        <button type="submit" className="btn-submit">
          Simpan
        </button>
      </form>

      {/* TABLE */}
      <table className="table-kelas">
        <thead>
          <tr>
            <th>No</th>
            <th>Kelas</th>
            <th>Jurusan</th>
            <th>Wali Kelas</th>
          </tr>
        </thead>
        <tbody>
          {kelas.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                Belum ada data kelas
              </td>
            </tr>
          ) : (
            kelas.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.kelas}</td>
                <td>{item.nama_jurusan}</td>
                <td>{item.wali_kelas}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

export default DataKelasMaster;