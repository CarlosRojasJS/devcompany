import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    const registroactivo = JSON.parse(localStorage.getItem("registroactivo"));

    if (!registroactivo || !registroactivo._id)
      console.error("No se encontró ningún registro");
    try {
      axios.post("http://localhost:5000/logout", {
        _id: registroactivo._id,
      });
      localStorage.removeItem("registroactivo");
      navigate("/");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <button className="btnmenu" id="btnlogout" onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
    </>
  );
};
