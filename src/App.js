import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navegacion from './Components/Navegacion';
import Inicio from './Components/Inicio';
import Servicios from './Components/Servicios';
import Contacto from './Components/Contacto';
import Footer from './Components/Footer';
import Reservas from './Components/Reservas';
import ListaReservas from './Components/ListaReservas';
import Calendario from './Components/Calendario';

const App = () => {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    setReservas(reservasGuardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem('reservas', JSON.stringify(reservas));
  }, [reservas]);

  const agregarReserva = (nuevaReserva) => {
    const existeReserva = reservas.some(
      (reserva) =>
        reserva.fecha === nuevaReserva.fecha &&
        reserva.hora === nuevaReserva.hora &&
        reserva.mesa === nuevaReserva.mesa
    );

    if (existeReserva) {
      setMensaje('La mesa ya está reservada en esa fecha y hora.');
      return false;
    }

    setReservas([...reservas, nuevaReserva]);
    setMensaje('Reserva registrada correctamente.');
    return true;
  };

  const eliminarReserva = (index) => {
    const nuevasReservas = reservas.filter((_, i) => i !== index);
    setReservas(nuevasReservas);
    setMensaje('Reserva eliminada correctamente.');
  };

  const cerrarMensaje = () => {
    setMensaje('');
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

          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;

