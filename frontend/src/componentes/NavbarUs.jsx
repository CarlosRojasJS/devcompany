import { useState } from "react";
import { InfoPerso } from "./InfoPerso";
import { TareasAsig } from "./TareasAsig";
import { Logout } from "./Logout";
import { MermasAsignadas } from "./MermasAsignadas";

export const NavbarUs = () => {
  const [componente, setComponente] = useState("");

  return (
    <div>
      <div id="contnavbar">
        <div id="contimgmenu">
          <img id="imglogo" src="/logo.jpg" alt="" />
        </div>

        <button className="btnmenu" onClick={() => setComponente("info")}>
          Información personal
        </button>
        <button className="btnmenu" onClick={() => setComponente("tareas")}>
          Tareas Asignadas
        </button>
        <button className="btnmenu" onClick={() => setComponente("mermas")}>
          Mermas Asignadas
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
        {componente === "info" && <InfoPerso />}
        {componente === "tareas" && <TareasAsig />}
        {componente === "mermas" && <MermasAsignadas />}
      </div>
    </div>
  );
};
