import React, { useState } from "react";
import { Link } from "react-router-dom";

const Calendario = ({ reservas = [] }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  const mesas = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5", "Mesa 6"];

  const estiloBotonAmarillo = {
    backgroundColor: "#ffd166",
    borderColor: "#ffd166",
    color: "#8b1e1e",
    fontWeight: 700,
  };

  const reservasDelDia = reservas.filter(
    (reserva) => reserva.fecha === fechaSeleccionada,
  );

  const mesasOcupadas = new Set(reservasDelDia.map((reserva) => reserva.mesa));

  const totalMesas = mesas.length;
  const totalOcupadas = fechaSeleccionada ? mesasOcupadas.size : 0;
  const totalDisponibles = fechaSeleccionada
    ? totalMesas - totalOcupadas
    : totalMesas;

  const obtenerReservasPorMesa = (mesa) => {
    return reservasDelDia.filter((reserva) => reserva.mesa === mesa);
  };

  return (
    <div className="calendario-page">
      <section className="calendario-hero">
        <div className="container">
          <span className="calendario-etiqueta">Panel administrativo</span>

          <h1>Panel de administración de reservas</h1>

          <p>
            Consulta la disponibilidad de mesas, revisa las reservas del día y
            controla la ocupación del restaurante.
          </p>

          <div className="calendario-acciones">
            <Link to="/reservas" className="btn" style={estiloBotonAmarillo}>
              Registrar reserva
            </Link>

            <Link to="/lista-reservas" className="btn btn-outline-light">
              Ver lista de reservas
            </Link>
          </div>
        </div>
      </section>

      <section className="calendario-contenido">
        <div className="container">
          <div className="calendario-panel-fecha">
            <span>Estado de mesas</span>
            <h2>Selecciona una fecha para consultar</h2>

            <input
              type="date"
              className="form-control calendario-input-fecha"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
            />
          </div>

          <div className="row g-4 dashboard-resumen">
            <div className="col-md-3 col-sm-6">
              <div className="dashboard-card">
                <span>Total de mesas</span>
                <h3>{totalMesas}</h3>
                <p>Mesas registradas en el sistema</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="dashboard-card ocupadas">
                <span>Mesas ocupadas</span>
                <h3>{totalOcupadas}</h3>
                <p>Mesas reservadas en la fecha seleccionada</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="dashboard-card disponibles">
                <span>Mesas disponibles</span>
                <h3>{totalDisponibles}</h3>
                <p>Mesas libres para nuevas reservas</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="dashboard-card reservas">
                <span>Reservas del día</span>
                <h3>{reservasDelDia.length}</h3>
                <p>Total de reservas registradas</p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {mesas.map((mesa, index) => {
              const reservasMesa = obtenerReservasPorMesa(mesa);
              const estaOcupada = fechaSeleccionada && mesasOcupadas.has(mesa);

              return (
                <div className="col-md-6 col-lg-4" key={index}>
                  <div
                    className={
                      estaOcupada
                        ? "mesa-card mesa-ocupada"
                        : "mesa-card mesa-disponible"
                    }
                  >
                    <div className="mesa-card-header">
                      <h4>{mesa}</h4>

                      <span>
                        {!fechaSeleccionada
                          ? "Sin consulta"
                          : estaOcupada
                            ? "Ocupada"
                            : "Disponible"}
                      </span>
                    </div>

                    {!fechaSeleccionada && (
                      <p>Selecciona una fecha para ver la disponibilidad.</p>
                    )}

                    {fechaSeleccionada && !estaOcupada && (
                      <p>Esta mesa está disponible para reservar.</p>
                    )}

                    {fechaSeleccionada && estaOcupada && (
                      <div className="mesa-reservas">
                        {reservasMesa.map((reserva, i) => (
                          <div className="mesa-reserva-item" key={i}>
                            <strong>{reserva.hora}</strong>
                            <p>{reserva.nombre}</p>
                            <small>{reserva.personas} persona(s)</small>

                            {reserva.comentario && (
                              <div className="comentario-reserva">
                                <span>Comentario:</span>
                                <p>{reserva.comentario}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="reservas-dia-card">
            <h2>Reservas del día</h2>

            {!fechaSeleccionada ? (
              <div className="reservas-dia-vacio">
                Selecciona una fecha para ver las reservas registradas.
              </div>
            ) : reservasDelDia.length === 0 ? (
              <div className="reservas-dia-vacio">
                No hay reservas registradas para esta fecha.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table reservas-tabla">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Teléfono</th>
                      <th>Hora</th>
                      <th>Mesa</th>
                      <th>Personas</th>
                      <th>Comentario</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reservasDelDia.map((reserva, index) => (
                      <tr key={index}>
                        <td>{reserva.nombre}</td>
                        <td>{reserva.telefono}</td>
                        <td>{reserva.hora}</td>
                        <td>{reserva.mesa}</td>
                        <td>{reserva.personas}</td>
                        <td>{reserva.comentario || "Sin comentario"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendario;
