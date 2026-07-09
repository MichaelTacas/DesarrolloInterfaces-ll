import React, { useMemo, useState } from "react";

const mesas = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5", "Mesa 6"];

const filtrosIniciales = {
  mesa: "",
  cliente: "",
  fecha: "",
};

const tarjetasReporte = [
  {
    titulo: "Reservas por fecha",
    descripcion:
      "Permite revisar cuántas reservas existen por cada día de atención.",
  },
  {
    titulo: "Mesas ocupadas",
    descripcion: "Ayuda a identificar qué mesas tienen reservas registradas.",
  },
  {
    titulo: "Reservas por horario",
    descripcion:
      "Permite controlar los horarios con mayor demanda de reservas.",
  },
  {
    titulo: "Clientes registrados",
    descripcion:
      "Muestra los clientes que realizaron reservas en el sistema.",
  },
];

const agruparDatos = (lista, obtenerClave, crearItem, actualizarItem) => {
  return Object.values(
    lista.reduce((acumulador, reserva) => {
      const clave = obtenerClave(reserva);

      if (!acumulador[clave]) {
        acumulador[clave] = crearItem(reserva);
      }

      actualizarItem(acumulador[clave], reserva);

      return acumulador;
    }, {})
  );
};

const ListaReservas = ({ reservas = [], eliminarReserva }) => {
  const [filtros, setFiltros] = useState(filtrosIniciales);

  const actualizarFiltro = (e) => {
    const { name, value } = e.target;

    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  const limpiarFiltros = () => {
    setFiltros(filtrosIniciales);
  };

  const clientesUnicos = useMemo(() => {
    return Object.values(
      reservas.reduce((acumulador, reserva) => {
        const clave = reserva.telefono || reserva.nombre;

        if (!acumulador[clave]) {
          acumulador[clave] = {
            nombre: reserva.nombre,
            telefono: reserva.telefono,
          };
        }

        return acumulador;
      }, {})
    );
  }, [reservas]);

  const reservasFiltradas = useMemo(() => {
    return reservas.filter((reserva) => {
      const nombre = reserva.nombre || "";
      const telefono = reserva.telefono || "";

      const coincideMesa =
        filtros.mesa === "" || reserva.mesa === filtros.mesa;

      const coincideCliente =
        filtros.cliente === "" ||
        nombre.toLowerCase().includes(filtros.cliente.toLowerCase()) ||
        telefono.includes(filtros.cliente);

      const coincideFecha =
        filtros.fecha === "" || reserva.fecha === filtros.fecha;

      return coincideMesa && coincideCliente && coincideFecha;
    });
  }, [reservas, filtros]);

  const resumen = [
    {
      titulo: "Total de reservas",
      valor: reservasFiltradas.length,
      descripcion: "Reservas según los filtros aplicados",
    },
    {
      titulo: "Mesas usadas",
      valor: new Set(reservasFiltradas.map((reserva) => reserva.mesa)).size,
      descripcion: `De ${mesas.length} mesas del restaurante`,
    },
    {
      titulo: "Clientes",
      valor: new Set(reservasFiltradas.map((reserva) => reserva.telefono)).size,
      descripcion: "Clientes encontrados en el filtro",
    },
    {
      titulo: "Horarios",
      valor: new Set(reservasFiltradas.map((reserva) => reserva.hora)).size,
      descripcion: "Horarios usados en reservas",
    },
  ];

  const reservasPorFecha = agruparDatos(
    reservasFiltradas,
    (reserva) => reserva.fecha,
    (reserva) => ({
      fecha: reserva.fecha,
      total: 0,
      personas: 0,
    }),
    (item, reserva) => {
      item.total += 1;
      item.personas += Number(reserva.personas);
    }
  );

  const reporteMesas = mesas.map((mesa) => {
    const total = reservasFiltradas.filter(
      (reserva) => reserva.mesa === mesa
    ).length;

    return {
      mesa,
      total,
      estado: total > 0 ? "Con reservas" : "Sin reservas",
    };
  });

  const reservasPorHorario = agruparDatos(
    reservasFiltradas,
    (reserva) => reserva.hora,
    (reserva) => ({
      hora: reserva.hora,
      total: 0,
    }),
    (item) => {
      item.total += 1;
    }
  );

  const clientesConReservas = agruparDatos(
    reservasFiltradas,
    (reserva) => reserva.telefono,
    (reserva) => ({
      nombre: reserva.nombre,
      telefono: reserva.telefono,
      total: 0,
    }),
    (item) => {
      item.total += 1;
    }
  );

  const renderTablaReporte = (columnas, datos, obtenerFilas) => {
    if (datos.length === 0) {
      return <p className="reporte-vacio">Sin datos registrados.</p>;
    }

    return (
      <div className="table-responsive">
        <table className="table reporte-mini-tabla">
          <thead>
            <tr>
              {columnas.map((columna) => (
                <th key={columna}>{columna}</th>
              ))}
            </tr>
          </thead>

          <tbody>{datos.map(obtenerFilas)}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="lista-page">
      <section className="lista-hero">
        <div className="container">
          <span className="lista-etiqueta">Reportes administrativos</span>

          <h1>Panel de reportes</h1>

          <p>
            Revisa las reservas registradas, controla la disponibilidad de mesas
            y filtra la información por mesa, cliente o fecha.
          </p>
        </div>
      </section>

      <section className="lista-contenido">
        <div className="container">
          <div className="filtros-reportes-card">
            <div className="filtros-reportes-header">
              <div>
                <span>Filtros de búsqueda</span>
                <h2>Buscar reservas</h2>
              </div>

              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="filtroMesa" className="form-label">
                  Filtrar por mesa
                </label>

                <select
                  id="filtroMesa"
                  name="mesa"
                  className="form-select"
                  value={filtros.mesa}
                  onChange={actualizarFiltro}
                >
                  <option value="">Todas las mesas</option>

                  {mesas.map((mesa) => (
                    <option key={mesa} value={mesa}>
                      {mesa}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="filtroCliente" className="form-label">
                  Filtrar por cliente
                </label>

                <input
                  id="filtroCliente"
                  name="cliente"
                  type="text"
                  className="form-control"
                  placeholder="Nombre o teléfono"
                  value={filtros.cliente}
                  onChange={actualizarFiltro}
                  list="clientesReservas"
                />

                <datalist id="clientesReservas">
                  {clientesUnicos.map((cliente) => (
                    <option key={cliente.telefono} value={cliente.nombre}>
                      {cliente.telefono}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className="col-md-4">
                <label htmlFor="filtroFecha" className="form-label">
                  Filtrar por fecha
                </label>

                <input
                  id="filtroFecha"
                  name="fecha"
                  type="date"
                  className="form-control"
                  value={filtros.fecha}
                  onChange={actualizarFiltro}
                />
              </div>
            </div>

            <div className="filtros-resultados">
              <strong>Resultados encontrados:</strong>
              <span>{reservasFiltradas.length}</span>
            </div>
          </div>

          <div className="row g-4 mb-5">
            {resumen.map((item) => (
              <div className="col-md-3 col-sm-6" key={item.titulo}>
                <div className="lista-resumen-card">
                  <span>{item.titulo}</span>
                  <h3>{item.valor}</h3>
                  <p>{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lista-card-principal">
            <div className="lista-card-header">
              <div>
                <span>Gestión de reservas</span>
                <h2>Reservas registradas</h2>
              </div>
            </div>

            {reservasFiltradas.length === 0 ? (
              <div className="lista-vacia">
                <h3>No hay reservas encontradas</h3>

                <p>
                  No existen reservas que coincidan con los filtros
                  seleccionados. Puedes limpiar los filtros para ver todas las
                  reservas.
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
                      <th>Estado</th>
                      <th>Comentario</th>
                      <th>Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reservasFiltradas.map((reserva, index) => (
                      <tr key={reserva.id_reserva}>
                        <td>{index + 1}</td>
                        <td>{reserva.nombre}</td>
                        <td>{reserva.telefono}</td>
                        <td>{reserva.fecha}</td>
                        <td>{reserva.hora}</td>
                        <td>{reserva.mesa}</td>
                        <td>{reserva.personas}</td>
                        <td>{reserva.estado}</td>
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
              {tarjetasReporte.map((tarjeta) => (
                <div className="col-md-3 col-sm-6" key={tarjeta.titulo}>
                  <div className="reporte-card">
                    <h4>{tarjeta.titulo}</h4>
                    <p>{tarjeta.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reportes-detalle-grid">
              <div className="reporte-detalle-card">
                <h3>1. Reporte de reservas por fecha</h3>

                {renderTablaReporte(
                  ["Fecha", "Total reservas", "Total personas"],
                  reservasPorFecha,
                  (item) => (
                    <tr key={item.fecha}>
                      <td>{item.fecha}</td>
                      <td>{item.total}</td>
                      <td>{item.personas}</td>
                    </tr>
                  )
                )}
              </div>

              <div className="reporte-detalle-card">
                <h3>2. Reporte de mesas ocupadas</h3>

                {renderTablaReporte(
                  ["Mesa", "Reservas", "Estado"],
                  reporteMesas,
                  (item) => (
                    <tr key={item.mesa}>
                      <td>{item.mesa}</td>
                      <td>{item.total}</td>
                      <td>{item.estado}</td>
                    </tr>
                  )
                )}
              </div>

              <div className="reporte-detalle-card">
                <h3>3. Reporte de reservas por horario</h3>

                {renderTablaReporte(
                  ["Hora", "Total reservas"],
                  reservasPorHorario,
                  (item) => (
                    <tr key={item.hora}>
                      <td>{item.hora}</td>
                      <td>{item.total}</td>
                    </tr>
                  )
                )}
              </div>

              <div className="reporte-detalle-card">
                <h3>4. Reporte de clientes registrados</h3>

                {renderTablaReporte(
                  ["Cliente", "Teléfono", "Reservas"],
                  clientesConReservas,
                  (item) => (
                    <tr key={item.telefono}>
                      <td>{item.nombre}</td>
                      <td>{item.telefono}</td>
                      <td>{item.total}</td>
                    </tr>
                  )
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