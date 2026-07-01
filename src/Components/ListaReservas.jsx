import React from "react";
import { Link } from "react-router-dom";

const ListaReservas = ({ reservas = [], eliminarReserva }) => {
  const totalReservas = reservas.length;
  const totalMesasSistema = 6;

  const mesasRegistradas = new Set(reservas.map((reserva) => reserva.mesa))
    .size;

  const clientesRegistrados = new Set(
    reservas.map((reserva) => reserva.telefono)
  ).size;

  const horariosRegistrados = new Set(
    reservas.map((reserva) => reserva.hora)
  ).size;

  const mesas = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5", "Mesa 6"];

  const reservasPorFecha = Object.values(
    reservas.reduce((acumulador, reserva) => {
      const fecha = reserva.fecha;

      if (!acumulador[fecha]) {
        acumulador[fecha] = {
          fecha,
          total: 0,
          personas: 0,
        };
      }

      acumulador[fecha].total += 1;
      acumulador[fecha].personas += Number(reserva.personas);

      return acumulador;
    }, {})
  );

  const reporteMesas = mesas.map((mesa) => {
    const reservasMesa = reservas.filter((reserva) => reserva.mesa === mesa);

    return {
      mesa,
      total: reservasMesa.length,
      estado: reservasMesa.length > 0 ? "Con reservas" : "Sin reservas",
    };
  });

  const reservasPorHorario = Object.values(
    reservas.reduce((acumulador, reserva) => {
      const hora = reserva.hora;

      if (!acumulador[hora]) {
        acumulador[hora] = {
          hora,
          total: 0,
        };
      }

      acumulador[hora].total += 1;

      return acumulador;
    }, {})
  );

  const clientesConReservas = Object.values(
    reservas.reduce((acumulador, reserva) => {
      const telefono = reserva.telefono;

      if (!acumulador[telefono]) {
        acumulador[telefono] = {
          nombre: reserva.nombre,
          telefono: reserva.telefono,
          total: 0,
        };
      }

      acumulador[telefono].total += 1;

      return acumulador;
    }, {})
  );

  return (
    <div className="lista-page">
      <section className="lista-hero">
        <div className="container">
          <span className="lista-etiqueta">Reportes administrativos</span>

          <h1>Panel de reportes</h1>

          <p>
            Revisa las reservas registradas, controla la disponibilidad de mesas
            y analiza la información más importante del restaurante.
          </p>

          <div className="lista-botones">
            <Link to="/calendario" className="btn btn-outline-light">
              Ver panel
            </Link>
          </div>
        </div>
      </section>

      <section className="lista-contenido">
        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-md-3 col-sm-6">
              <div className="lista-resumen-card">
                <span>Total de reservas</span>
                <h3>{totalReservas}</h3>
                <p>Reservas activas registradas</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="lista-resumen-card">
                <span>Mesas usadas</span>
                <h3>{mesasRegistradas}</h3>
                <p>De {totalMesasSistema} mesas del restaurante</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="lista-resumen-card">
                <span>Clientes</span>
                <h3>{clientesRegistrados}</h3>
                <p>Clientes con reservas registradas</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="lista-resumen-card">
                <span>Horarios</span>
                <h3>{horariosRegistrados}</h3>
                <p>Horarios usados en reservas</p>
              </div>
            </div>
          </div>

          <div className="lista-card-principal">
            <div className="lista-card-header">
              <div>
                <span>Gestión de reservas</span>
                <h2>Reservas registradas</h2>
              </div>
            </div>

            {reservas.length === 0 ? (
              <div className="lista-vacia">
                <h3>No hay reservas registradas</h3>

                <p>
                  Cuando un cliente registre una reserva, aparecerá en esta
                  sección con los datos del cliente, fecha, hora y mesa
                  seleccionada.
                </p>
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
                      <th>Comentario</th>
                      <th>Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reservas.map((reserva, index) => (
                      <tr key={reserva.id_reserva || index}>
                        <td>{index + 1}</td>
                        <td>{reserva.nombre}</td>
                        <td>{reserva.telefono}</td>
                        <td>{reserva.fecha}</td>
                        <td>{reserva.hora}</td>
                        <td>{reserva.mesa}</td>
                        <td>{reserva.personas}</td>
                        <td>{reserva.comentario || "Sin comentario"}</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => eliminarReserva(reserva.id_reserva)}
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

            <div className="row g-4 mb-5">
              <div className="col-md-3 col-sm-6">
                <div className="reporte-card">
                  <h4>Reservas por fecha</h4>
                  <p>
                    Permite revisar cuántas reservas existen por cada día de
                    atención.
                  </p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="reporte-card">
                  <h4>Mesas ocupadas</h4>
                  <p>
                    Ayuda a identificar qué mesas tienen reservas registradas.
                  </p>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="reporte-card">
                  <h4>Reservas por horario</h4>
                  <p>
                    Permite controlar los horarios con mayor demanda de
                    reservas.
                  </p>
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

            <div className="reportes-detalle-grid">
              <div className="reporte-detalle-card">
                <h3>1. Reporte de reservas por fecha</h3>

                {reservasPorFecha.length === 0 ? (
                  <p className="reporte-vacio">Sin datos registrados.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table reporte-mini-tabla">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Total reservas</th>
                          <th>Total personas</th>
                        </tr>
                      </thead>

                      <tbody>
                        {reservasPorFecha.map((item) => (
                          <tr key={item.fecha}>
                            <td>{item.fecha}</td>
                            <td>{item.total}</td>
                            <td>{item.personas}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="reporte-detalle-card">
                <h3>2. Reporte de mesas ocupadas</h3>

                <div className="table-responsive">
                  <table className="table reporte-mini-tabla">
                    <thead>
                      <tr>
                        <th>Mesa</th>
                        <th>Reservas</th>
                        <th>Estado</th>
                      </tr>
                    </thead>

                    <tbody>
                      {reporteMesas.map((item) => (
                        <tr key={item.mesa}>
                          <td>{item.mesa}</td>
                          <td>{item.total}</td>
                          <td>{item.estado}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="reporte-detalle-card">
                <h3>3. Reporte de reservas por horario</h3>

                {reservasPorHorario.length === 0 ? (
                  <p className="reporte-vacio">Sin datos registrados.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table reporte-mini-tabla">
                      <thead>
                        <tr>
                          <th>Hora</th>
                          <th>Total reservas</th>
                        </tr>
                      </thead>

                      <tbody>
                        {reservasPorHorario.map((item) => (
                          <tr key={item.hora}>
                            <td>{item.hora}</td>
                            <td>{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="reporte-detalle-card">
                <h3>4. Reporte de clientes registrados</h3>

                {clientesConReservas.length === 0 ? (
                  <p className="reporte-vacio">Sin datos registrados.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table reporte-mini-tabla">
                      <thead>
                        <tr>
                          <th>Cliente</th>
                          <th>Teléfono</th>
                          <th>Reservas</th>
                        </tr>
                      </thead>

                      <tbody>
                        {clientesConReservas.map((item) => (
                          <tr key={item.telefono}>
                            <td>{item.nombre}</td>
                            <td>{item.telefono}</td>
                            <td>{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListaReservas;