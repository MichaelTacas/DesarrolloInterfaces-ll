import React, { useEffect, useState } from "react";
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

const App = () => {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const cargarReservas = async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/reservas");
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
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const agregarReserva = async (nuevaReserva) => {
    try {
      const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

      const reservaParaGuardar = {
        ...nuevaReserva,
        id_usuario: usuarioActivo?.id_usuario || null,
      };

      const respuesta = await fetch("http://localhost:3001/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservaParaGuardar),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(data.mensaje || "Error al registrar la reserva.");
        return false;
      }

      setMensaje(data.mensaje || "Reserva registrada correctamente.");
      await cargarReservas();
      return true;
    } catch (error) {
      console.log("Error al registrar reserva:", error);
      setMensaje("No se pudo conectar con el servidor.");
      return false;
    }
  };

  const actualizarReserva = async (idReserva, reservaActualizada) => {
    try {
      const respuesta = await fetch(
        `http://localhost:3001/reservas/${idReserva}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservaActualizada),
        }
      );

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(data.mensaje || "Error al actualizar la reserva.");
        return false;
      }

      setMensaje(data.mensaje || "Reserva actualizada correctamente.");
      await cargarReservas();
      return true;
    } catch (error) {
      console.log("Error al actualizar reserva:", error);
      setMensaje("No se pudo conectar con el servidor.");
      return false;
    }
  };

  const eliminarReserva = async (idReserva) => {
    try {
      const respuesta = await fetch(
        `http://localhost:3001/reservas/${idReserva}`,
        {
          method: "DELETE",
        }
      );

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(data.mensaje || "Error al eliminar la reserva.");
        return;
      }

      setMensaje(data.mensaje || "Reserva eliminada correctamente.");
      await cargarReservas();
    } catch (error) {
      console.log("Error al eliminar reserva:", error);
      setMensaje("No se pudo conectar con el servidor.");
    }
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