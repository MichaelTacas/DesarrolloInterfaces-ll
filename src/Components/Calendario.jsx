import React, { useState } from "react";
import { Link } from "react-router-dom";

const Calendario = ({ reservas = [] }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const esAdministrador = usuarioActivo?.rol === "Administrador";
  const esCliente = usuarioActivo && !esAdministrador;

  const mesas = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5", "Mesa 6"];

  const reservasDelDia = reservas.filter(
    (reserva) => reserva.fecha === fechaSeleccionada,
  );

  const reservasDelCliente = reservas.filter((reserva) => {
    if (!usuarioActivo) {
      return false;
    }

    return (
      String(reserva.id_usuario) === String(usuarioActivo.id_usuario) ||
      String(reserva.telefono) === String(usuarioActivo.telefono)
    );
  });

  const reservasClienteDelDia = reservasDelCliente.filter(
    (reserva) => reserva.fecha === fechaSeleccionada,
  );

  const mesasOcupadas = new Set(reservasDelDia.map((reserva) => reserva.mesa));

  const totalMesas = mesas.length;
  const totalOcupadas = fechaSeleccionada ? mesasOcupadas.size : 0;
  const totalDisponibles = fechaSeleccionada
    ? totalMesas - totalOcupadas
    : totalMesas;

  const mesasParaMostrar =
    !fechaSeleccionada || esAdministrador
      ? mesas
      : mesas.filter((mesa) => !mesasOcupadas.has(mesa));

  const obtenerReservasPorMesa = (mesa) => {
    return reservasDelDia.filter((reserva) => reserva.mesa === mesa);
  };

  const textoBotonReserva = () => {
    if (esAdministrador) {
      return "Registrar reserva";
    }

    if (usuarioActivo) {
      return "Reservar mesa";
    }

    return "Iniciar sesión para reservar";
  };

  return (
    <div className="calendario-page">
      <section className="calendario-hero">
        <div className="container">
          <span className="calendario-etiqueta">
            {esAdministrador ? "Panel administrativo" : "Disponibilidad"}
          </span>

          <h1>
            {esAdministrador
              ? "Panel de administración de reservas"
              : "Consulta las mesas disponibles"}
          </h1>

          <p>
            {esAdministrador
              ? "Controla la disponibilidad de mesas, revisa las reservas del día y gestiona la ocupación del restaurante."
              : "Selecciona una fecha para ver qué mesas están disponibles. Para realizar una reserva, inicia sesión o crea una cuenta."}
          </p>

          <div className="calendario-acciones">
            {!esAdministrador && (
              <Link
                to={usuarioActivo ? "/reservas" : "/login"}
                className="btn btn-warning"
              >
                {textoBotonReserva()}
              </Link>
            )}

            {esAdministrador && (
              <Link to="/lista-reservas" className="btn btn-warning">
                Ver reportes
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="calendario-contenido">
        <div className="container">
          <div className="calendario-panel-fecha">
            <span>
              {esAdministrador ? "Estado de mesas" : "Mesas disponibles"}
            </span>

            <h2>Selecciona una fecha para consultar</h2>

            <input
              type="date"
              className="form-control calendario-input-fecha"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
            />
          </div>

          {esAdministrador && (
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
          )}

          <div className="row g-4">
            {mesasParaMostrar.map((mesa) => {
              const reservasMesa = obtenerReservasPorMesa(mesa);
              const estaOcupada = fechaSeleccionada && mesasOcupadas.has(mesa);

              return (
                <div className="col-md-6 col-lg-4" key={mesa}>
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

                    {esAdministrador && fechaSeleccionada && estaOcupada && (
                      <div className="mesa-reservas">
                        {reservasMesa.map((reserva) => (
                          <div
                            className="mesa-reserva-item"
                            key={
                              reserva.id_reserva ||
                              `${reserva.mesa}-${reserva.hora}`
                            }
                          >
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

          {!esAdministrador &&
            fechaSeleccionada &&
            mesasParaMostrar.length === 0 && (
              <div className="reservas-dia-card">
                <div className="reservas-dia-vacio">
                  No hay mesas disponibles para esta fecha.
                </div>
              </div>
            )}

          {esCliente && (
            <div className="mis-reservas-cliente">
              <div className="mis-reservas-header">
                <span>Mis reservas</span>
                <h2>Mis reservas registradas</h2>
              </div>

              {reservasDelCliente.length === 0 ? (
                <div className="mis-reservas-vacio">
                  Todavía no tienes reservas registradas.
                </div>
              ) : (
                <div className="row g-4">
                  {reservasDelCliente.map((reserva) => (
                    <div
                      className="col-md-6"
                      key={reserva.id_reserva || reserva.hora}
                    >
                      <div className="mi-reserva-card">
                        <div className="mi-reserva-card-header">
                          <h4>Tienes una reserva</h4>
                          <span>{reserva.fecha}</span>
                        </div>

                        <div className="mi-reserva-detalle">
                          <p>
                            <strong>Mesa:</strong> {reserva.mesa}
                          </p>

                          <p>
                            <strong>Hora:</strong> {reserva.hora}
                          </p>

                          <p>
                            <strong>Personas:</strong> {reserva.personas}
                          </p>

                          <p>
                            <strong>Cliente:</strong> {reserva.nombre}
                          </p>

                          {reserva.comentario && (
                            <p>
                              <strong>Comentario:</strong> {reserva.comentario}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {esAdministrador && (
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
                      {reservasDelDia.map((reserva) => (
                        <tr key={reserva.id_reserva}>
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Calendario;
