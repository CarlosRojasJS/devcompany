import { MostrarMermas } from "./MostrarMermas";
import { RegEntradas } from "./RegEntradas";
import { RegTareas } from "./RegTareas";
import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const Informes = () => {
  const [registroSeleccionado, setRegistroSeleccionado] = useState("");

  //Generar pdf
  const generarPDF = () => {
    const input = document.getElementById("divinformes");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("RegistroDevCompany.pdf");
    });
  };

  return (
    <>
      <div id="tituloinformes">
        <h1>Informes de registros</h1>
      </div>
      <div id="seleccioninformes">
        <p style={{ color: "black" }}>SELECCIONA EL TIPO DE REGISTRO: </p>
        <select
          name=""
          id="registros"
          value={registroSeleccionado}
          onChange={(e) => setRegistroSeleccionado(e.target.value)}
        >
          <option value=""></option>
          <option value="registrodeentradas">Registro de entradas</option>
          <option value="registrodetareas">Registro de tareas</option>
          <option value="registrodemermas">Registro de mermas</option>
        </select>
      </div>
      {registroSeleccionado && (
        <>
          <div id="divinformes">
            {registroSeleccionado === "registrodeentradas" ? (
              <RegEntradas />
            ) : null}
            {registroSeleccionado === "registrodetareas" ? <RegTareas /> : null}
            {registroSeleccionado === "registrodemermas" ? (
              <MostrarMermas />
            ) : null}
          </div>
          <button id="pdf" onClick={generarPDF}>
            EXPORTAR A PDF
          </button>
        </>
      )}
    </>
  );
};
