import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navegacion from "./Components/Navegacion";
import Inicio from "./Components/Inicio";
import Servicios from "./Components/Servicios";
import Contacto from "./Components/Contacto";
import Footer from "./Components/Footer";
import Reservas from "./Components/Reservas";
import ListaReservas from "./Components/ListaReservas";
import Calendario from "./Components/Calendario";
import Login from "./Components/Login";
import GestionAdmin from "./Components/GestionAdmin";

const API_RESERVAS = "http://localhost:3001/reservas";

const prepararReserva = (reserva) => ({
  nombre: reserva.nombre,
  telefono: reserva.telefono,
  fecha: reserva.fecha,
  hora: reserva.hora,
  personas: Number(reserva.personas),
  mesa: reserva.mesa,
  comentario: reserva.comentario,
  estado: reserva.estado,
});

const App = () => {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const cargarReservas = useCallback(async () => {
    try {
      const respuesta = await fetch(API_RESERVAS);
      const data = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(data.mensaje || "Error al cargar las reservas.");
        return;
      }

      setReservas(data);
    } catch (error) {
      console.log("Error al cargar reservas:", error);
      setMensaje("No se pudo conectar con el servidor.");
    }
  }, []);

  useEffect(() => {
    cargarReservas();
  }, [cargarReservas]);

  const enviarReserva = async ({
    url,
    metodo,
    datos,
    mensajeError,
    mensajeCorrecto,
  }) => {
    try {
      const opciones = {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (datos) {
        opciones.body = JSON.stringify(datos);
      }

      const respuesta = await fetch(url, opciones);
      const data = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(data.mensaje || mensajeError);
        return false;
      }

      setMensaje(data.mensaje || mensajeCorrecto);
      await cargarReservas();

      return true;
    } catch (error) {
      console.log("Error en la operación de reserva:", error);
      setMensaje("No se pudo conectar con el servidor.");
      return false;
    }
  };

  const agregarReserva = async (nuevaReserva) => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    const reservaParaGuardar = {
      ...nuevaReserva,
      id_usuario: usuarioActivo?.id_usuario || null,
    };

    return enviarReserva({
      url: API_RESERVAS,
      metodo: "POST",
      datos: reservaParaGuardar,
      mensajeError: "Error al registrar la reserva.",
      mensajeCorrecto: "Reserva registrada correctamente.",
    });
  };

  const actualizarReserva = async (idReserva, reservaActualizada) => {
    return enviarReserva({
      url: `${API_RESERVAS}/${idReserva}`,
      metodo: "PUT",
      datos: prepararReserva(reservaActualizada),
      mensajeError: "Error al actualizar la reserva.",
      mensajeCorrecto: "Reserva actualizada correctamente.",
    });
  };

  const eliminarReserva = async (idReserva) => {
    return enviarReserva({
      url: `${API_RESERVAS}/${idReserva}`,
      metodo: "DELETE",
      mensajeError: "Error al eliminar la reserva.",
      mensajeCorrecto: "Reserva eliminada correctamente.",
    });
  };

  const cerrarMensaje = () => {
    setMensaje("");
  };

  return (
    <Router>
      <Navegacion />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route path="/servicios" element={<Servicios />} />

          <Route
            path="/reservas"
            element={
              <Reservas
                agregarReserva={agregarReserva}
                mensaje={mensaje}
                cerrarMensaje={cerrarMensaje}
              />
            }
          />

          <Route
            path="/lista-reservas"
            element={
              <ListaReservas
                reservas={reservas}
                eliminarReserva={eliminarReserva}
              />
            }
          />

          <Route
            path="/calendario"
            element={<Calendario reservas={reservas} />}
          />

          <Route
            path="/gestion-admin"
            element={
              <GestionAdmin
                reservas={reservas}
                actualizarReserva={actualizarReserva}
              />
            }
          />

          <Route path="/contacto" element={<Contacto />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;