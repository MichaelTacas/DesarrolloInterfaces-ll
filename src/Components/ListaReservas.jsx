import React from "react";
import { Link } from "react-router-dom";

const ListaReservas = ({ reservas = [], eliminarReserva }) => {
  const totalReservas = reservas.length;
  const mesasRegistradas = new Set(reservas.map((reserva) => reserva.mesa))
    .size;
  const clientesRegistrados = new Set(
    reservas.map((reserva) => reserva.telefono),
  ).size;

  return (
    <div className="lista-page">
      <section className="lista-hero">
        <div className="container">
          <span className="lista-etiqueta">Gestión administrativa</span>

          <h1>Lista de reservas</h1>

          <p>
            Revisa las reservas registradas, administra los datos del cliente y
            controla la disponibilidad de mesas del restaurante.
          </p>

          <div className="lista-botones">
            <Link to="/reservas" className="btn btn-warning">
              Registrar reserva
            </Link>

            <Link to="/calendario" className="btn btn-outline-light">
              Ver calendario
            </Link>
          </div>
        </div>
      </section>

      <section className="lista-contenido">
        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="lista-resumen-card">
                <span>Total de reservas</span>
                <h3>{totalReservas}</h3>
                <p>Reservas registradas en el sistema</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="lista-resumen-card">
                <span>Mesas registradas</span>
                <h3>{mesasRegistradas}</h3>
                <p>Mesas usadas en las reservas</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="lista-resumen-card">
                <span>Clientes registrados</span>
                <h3>{clientesRegistrados}</h3>
                <p>Clientes con reservas realizadas</p>
              </div>
            </div>
          </div>

          <div className="lista-card-principal">
            <div className="lista-card-header">
              <div>
                <span>Panel del administrador</span>
                <h2>Reservas registradas</h2>
              </div>

              <Link to="/reservas" className="btn btn-danger">
                Nueva reserva
              </Link>
            </div>

            {reservas.length === 0 ? (
              <div className="lista-vacia">
                <h3>No hay reservas registradas</h3>

                <p>
                  Cuando registres una reserva, aparecerá en esta sección con
                  los datos del cliente, fecha, hora y mesa seleccionada.
                </p>

                <Link to="/reservas" className="btn btn-warning">
                  Registrar primera reserva
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table lista-tabla">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Cliente</th>
                      <th>Teléfono</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Mesa</th>
                      <th>Personas</th>
                      <th>Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reservas.map((reserva, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{reserva.nombre}</td>
                        <td>{reserva.telefono}</td>
                        <td>{reserva.fecha}</td>
                        <td>{reserva.hora}</td>
                        <td>{reserva.mesa}</td>
                        <td>{reserva.personas}</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => eliminarReserva(index)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="lista-reportes">
            <h2>Reportes administrativos</h2>

            <div className="row g-4">
              <div className="col-md-3 col-sm-6">
                <div className="reporte-card">
                  <h4>Reservas por fecha</h4>
                  <p>
                    Permite revisar las reservas registradas según el día
                    seleccionado.
                  </p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="reporte-card">
                  <h4>Mesas ocupadas</h4>
                  <p>Ayuda a identificar qué mesas ya fueron reservadas.</p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="reporte-card">
                  <h4>Reservas por horario</h4>
                  <p>Permite controlar los horarios de mayor demanda.</p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="reporte-card">
                  <h4>Clientes registrados</h4>
                  <p>
                    Muestra los clientes que realizaron reservas en el sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListaReservas;
