import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/DataJurusan-master.css';

const DataJurusan = () => {

  const [jurusan, setJurusan] = useState([]);

  const [form, setForm] = useState({
    nama_jurusan: ''
  });

  // 🔥 GET DATA DARI BACKEND
  const getJurusan = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jurusan/');
      setJurusan(res.data);
    } catch (error) {
      console.error('Error ambil jurusan:', error);
    }
  };

  // 🔹 LOAD DATA
  useEffect(() => {
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

    try {
      await axios.post('http://localhost:5000/api/jurusan/', form);

      alert('Jurusan berhasil ditambahkan!');
      getJurusan(); // refresh data

      setForm({
        nama_jurusan: ''
      });

    } catch (error) {
      console.error('Error tambah jurusan:', error);
      alert('Gagal menambahkan jurusan');
    }
  };

  return (
    <div className="container-kelas">

      <h2>Master Data Jurusan</h2>

      {/* FORM */}
      <form className="form-kelas" onSubmit={handleSubmit}>
        <h3>Tambah Data Jurusan</h3>

        <div className="form-grid">

          <input
            type="text"
            name="nama_jurusan"
            value={form.nama_jurusan}
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
            <th>Nama Jurusan</th>
          </tr>
        </thead>
        <tbody>
          {jurusan.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                Belum ada data jurusan
              </td>
            </tr>
          ) : (
            jurusan.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama_jurusan}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

export default DataJurusan;