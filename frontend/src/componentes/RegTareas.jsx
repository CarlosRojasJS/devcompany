import axios from "axios";
import React, { useEffect, useState } from "react";

export const RegTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/historialtareas")
      .then((response) => setTareas(response.data.reverse()))
      .catch(() => setError("Error al obtener las tareas"));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/usuarios")
      .then((response) => setUsuarios(response.data))
      .catch(() => setError("Error al obtener los usuarios"));
  }, []);

  const tareafiltrada = usuarioSeleccionado
    ? tareas.filter((tarea) => tarea.usuarioId === usuarioSeleccionado)
    : tareas;

  const obtenerNombreUsuario = (usuarioId) => {
    return (
      usuarios.find((usuario) => usuario.id === usuarioId) || {
        nombre: "",
        apellido: "",
      }
    );
  };

  return (
    <div id="RegTareas">
      <h2>Registro de tareas</h2>
      <p>{error}</p>
      <label htmlFor="usuarios">Selecciona un usuario: </label>
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

      {tareafiltrada.length === 0 ? (
        <p
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          NO EXISTEN TAREAS ASIGNADAS PARA EL USUARIO SELECCIONADO
        </p>
      ) : null}

      <table>
        <thead>
          <tr>
            <th>Asignado a</th>
            <th>Cargo</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha de creación</th>
            <th>Estado</th>
            <th>Fecha de término</th>
          </tr>
        </thead>
        <tbody>
          {tareafiltrada.map((tarea) => {
            const usuario = obtenerNombreUsuario(tarea.usuarioId);
            return (
              <tr key={tarea._id}>
                <td>{usuario.nombre + " " + usuario.apellido}</td>
                <td>{usuario.cargo}</td>
                <td>{tarea.titulo}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.fechadecreacion}</td>
                <td>{tarea.estado}</td>
                <td>{tarea.fechadetermino}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
