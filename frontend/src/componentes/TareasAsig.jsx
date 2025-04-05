import React from "react";
import { MostrarTareas } from "./MostrarTareas";

export const TareasAsig = () => {
  return (
    <>
      <div id="tittarasig">
        <h2 style={{ color: "white" }}>Tareas Asignadas</h2>
      </div>
      <div id="contareasasignadas">
        <MostrarTareas />
      </div>
    </>
  );
};
