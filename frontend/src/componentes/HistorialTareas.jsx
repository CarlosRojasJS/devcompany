import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { backendUrl } from "/api.js";

const socket = io(`${backendUrl}`);
export const Historialdetareas = () => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/historialtareas`)
      .then((response) => setTareas(response.data.reverse()))
      .catch(() => setError("Error al obtener las tareas"));
  }, []);

  useEffect(() => {
    axios
      .get(`${backendUrl}/admin/usuarios`)
      .then((response) => setUsuarios(response.data))
      .catch(() => setError("Error al obtener los usuarios"));
  }, []);

  useEffect(() => {
    try {
      socket.on("nuevatarea", (tareanueva) => {
        setTareas((prevTareas) => [...prevTareas, tareanueva]);
      });
      return () => {
        socket.off("nuevatarea");
      };
    } catch (error) {
      console.error("Error en la conexión con Websocket:", error);
    }
  }, []);

  const obtenerNombreUsuario = (usuarioId) => {
    return (
      usuarios.find((user) => user.id === usuarioId) || {
        nombre: "",
        apellido: "",
      }
    );
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Descripción</th>
            <th>Asignación</th>
            <th>Estado</th>
            <th>Fecha de creación</th>
            <th>Fecha de termino</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => {
            const usuario = obtenerNombreUsuario(tarea.usuarioId);
            return (
              <tr key={tarea._id}>
                <td>{tarea.titulo}</td>
                <td>{tarea.descripcion}</td>
                <td>{usuario.nombre + " " + usuario.apellido}</td>
                <td>{tarea.estado}</td>
                <td>{tarea.fechadecreacion}</td>
                <td>{tarea.fechadetermino}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
