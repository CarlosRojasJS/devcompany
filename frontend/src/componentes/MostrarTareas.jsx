import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { backendUrl } from "/api.js";

export const MostrarTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const usuario = location.state;
  const nuevoEstado = "Finalizada";

  useEffect(() => {
    if (!usuario || !usuario.id) {
      setError("Usuario no encontrado");
      return;
    }

    axios
      .get(`${backendUrl}/usuario/tareas/${usuario.id}`)
      .then((response) => setTareas(response.data.reverse()))
      .catch(() => setError("Error al obtener las tareas"));
  }, [usuario]);

  const actualizarEstado = async (id) => {
    try {
      const fechayhora = new Date().toLocaleString("es-CL", {
        timeZone: "America/Santiago",
        hour12: false,
      });
      await axios.put(`${backendUrl}/usuario/actualizarestado`, {
        id: id,
        nuevoEstado: nuevoEstado,
        fechadetermino: fechayhora,
      });

      setTareas((prevTareas) =>
        prevTareas.map((tarea) =>
          tarea._id === id
            ? { ...tarea, estado: "Finalizada", fechadetermino: fechayhora }
            : tarea
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <>
      <p>{error}</p>
      {tareas.length === 0 && !error ? (
        <p
          style={{ background: "white", padding: "10px", borderRadius: "10px" }}
        >
          No existen tareas asignadas
        </p>
      ) : (
        tareas.map((tarea) => (
          <div key={tarea._id} id="divtarea">
            <h3 style={{ color: "blueviolet" }}>
              <i class="bi bi-list-task"></i> Nueva Tarea
            </h3>

            <div id="titulodescrip">
              <h3 style={{ paddingLeft: "10px" }}>
                <b>{tarea.titulo}</b>
              </h3>
              <p>
                <i class="bi bi-signpost"></i> {tarea.descripcion}
              </p>
              <br />
              <p>
                <small>Fecha de asignación: {tarea.fechadecreacion.toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      hour12: false,
    })}</small>
              </p>
              <p>
                <small>Fecha de termino: {tarea.fechadetermino.toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      hour12: false,
    })}</small>
              </p>
            </div>

            <p style={{ textAlign: "center" }}>
              <small>
                <b>Estado: {tarea.estado}</b>{" "}
              </small>
            </p>
            <button
              id="btnfintarea"
              disabled={tarea.estado === "Finalizada"}
              onClick={() => actualizarEstado(tarea._id)}
            >
              Tarea finalizada
            </button>
          </div>
        ))
      )}
    </>
  );
};
