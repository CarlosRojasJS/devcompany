import axios from "axios";
import { useEffect, useState } from "react";

export const VerUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/usuarios")
      .then((response) => setUsuarios(response.data))
      .catch(() => setError("Error al obtener los usuarios"));
  }, []);

  return (
    <>
      <div id="divinfousuarios">
        <h2>Lista de Usuarios</h2>
        <p>{error}</p>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Rut</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Contacto</th>
              <th>Pass</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.rut}</td>
                <td>{usuario.email}</td>
                <td>{usuario.cargo}</td>
                <td>{usuario.contacto}</td>
                <td>{usuario.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
