import React, { useState } from 'react';
import '../css/DataGuru-master.css';

const DataGuruMaster = () => {

  const [guru, setGuru] = useState([]);

  const [form, setForm] = useState({
    nip: '',
    nama_guru: '',
    jenis_kelamin: '',
    mapel: '',
    no_hp: ''
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      id: Date.now(),
      ...form
    };

    setGuru([...guru, newData]);

    setForm({
      nip: '',
      nama_guru: '',
      jenis_kelamin: '',
      mapel: '',
      no_hp: ''
    });
  };

  return (
    <div className="container-guru">

      <h2>Master Data Guru</h2>

      {/* FORM */}
      <form className="form-guru" onSubmit={handleSubmit}>
        <h3>Tambah Data Guru</h3>

        <div className="form-grid">

          <input
            type="text"
            name="nip"
            placeholder="NIP"
            value={form.nip}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="nama_guru"
            placeholder="Nama Guru"
            value={form.nama_guru}
            onChange={handleChange}
            required
          />

          <select
            name="jenis_kelamin"
            value={form.jenis_kelamin}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Gender</option>
            <option>Laki-laki</option>
            <option>Perempuan</option>
          </select>

          <input
            type="text"
            name="mapel"
            placeholder="Mapel yang diajar"
            value={form.mapel}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="no_hp"
            placeholder="No HP"
            value={form.no_hp}
            onChange={handleChange}
          />

        </div>

        <button type="submit" className="btn-submit">
          Simpan
        </button>
      </form>

      {/* TABLE */}
      <table className="table-guru">
        <thead>
          <tr>
            <th>No</th>
            <th>NIP</th>
            <th>Nama Guru</th>
            <th>Gender</th>
            <th>Mapel</th>
            <th>No HP</th>
          </tr>
        </thead>
        <tbody>
          {guru.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                Belum ada data guru
              </td>
            </tr>
          ) : (
            guru.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nip}</td>
                <td>{item.nama_guru}</td>
                <td>{item.jenis_kelamin}</td>
                <td>{item.mapel}</td>
                <td>{item.no_hp}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

export default DataGuruMaster;
