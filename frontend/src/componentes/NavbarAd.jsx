import React from "react";
import { useState } from "react";
import { VerUsuarios } from "./VerUsuarios";
import { AsignarTareas } from "./AsignarTareas";
import { Informes } from "./Informes";
import { Logout } from "./Logout";
import { Mermas } from "./Mermas";

export const NavbarAd = () => {
  const [componente, setComponente] = useState("");

  return (
    <div>
      <div>
        <div id="contnavbar">
          <div id="contimgmenu">
            <img id="imglogo" src="logo.jpg" alt="" />
          </div>

          <button className="btnmenu" onClick={() => setComponente("usuarios")}>
            Usuarios
          </button>
          <button
            className="btnmenu"
            onClick={() => setComponente("asigtareas")}
          >
            Asignar Tareas
          </button>
          <button className="btnmenu" onClick={() => setComponente("mermas")}>
            Ingreso de mermas
          </button>
          <button className="btnmenu" onClick={() => setComponente("informes")}>
            Informes de registros
          </button>

          <Logout />
        </div>

        <div>
          {componente === "" && (
            <div id="contInicio" style={{ textAlign: "center" }}>
              <h1>¡Con gran entusiasmo te damos la bienvenida! </h1>
              <h2 style={{ color: "white" }}>
                "Tu energía e ideas serán fundamentales para nuestra evolución"
              </h2>
            </div>
          )}
          {componente === "usuarios" && <VerUsuarios />}
          {componente === "asigtareas" && <AsignarTareas />}
          {componente === "mermas" && <Mermas />}
          {componente === "informes" && <Informes />}
        </div>
      </div>
    </div>
  );
};
