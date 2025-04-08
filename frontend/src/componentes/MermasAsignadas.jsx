import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { backendUrl } from "/api.js";

export const MermasAsignadas = () => {
  const [mermas, setMermas] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const usuario = location.state;

  console.log(usuario);

  useEffect(() => {
    if (!usuario || !usuario.id) {
      setError("Usuario no encontrado");
      return;
    }

    axios
      .get(`${backendUrl}/usuario/mermas/${usuario.id}`)
      .then((response) => setMermas(response.data.reverse()))
      .catch(() => setError("Error al obtener las mermas"));
  }, [usuario]);

  return (
    <>
    <div id="titulomermas">
      <h2 style={{color:"white", textAlign:"center"}}>Mermas Asignadas</h2>
    </div>
    <div id="divmermasusuario">
      
      <p>{error}</p>
      

      {mermas.length === 0 && !error ? (
        <p
          style={{ textAlign: "center", background: "white", padding: "10px", borderRadius: "10px" }}
        >
          No existen mermas asignadas
        </p>
      ) : (
        mermas.map((merma) => (
          <div id="contenedordemerma" key={merma._id}>
            <h2>{merma.tipo}</h2>
            <h3>{merma.descripcion}</h3>
            <p>Causas: {merma.causas}</p>
            <p>Fecha de ingreso: {merma.fecha}</p>
            <p>Asignada por: {merma.admin}</p>
          </div>
        ))
      )}
    </div>
    
    </>
  );
};
