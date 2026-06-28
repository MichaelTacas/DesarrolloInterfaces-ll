import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ReservaMesa from '../img_reservar/ReservaMesa.png';
import ReservaAmbiente from '../img_reservar/ReservaAmbiente.png';
import ReservaChef from '../img_reservar/ReservaChef.png';
import ReservaPlato from '../img_reservar/ReservaPlato.png';

const Reservas = ({ agregarReserva, mensaje, cerrarMensaje }) => {
  const [reserva, setReserva] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: '',
    mesa: '',
    comentario: ''
  });

  const beneficios = [
    {
      titulo: 'Ambiente acogedor',
      descripcion: 'Disfruta tu reserva en un espacio cálido y familiar.',
      imagen: ReservaAmbiente
    },
    {
      titulo: 'Atención preparada',
      descripcion: 'Nuestro equipo organiza mejor cada reserva registrada.',
      imagen: ReservaChef
    },
    {
      titulo: 'Sabor criollo',
      descripcion: 'Acompaña tu visita con platos tradicionales peruanos.',
      imagen: ReservaPlato
    }
  ];

  const handleChange = (e) => {
    setReserva({
      ...reserva,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservaRegistrada = agregarReserva(reserva);

    if (reservaRegistrada) {
      setReserva({
        nombre: '',
        telefono: '',
        fecha: '',
        hora: '',
        personas: '',
        mesa: '',
        comentario: ''
      });
    }
  };

  return (
    <div className="reservas-page">
      <section className="reservas-hero">
        <div className="container">
          <span className="reservas-etiqueta">Reservas online</span>

          <h1>Reserva tu mesa</h1>

          <p>
            Elige la fecha, hora y mesa para disfrutar una experiencia criolla
            en Sabor Criollo.
          </p>
        </div>
      </section>

      <section className="reservas-contenido">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="reservas-imagen-card">
                <img
                  src={ReservaMesa}
                  alt="Mesa reservada en restaurante"
                  className="reservas-imagen"
                />

                <div className="reservas-imagen-info">
                  <h3>Ambiente cálido y atención organizada</h3>

                  <p>
                    Registra tu reserva y evita cruces de horarios en la atención.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="reservas-form-card">
                <h2>Datos de la reserva</h2>

                <p className="reservas-form-descripcion">
                  Completa la información para separar una mesa disponible.
                </p>

                {mensaje && (
                  <div
                    className={
                      mensaje.includes('correctamente')
                        ? 'alert alert-success reservas-alerta'
                        : 'alert alert-danger reservas-alerta'
                    }
                  >
                    <span>{mensaje}</span>

                    <button
                      type="button"
                      className="btn-close"
                      onClick={cerrarMensaje}
                      aria-label="Cerrar"
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre del cliente</label>

                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        className="form-control"
                        placeholder="Ej: Juan Pérez"
                        value={reserva.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="telefono" className="form-label">Teléfono</label>

                      <input
                        id="telefono"
                        type="text"
                        name="telefono"
                        className="form-control"
                        placeholder="Ej: 999999999"
                        value={reserva.telefono}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="fecha" className="form-label">Fecha</label>

                      <input
                        id="fecha"
                        type="date"
                        name="fecha"
                        className="form-control"
                        value={reserva.fecha}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="hora" className="form-label">Hora</label>

                      <input
                        id="hora"
                        type="time"
                        name="hora"
                        className="form-control"
                        value={reserva.hora}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="personas" className="form-label">Cantidad de personas</label>

                      <select
                        id="personas"
                        name="personas"
                        className="form-select"
                        value={reserva.personas}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="1">1 persona</option>
                        <option value="2">2 personas</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                        <option value="5">5 personas</option>
                        <option value="6">6 personas</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="mesa" className="form-label">Mesa</label>

                      <select
                        id="mesa"
                        name="mesa"
                        className="form-select"
                        value={reserva.mesa}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Seleccionar mesa</option>
                        <option value="Mesa 1">Mesa 1</option>
                        <option value="Mesa 2">Mesa 2</option>
                        <option value="Mesa 3">Mesa 3</option>
                        <option value="Mesa 4">Mesa 4</option>
                        <option value="Mesa 5">Mesa 5</option>
                        <option value="Mesa 6">Mesa 6</option>
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="comentario" className="form-label">Comentario opcional</label>

                      <textarea
                        id="comentario"
                        name="comentario"
                        className="form-control"
                        rows="3"
                        placeholder="Ej: Mesa cerca a la ventana, cumpleaños, silla para niño, etc."
                        value={reserva.comentario}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-danger reservas-btn">
                    Confirmar reserva
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="reservas-beneficios">
            <div className="reservas-titulo-secundario">
              <span>Experiencia completa</span>

              <h2>Reserva con más comodidad</h2>

              <p>
                Además de separar tu mesa, puedes conocer el ambiente, la atención
                y el estilo gastronómico de Sabor Criollo.
              </p>
            </div>

            <div className="row g-4">
              {beneficios.map((item) => (
                <div className="col-md-4" key={item.titulo}>
                  <div className="reservas-beneficio-card">
                    <img
                      src={item.imagen}
                      alt={item.titulo}
                      className="reservas-beneficio-img"
                    />

                    <div className="reservas-beneficio-info">
                      <h4>{item.titulo}</h4>

                      <p>{item.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reservas-info-extra">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="reservas-info-card">
                  <h4>Horario</h4>

                  <p>Lunes a domingo de 12:00 p.m. a 10:00 p.m.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="reservas-info-card">
                  <h4>Tolerancia</h4>

                  <p>La reserva tendrá una tolerancia de 15 minutos.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="reservas-info-card">
                  <h4>Disponibilidad</h4>

                  <p>Revisa las mesas reservadas antes de elegir tu horario.</p>

                  <Link to="/calendario" className="reservas-link-calendario">
                    Ver calendario
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Reservas.propTypes = {
  agregarReserva: PropTypes.func.isRequired,
  mensaje: PropTypes.string,
  cerrarMensaje: PropTypes.func.isRequired
};

export default Reservas;