import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "/api.js";

export const RegEntradas = () => {
  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/registros`)
      .then((response) => setRegistros(response.data.reverse()))
      .catch(() => setError("Error al obtener los registros"));
  }, []);

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/usuarios`)
      .then((response) => setUsuarios(response.data))
      .catch(() => setError("Error al obtener los usuarios"));
  }, []);

  const registrofiltrado = usuarioSeleccionado
    ? registros.filter((registro) => registro.usuario === usuarioSeleccionado)
    : registros;

  const obtenerNombreUsuario = (usuarioId) => {
    return (
      usuarios.find((usuario) => usuario._id === usuarioId) || {
        nombre: "",
        apellido: "",
      }
    );
  };

  return (
    <div id="RegEntradas">
      <h2>Registros de entradas y salidas</h2>
      <p>{error}</p>
      <label htmlFor="usuarios">Selecciona un usuario: </label>
      <select
        id="usuarios"
        value={usuarioSeleccionado}
        onChange={(e) => setUsuarioSeleccionado(e.target.value)}
      >
        <option value="">Todos los usuarios</option>
        {usuarios.map((usuario) => (
          <option key={usuario._id} value={usuario._id}>
            {usuario.nombre} {usuario.apellido}
          </option>
        ))}
      </select>

      {registrofiltrado.length === 0 ? (
        <p
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          NO EXISTEN REGISTROS DEL USUARIO SELECCIONADO
        </p>
      ) : null}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Entrada</th>
            <th>Salida</th>
          </tr>
        </thead>
        <tbody>
          {registrofiltrado.map((registro) => {
            const usuario = obtenerNombreUsuario(registro.usuario);
            return (
              <tr key={registro._id}>
                <td>{usuario.nombre + " " + usuario.apellido}</td>
                <td>{usuario.cargo}</td>
                <td>{registro.entrada}</td>
                <td>{registro.salida}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
