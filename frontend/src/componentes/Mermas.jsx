import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "/api.js";

export const Mermas = () => {
  const [usuarios, setUsuarios] = useState([""]);
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [causas, setCausas] = useState("");
  const [responsable, setResponsable] = useState("");
  const [mejoras, setMejoras] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/usuarios`)
      .then((response) => setUsuarios(response.data))
      .catch(() => setError("Error al obtener los usuarios"));
  }, []);

  const ingresarMerma = async (e) => {
    e.preventDefault();
    if (!tipo || !descripcion || !causas || !responsable || !mejoras) {
      setError("Todos los campos son obligatorios");
      return;
    } else {
      setError("");
    }

    try {
      await axios.post(`${backendUrl}/admin/ingresomermas`, {
        tipo,
        descripcion,
        causas,
        responsable,
        mejoras,
      });
      setTipo("");
      setDescripcion("");
      setCausas("");
      setResponsable("");
      setMejoras("");
      window.alert("MERMA INGRESADA CORRECTAMENTE");
    } catch (error) {
      window.alert("ERROR AL INGRESAR MERMA", error);
    }
  };

  return (
    <div id="mermas">
      <h1>Ingreso de mermas</h1>
      <label htmlFor="">Tipo:</label>
      <input
        type="text"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <label htmlFor="">Descripción:</label>
      <textarea
        className="textareamermas"
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <label htmlFor="">Causas:</label>
      <input
        type="text"
        value={causas}
        onChange={(e) => setCausas(e.target.value)}
      />
      <label htmlFor="">Responsable:</label>
      <p>{error}</p>
      <select
        name=""
        id="responsable"
        value={responsable}
        onChange={(e) => setResponsable(e.target.value)}
      >
        <option value="">Seleccionar responsable</option>
        {usuarios.map((usuario) => (
          <option key={usuario._id} value={usuario._id}>
            {usuario.nombre} {usuario.apellido}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="">Mejoras</label>
      <textarea
        className="textareamermas"
        type="text"
        value={mejoras}
        onChange={(e) => setMejoras(e.target.value)}
      />
      <button id="btninmermas" onClick={ingresarMerma}>
        Ingresar merma
      </button>
    </div>
  );
};
