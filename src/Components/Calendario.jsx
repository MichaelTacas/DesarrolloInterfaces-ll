import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const mesas = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5", "Mesa 6"];

const Calendario = ({ reservas = [] }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const esAdministrador = usuarioActivo?.rol === "Administrador";
  const esCliente = usuarioActivo && !esAdministrador;

  const reservasDelDia = useMemo(() => {
    return reservas.filter((reserva) => reserva.fecha === fechaSeleccionada);
  }, [reservas, fechaSeleccionada]);

  const reservasDelCliente = useMemo(() => {
    if (!usuarioActivo || esAdministrador) {
      return [];
    }

    return reservas.filter(
      (reserva) =>
        String(reserva.id_usuario) === String(usuarioActivo.id_usuario) ||
        String(reserva.telefono) === String(usuarioActivo.telefono)
    );
  }, [reservas, usuarioActivo, esAdministrador]);

  const mesasOcupadas = new Set(
    reservasDelDia.map((reserva) => reserva.mesa)
  );

  const mesasDisponibles =
    fechaSeleccionada === ""
      ? mesas
      : mesas.filter((mesa) => !mesasOcupadas.has(mesa));

  const textoBotonReserva = usuarioActivo
    ? "Reservar mesa"
    : "Iniciar sesión para reservar";

  const renderMesa = (mesa) => {
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

          {fechaSeleccionada && estaOcupada && (
            <p>Esta mesa ya tiene una reserva registrada en la fecha elegida.</p>
          )}
        </div>
      </div>
    );
  };

  const renderMisReservas = () => {
    if (!esCliente) {
      return null;
    }

    return (
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
    );
  };

  if (esAdministrador) {
    return (
      <div className="calendario-page">
        <section className="calendario-hero">
          <div className="container">
            <span className="calendario-etiqueta">Área administrativa</span>

            <h1>Calendario disponible para clientes</h1>

            <p>
              Como administrador, puedes revisar las reservas desde Reportes o
              modificarlas desde Gestión.
            </p>

            <div className="calendario-acciones">
              <Link to="/lista-reservas" className="btn btn-warning">
                Ir a Reportes
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="calendario-page">
      <section className="calendario-hero">
        <div className="container">
          <span className="calendario-etiqueta">Disponibilidad</span>

          <h1>Consulta las mesas disponibles</h1>

          <p>
            Selecciona una fecha para ver qué mesas están disponibles. Para
            realizar una reserva, inicia sesión o crea una cuenta.
          </p>

          <div className="calendario-acciones">
            <Link
              to={usuarioActivo ? "/reservas" : "/login"}
              className="btn btn-warning"
            >
              {textoBotonReserva}
            </Link>
          </div>
        </div>
      </section>

      <section className="calendario-contenido">
        <div className="container">
          <div className="calendario-panel-fecha">
            <span>Mesas disponibles</span>

            <h2>Selecciona una fecha para consultar</h2>

            <input
              type="date"
              className="form-control calendario-input-fecha"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
            />
          </div>

          <div className="row g-4">{mesas.map(renderMesa)}</div>

          {fechaSeleccionada && mesasDisponibles.length === 0 && (
            <div className="reservas-dia-card">
              <div className="reservas-dia-vacio">
                No hay mesas disponibles para esta fecha.
              </div>
            </div>
          )}

          {renderMisReservas()}
        </div>
      </section>
    </div>
  );
};

export default Calendario;