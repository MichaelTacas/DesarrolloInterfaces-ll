const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sabor_criollo",
});

conexion.connect((error) => {
  if (error) {
    console.log("Error al conectar con MySQL:", error);
    return;
  }

  console.log("Conectado correctamente a MySQL");
});

/* =========================
   REGISTRAR USUARIO
========================= */
app.post("/usuarios", (req, res) => {
  const { nombres, dni, telefono, correo, contrasena } = req.body;

  const sql = `
    INSERT INTO usuario 
    (nombres, dni, telefono, correo, contrasena, rol)
    VALUES (?, ?, ?, ?, ?, 'Cliente')
  `;

  conexion.query(
    sql,
    [nombres, dni, telefono, correo, contrasena],
    (error, resultado) => {
      if (error) {
        console.log("Error al registrar usuario:", error);

        if (error.code === "ER_DUP_ENTRY") {
          res.status(400).json({
            mensaje: "Este correo ya está registrado.",
          });
          return;
        }

        res.status(500).json({
          mensaje: "Error al registrar usuario.",
        });
        return;
      }

      res.json({
        mensaje: "Usuario registrado correctamente.",
      });
    }
  );
});

/* =========================
   INICIAR SESIÓN
========================= */
app.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  const sql = `
    SELECT 
      id_usuario,
      nombres,
      dni,
      telefono,
      correo,
      rol
    FROM usuario
    WHERE correo = ? AND contrasena = ?
    LIMIT 1
  `;

  conexion.query(sql, [correo, contrasena], (error, resultados) => {
    if (error) {
      console.log("Error al iniciar sesión:", error);

      res.status(500).json({
        mensaje: "Error al iniciar sesión.",
      });
      return;
    }

    if (resultados.length === 0) {
      res.status(401).json({
        mensaje: "Correo o contraseña incorrectos.",
      });
      return;
    }

    res.json({
      mensaje: "Inicio de sesión correcto.",
      usuario: resultados[0],
    });
  });
});

/* =========================
   REGISTRAR RESERVA
========================= */
app.post("/reservas", (req, res) => {
  const {
    id_usuario,
    nombre,
    telefono,
    fecha,
    hora,
    personas,
    mesa,
    comentario,
  } = req.body;

  const sql = `
    INSERT INTO reserva
    (id_usuario, nombre, telefono, fecha, hora, personas, mesa, comentario)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexion.query(
    sql,
    [
      id_usuario || null,
      nombre,
      telefono,
      fecha,
      hora,
      personas,
      mesa,
      comentario || null,
    ],
    (error, resultado) => {
      if (error) {
        console.log("Error al registrar reserva:", error);

        if (error.code === "ER_DUP_ENTRY") {
          res.status(400).json({
            mensaje: "La mesa ya está reservada en esa fecha y hora.",
          });
          return;
        }

        res.status(500).json({
          mensaje: "Error al registrar la reserva.",
        });
        return;
      }

      res.json({
        mensaje: "Reserva registrada correctamente.",
      });
    }
  );
});

/* =========================
   LISTAR RESERVAS
========================= */
app.get("/reservas", (req, res) => {
  const sql = `
    SELECT
      id_reserva,
      id_usuario,
      nombre,
      telefono,
      DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha,
      TIME_FORMAT(hora, '%H:%i') AS hora,
      personas,
      mesa,
      comentario,
      estado,
      fecha_registro
    FROM reserva
    WHERE estado = 'Activa'
    ORDER BY fecha ASC, hora ASC
  `;

  conexion.query(sql, (error, resultados) => {
    if (error) {
      console.log("Error al listar reservas:", error);

      res.status(500).json({
        mensaje: "Error al obtener las reservas.",
      });
      return;
    }

    res.json(resultados);
  });
});

/* =========================
   ELIMINAR RESERVA
========================= */
app.delete("/reservas/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM reserva
    WHERE id_reserva = ?
  `;

  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      console.log("Error al eliminar reserva:", error);

      res.status(500).json({
        mensaje: "Error al eliminar la reserva.",
      });
      return;
    }

    res.json({
      mensaje: "Reserva eliminada correctamente.",
    });
  });
});

app.listen(3001, () => {
  console.log("Servidor backend ejecutándose en http://localhost:3001");
});