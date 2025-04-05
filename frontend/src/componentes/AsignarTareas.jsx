import React, { useEffect, useState } from "react";
import axios from "axios";
import { Historialdetareas } from "./HistorialTareas";
import { backendUrl } from "/api.js"

export const AsignarTareas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/usuarios`)
      .then((response) => setUsuarios(response.data))
      .catch(() => setError("Error al obtener los usuarios"));
  }, []);

  const enviardatos = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/admin/agregartarea`, {
        titulo,
        descripcion,
        usuarioId,
      });

      setTitulo("");
      setDescripcion("");
      setUsuarioId("");
      setError("");
      window.alert("TAREA ASIGNADA CORRECTAMENTE");
    } catch (error) {
      window.alert("ERROR AL ASIGNAR TAREA", error);
    }
  };

  return (
    <div id="conteasigtareas">
      <div id="contasigtarea">
        <h1>Asignar tarea</h1>
        <label htmlFor="tittarea">Título de la tarea: </label>
        <input
          id="tittarea"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label htmlFor="descripcion">Descripción de la tarea:</label>
        <br />
        <textarea
          id="descripcion"
          style={{ height: "100px" }}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
        <p>Asignar a: </p>
        <select
          id="selectasig"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        >
          <option value="">Selecciona un usuario </option>
          {usuarios.map((usuario) => (
            <option key={usuario._id} value={usuario.id}>
              {usuario.nombre + " " + usuario.apellido}
            </option>
          ))}
        </select>
        <p>{error}</p>
        <button id="btnasig" onClick={enviardatos}>
          ASIGNAR TAREA
        </button>
      </div>

      <div id="tareasasignadas">
        <h2>Historial Tareas Asignadas</h2>
        <Historialdetareas />
      </div>
    </div>
  );
};
