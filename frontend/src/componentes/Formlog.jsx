import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "/api.js";

export const Formlog = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/login`, {
        email,
        pass,
      });
      
      if(response.data){
        localStorage.setItem("registroactivo", JSON.stringify({
          ...response.data, _id: response.data.registroId,
        }))
      }

      if (response.data.rol === "admin") {
        navigate("/menuad");
      } else {
        navigate("/menuus", { state: response.data });
      }
    
    } catch (error) {
      setError("Email o contraseña incorrectas");
      console.error(error);
    }
  };

  return (
    <div id="contform">
      <form id="formlogin" onSubmit={handleSubmit}>
        <div id="contimg">
          <img id="imglogo" src="/logo.jpg" alt="logo" />
        </div>
        <div id="continp">
          <label className="lbl" htmlFor="inid">
            EMAIL USUARIO
          </label>
          <input
            id="inid"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="lbl" htmlFor="inkey">
            CLAVE DE ACCESO
          </label>
          <input
            id="inkey"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit" id="btnform">
            ACCEDER
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};
