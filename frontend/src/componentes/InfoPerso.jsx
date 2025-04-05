import { useLocation } from "react-router-dom";

export const InfoPerso = () => {
  const location = useLocation();
  const usuario = location.state;

  return (
    <div id="pagus">
      <div id="cuerpo">
        <h1>¡Que gusto volver a verte {usuario.nombre}!</h1>
        <h2 style={{ color: "white" }}>
          Aquí puedes visualizar tu información personal
        </h2>
      </div>

      <div id="divinfo">
        <h3 style={{ padding: "5px" }}>
          <i class="bi bi-person"></i> Tus datos personales:
        </h3>
        <div id="divinfoinfo">
          <p>
            <b>Id:</b> {usuario.id}
          </p>
          <p>
            <b>Nombre:</b> {usuario.nombre + " " + usuario.apellido}
          </p>
          <p>
            <b>Rut:</b> {usuario.rut}
          </p>
          <p>
            <b>Cargo:</b> {usuario.cargo}
          </p>
          <p>
            <b>Contacto:</b> {usuario.contacto}
          </p>
          <p>
            <b>E-mail:</b> {usuario.email}
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
