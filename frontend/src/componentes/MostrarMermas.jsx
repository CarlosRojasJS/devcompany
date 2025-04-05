import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "/api.js";

export const MostrarMermas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [mermas, setMermas] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/usuarios`)
      .then((response) => setUsuarios(response.data))
      .catch(() => setError("Error al obtener los usuarios"));
  }, []);

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/mermas`)	
      .then((response) => setMermas(response.data.reverse()))
      .catch(() => setError("Error al obtener las mermas"));
  }, []);

  const mermasfiltradas = usuarioSeleccionado
    ? mermas.filter((merma) => merma.responsable === usuarioSeleccionado)
    : mermas;

  const obtenerNombreUsuario = (usuarioId) => {
    return (
      usuarios.find((usuario) => usuario.id === usuarioId) || {
        nombre: "",
        apellido: "",
      }
    );
  };

  return (
    <div>
      <h2>Registro de mermas</h2>
      <label htmlFor="usuarios">Selecciona un usuario: </label>
      <p>{error}</p>
      <select
        id="usuarios"
        value={usuarioSeleccionado}
        onChange={(e) => setUsuarioSeleccionado(e.target.value)}
      >
        <option value="">Todos los usuarios</option>
        {usuarios.map((usuario) => (
          <option key={usuario._id} value={usuario.id}>
            {usuario.nombre} {usuario.apellido}
          </option>
        ))}
      </select>

      {mermasfiltradas.length === 0 ? (
        <p
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          NO EXISTEN REGISTROS DE MERMAS PARA EL USUARIO SELECCIONADO
        </p>
      ) : null}

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Causas</th>
            <th>Responsable</th>
            <th>Mejoras</th>
            <th>Asignada por</th>
          </tr>
        </thead>
        <tbody>
          {mermas.map((merma) => {
            const usuario = obtenerNombreUsuario(merma.responsable);
            return (
              <tr key={merma._id}>
                <td>{merma.fecha}</td>
                <td>{merma.tipo}</td>
                <td>{merma.descripcion}</td>
                <td>{merma.causas}</td>
                <td>{usuario.nombre + " " + usuario.apellido}</td>
                <td>{merma.mejoras}</td>
                <td>{merma.admin}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
