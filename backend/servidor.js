const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const servidorhttp = http.createServer(app);
const io = new Server(servidorhttp, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function cnnbd() {
  try {
    await client.connect();
    console.log("Conectado");
  } catch (error) {
    console.error("Error al conectar", error);
  }
}
cnnbd();

//Variables base de datos
const bd = client.db("devcompany");
const usuariosbd = bd.collection("usuarios");

//Conectar clientes a Websocket
io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

//Validar login
app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const fechayhora = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      hour12: false,
    });
    const usuario = await usuariosbd.findOne({ email: email });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (pass !== usuario.key) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const registrousuario = {
      usuario: new ObjectId(usuario._id),
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      entrada: fechayhora,
      salida: null,
    };

    const bd = client.db("devcompany");
    const registro = await bd.collection("regin").insertOne(registrousuario);

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rut: usuario.rut,
      cargo: usuario.cargo,
      contacto: usuario.contacto,
      email: usuario.email,
      rol: usuario.rol,
      registroId: registro.insertedId, //enviar el id de registro al frontend
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Obtener usuarios
app.get("/admin/usuarios", async (req, res) => {
  try {
    const usuarios = await usuariosbd.find().toArray();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Agregar tarea
app.post("/admin/agregartarea", async (req, res) => {
  try {
    const fechayhora = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      hour12: false,
    });

    const { titulo, descripcion, usuarioId } = req.body;

    if (!titulo || !descripcion || !usuarioId) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const nuevatarea = {
      titulo,
      descripcion,
      usuarioId,
      estado: "pendiente",
      fechadecreacion: fechayhora,
      fechadetermino: null,
    };

    const tareas = bd.collection("tareasasig");
    const resultado = await tareas.insertOne(nuevatarea);
    io.emit("nuevatarea", nuevatarea);

    res.json({ mensaje: "Tarea asignada", tareaId: resultado.insertedId });
  } catch (error) {
    console.error("Error al asignar");
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Obtener tareas
app.get("/admin/historialtareas", async (req, res) => {
  try {
    const colectareas = bd.collection("tareasasig");
    const tareas = await colectareas.find().toArray();
    res.json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Actualizar estado y fecha de termino de tarea
app.put("/usuario/actualizarestado", async (req, res) => {
  const { id, nuevoEstado, fechadetermino } = req.body;
  try {
    const fechayhora = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      hour12: false,
    });
    const bd = client.db("devcompany");
    const tareasasig = bd.collection("tareasasig");
    await tareasasig.updateOne(
      { _id: new ObjectId(id) },
      { $set: { estado: nuevoEstado, fechadetermino: fechayhora } }
    );
    io.emit("Tarea finalizada", tareafinalizada);
    res.json({ mensaje: "Estado actualizado correctamente" });
  } catch (error) {
    res.json({ error: "Error en el servidor" });
  }
});
//Obtener tareas de un usuario
app.get("/usuario/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const colectareas = bd.collection("tareasasig");
    const tareas = await colectareas.find({ usuarioId: id }).toArray();
    res.json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Cerrar sesión
app.post("/logout", async (req, res) => {
  try {
    const fechayhora = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      hour12: false,
    });
    const { _id } = req.body;
    const response = await bd
      .collection("regin")
      .findOneAndUpdate(
        { _id: new ObjectId(_id), salida: null },
        { $set: { salida: fechayhora } },
        { returnDocument: "after" }
      );

    if (!response.value) {
      return res
        .status(404)
        .json({ error: "Registro no encontrado o ya actualizado" });
    }

    res.json({ message: "Salida registrada con éxito", data: resultado.value });
  } catch (error) {
    console.error("Error en /logout:", error);
    res.status(500).json({ error: "Error al registrar salida" });
  }
});

//Obtener registros de entrada y salida
app.get("/admin/registros", async (req, res) => {
  try {
    const registros = await bd.collection("regin").find().toArray();
    res.json(registros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Ingresar mermas
app.post("/admin/ingresomermas", async (req, res) => {
  try {
    const { tipo, descripcion, cantidad, causas, responsable, mejoras } =
      req.body;

    const fechayhora = new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      hour12: false,
    });

    if (
      !tipo ||
      !descripcion ||
      !causas ||
      !responsable ||
      !mejoras
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const nuevamerma = {
      fecha: fechayhora,
      tipo,
      descripcion,
      causas,
      responsable,
      mejoras,
    };

    const mermas = bd.collection("mermas");
    await mermas.insertOne(nuevamerma);
    io.emit("nuevamerma", nuevamerma);

    res.json({ mensaje: "Merma registrada correctamente" });
  } catch (error) {
    console.error("Error al registrar merma:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Obtener mermas
app.get("/admin/mermas", async (req, res) => {
  try {
    const mermas = await bd.collection("mermas").find().toArray();
    res.json(mermas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

const PORT = process.env.PORT || 5000;
servidorhttp.listen(PORT, async () => {
  console.log(`Servidor en puerto ${PORT}`);
});
