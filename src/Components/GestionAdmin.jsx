import React, { useState } from "react";

const GestionAdmin = ({ reservas = [], actualizarReserva }) => {
  const [opcionActiva, setOpcionActiva] = useState("");
  const [idReservaSeleccionada, setIdReservaSeleccionada] = useState("");
  const [reservaEditada, setReservaEditada] = useState(null);
  const [mensajeGestion, setMensajeGestion] = useState("");

  const opcionesGestion = [
    {
      id: "mesas",
      titulo: "Gestión de mesas",
      descripcion:
        "Administra las mesas del restaurante, su capacidad, ubicación y estado de disponibilidad.",
      elementos: [
        "Nombre de la mesa",
        "Capacidad de personas",
        "Estado de disponibilidad",
        "Ubicación dentro del restaurante",
      ],
    },
    {
      id: "platos",
      titulo: "Gestión de platos",
      descripcion:
        "Actualiza la información de los platos que se muestran en la carta digital del restaurante.",
      elementos: [
        "Nombre del plato",
        "Precio",
        "Descripción",
        "Categoría",
        "Estado del plato",
      ],
    },
    {
      id: "horarios",
      titulo: "Gestión de horarios",
      descripcion:
        "Configura los días de atención y los horarios disponibles para realizar reservas.",
      elementos: [
        "Día de atención",
        "Hora de apertura",
        "Hora de cierre",
        "Estado del día",
      ],
    },
    {
      id: "reservas",
      titulo: "Gestión de reservas",
      descripcion:
        "Modifica los datos principales de las reservas realizadas por los clientes.",
      elementos: [
        "Cliente",
        "Teléfono",
        "Fecha de reserva",
        "Hora",
        "Mesa asignada",
        "Cantidad de personas",
        "Comentario",
        "Estado de la reserva",
      ],
    },
  ];

  const validarNumeroNoNegativo = (valor, mensaje) => {
    if (Number(valor) < 0) {
      alert(mensaje);
      return false;
    }

    return true;
  };

  const validarNumeroMayorACero = (valor, mensaje) => {
    if (Number(valor) <= 0) {
      alert(mensaje);
      return false;
    }

    return true;
  };

  const guardarFormularioSimple = (e) => {
    e.preventDefault();

    const datos = new FormData(e.target);

    if (opcionActiva === "mesas") {
      const capacidad = datos.get("capacidadMesa");

      if (
        !validarNumeroNoNegativo(
          capacidad,
          "La capacidad de la mesa no puede ser negativa."
        )
      ) {
        return;
      }
    }

    if (opcionActiva === "platos") {
      const precio = datos.get("precioPlato");

      if (
        !validarNumeroNoNegativo(
          precio,
          "El precio del plato no puede ser negativo."
        )
      ) {
        return;
      }
    }

    if (opcionActiva === "horarios") {
      const horaApertura = datos.get("horaApertura");
      const horaCierre = datos.get("horaCierre");
      const estadoDia = datos.get("estadoDia");

      if (estadoDia === "Abierto" && horaCierre <= horaApertura) {
        alert("La hora de cierre debe ser mayor que la hora de apertura.");
        return;
      }
    }

    alert("Información validada correctamente.");
    e.target.reset();
  };

  const seleccionarReserva = (idReserva) => {
    setMensajeGestion("");
    setIdReservaSeleccionada(idReserva);

    if (!idReserva) {
      setReservaEditada(null);
      return;
    }

    const reservaEncontrada = reservas.find(
      (reserva) => String(reserva.id_reserva) === String(idReserva)
    );

    if (!reservaEncontrada) {
      setReservaEditada(null);
      setMensajeGestion("No se encontró la reserva seleccionada.");
      return;
    }

    setReservaEditada({
      nombre: reservaEncontrada.nombre || "",
      telefono: reservaEncontrada.telefono || "",
      fecha: reservaEncontrada.fecha || "",
      hora: reservaEncontrada.hora || "",
      personas: reservaEncontrada.personas || 1,
      mesa: reservaEncontrada.mesa || "",
      comentario: reservaEncontrada.comentario || "",
      estado: reservaEncontrada.estado || "Activa",
    });
  };

  const manejarCambioReserva = (e) => {
    const { name, value } = e.target;

    setReservaEditada({
      ...reservaEditada,
      [name]: value,
    });
  };

  const guardarCambiosReserva = async (e) => {
    e.preventDefault();

    if (!idReservaSeleccionada || !reservaEditada) {
      setMensajeGestion("Primero selecciona una reserva para editar.");
      return;
    }

    if (!validarNumeroMayorACero(reservaEditada.personas, "La cantidad de personas debe ser mayor a 0.")) {
      return;
    }

    if (typeof actualizarReserva !== "function") {
      setMensajeGestion(
        "Falta conectar la función actualizarReserva desde App.js."
      );
      return;
    }

    const reservaParaActualizar = {
      nombre: reservaEditada.nombre,
      telefono: reservaEditada.telefono,
      fecha: reservaEditada.fecha,
      hora: reservaEditada.hora,
      personas: reservaEditada.personas,
      mesa: reservaEditada.mesa,
      comentario: reservaEditada.comentario,
      estado: reservaEditada.estado,
    };

    const actualizado = await actualizarReserva(
      idReservaSeleccionada,
      reservaParaActualizar
    );

    if (actualizado) {
      setMensajeGestion("Reserva actualizada correctamente.");
    } else {
      setMensajeGestion("No se pudo actualizar la reserva.");
    }
  };

  const abrirFormulario = (idOpcion) => {
    setOpcionActiva(idOpcion);
    setMensajeGestion("");

    if (idOpcion !== "reservas") {
      setIdReservaSeleccionada("");
      setReservaEditada(null);
    }
  };

  const mostrarFormulario = () => {
    if (opcionActiva === "mesas") {
      return (
        <form onSubmit={guardarFormularioSimple} className="gestion-formulario">
          <h3>Gestión de mesas</h3>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="nombreMesa">
                Nombre de la mesa
              </label>

              <input
                id="nombreMesa"
                name="nombreMesa"
                type="text"
                className="form-control"
                placeholder="Ej: Mesa 1"
                minLength="3"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="capacidadMesa">
                Capacidad de personas
              </label>

              <input
                id="capacidadMesa"
                name="capacidadMesa"
                type="number"
                className="form-control"
                placeholder="Ej: 4"
                min="0"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="estadoMesa">
                Estado
              </label>

              <select
                id="estadoMesa"
                name="estadoMesa"
                className="form-select"
                required
              >
                <option value="">Seleccionar estado</option>
                <option value="Disponible">Disponible</option>
                <option value="No disponible">No disponible</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="ubicacionMesa">
                Ubicación
              </label>

              <input
                id="ubicacionMesa"
                name="ubicacionMesa"
                type="text"
                className="form-control"
                placeholder="Ej: Interior, terraza, ventana"
                minLength="3"
                required
              />
            </div>
          </div>

          <button className="btn btn-danger gestion-form-btn" type="submit">
            Guardar mesa
          </button>
        </form>
      );
    }

    if (opcionActiva === "platos") {
      return (
        <form onSubmit={guardarFormularioSimple} className="gestion-formulario">
          <h3>Gestión de platos</h3>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="nombrePlato">
                Nombre del plato
              </label>

              <input
                id="nombrePlato"
                name="nombrePlato"
                type="text"
                className="form-control"
                placeholder="Ej: Ceviche clásico"
                minLength="3"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="precioPlato">
                Precio
              </label>

              <input
                id="precioPlato"
                name="precioPlato"
                type="number"
                className="form-control"
                placeholder="Ej: 28"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="categoriaPlato">
                Categoría
              </label>

              <select
                id="categoriaPlato"
                name="categoriaPlato"
                className="form-select"
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="Entrada">Entrada</option>
                <option value="Fondo">Fondo</option>
                <option value="Bebida">Bebida</option>
                <option value="Postre">Postre</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="estadoPlato">
                Estado
              </label>

              <select
                id="estadoPlato"
                name="estadoPlato"
                className="form-select"
                required
              >
                <option value="">Seleccionar estado</option>
                <option value="Disponible">Disponible</option>
                <option value="No disponible">No disponible</option>
              </select>
            </div>

            <div className="col-12 mb-3">
              <label className="form-label" htmlFor="descripcionPlato">
                Descripción
              </label>

              <textarea
                id="descripcionPlato"
                name="descripcionPlato"
                className="form-control"
                rows="3"
                placeholder="Descripción del plato"
                minLength="5"
                required
              ></textarea>
            </div>
          </div>

          <button className="btn btn-danger gestion-form-btn" type="submit">
            Guardar plato
          </button>
        </form>
      );
    }

    if (opcionActiva === "horarios") {
      return (
        <form onSubmit={guardarFormularioSimple} className="gestion-formulario">
          <h3>Gestión de horarios</h3>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="diaAtencion">
                Día de atención
              </label>

              <select
                id="diaAtencion"
                name="diaAtencion"
                className="form-select"
                required
              >
                <option value="">Seleccionar día</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label" htmlFor="horaApertura">
                Hora de apertura
              </label>

              <input
                id="horaApertura"
                name="horaApertura"
                type="time"
                className="form-control"
                required
              />
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label" htmlFor="horaCierre">
                Hora de cierre
              </label>

              <input
                id="horaCierre"
                name="horaCierre"
                type="time"
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="estadoDia">
                Estado del día
              </label>

              <select
                id="estadoDia"
                name="estadoDia"
                className="form-select"
                required
              >
                <option value="">Seleccionar estado</option>
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="motivoDia">
                Motivo opcional
              </label>

              <input
                id="motivoDia"
                name="motivoDia"
                type="text"
                className="form-control"
                placeholder="Ej: Feriado, mantenimiento, evento privado"
              />
            </div>
          </div>

          <button className="btn btn-danger gestion-form-btn" type="submit">
            Guardar horario
          </button>
        </form>
      );
    }

    if (opcionActiva === "reservas") {
      return (
        <div className="gestion-formulario">
          <h3>Gestión de reservas</h3>

          <div className="mb-4">
            <label className="form-label" htmlFor="seleccionarReserva">
              Seleccionar reserva del cliente
            </label>

            <select
              id="seleccionarReserva"
              className="form-select"
              value={idReservaSeleccionada}
              onChange={(e) => seleccionarReserva(e.target.value)}
            >
              <option value="">Seleccionar reserva</option>

              {reservas.map((reserva) => (
                <option key={reserva.id_reserva} value={reserva.id_reserva}>
                  #{reserva.id_reserva} - {reserva.nombre} | {reserva.fecha} |{" "}
                  {reserva.hora} | {reserva.mesa} | {reserva.estado}
                </option>
              ))}
            </select>
          </div>

          {reservas.length === 0 && (
            <div className="alert alert-warning">
              No hay reservas registradas para editar.
            </div>
          )}

          {reservaEditada && (
            <form onSubmit={guardarCambiosReserva}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="nombre">
                    Cliente
                  </label>

                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="form-control"
                    value={reservaEditada.nombre}
                    onChange={manejarCambioReserva}
                    minLength="3"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="telefono">
                    Teléfono
                  </label>

                  <input
                    id="telefono"
                    name="telefono"
                    type="text"
                    className="form-control"
                    value={reservaEditada.telefono}
                    onChange={manejarCambioReserva}
                    minLength="9"
                    maxLength="15"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="fecha">
                    Fecha de reserva
                  </label>

                  <input
                    id="fecha"
                    name="fecha"
                    type="date"
                    className="form-control"
                    value={reservaEditada.fecha}
                    onChange={manejarCambioReserva}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="hora">
                    Hora
                  </label>

                  <input
                    id="hora"
                    name="hora"
                    type="time"
                    className="form-control"
                    value={reservaEditada.hora}
                    onChange={manejarCambioReserva}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label" htmlFor="mesa">
                    Mesa asignada
                  </label>

                  <select
                    id="mesa"
                    name="mesa"
                    className="form-select"
                    value={reservaEditada.mesa}
                    onChange={manejarCambioReserva}
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

                <div className="col-md-4 mb-3">
                  <label className="form-label" htmlFor="personas">
                    Personas
                  </label>

                  <input
                    id="personas"
                    name="personas"
                    type="number"
                    className="form-control"
                    value={reservaEditada.personas}
                    onChange={manejarCambioReserva}
                    min="1"
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label" htmlFor="estado">
                    Estado
                  </label>

                  <select
                    id="estado"
                    name="estado"
                    className="form-select"
                    value={reservaEditada.estado}
                    onChange={manejarCambioReserva}
                    required
                  >
                    <option value="Activa">Activa</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Atendida">Atendida</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label" htmlFor="comentario">
                    Comentario
                  </label>

                  <textarea
                    id="comentario"
                    name="comentario"
                    className="form-control"
                    rows="3"
                    value={reservaEditada.comentario}
                    onChange={manejarCambioReserva}
                    placeholder="Ej: Mesa cerca a la ventana"
                  ></textarea>
                </div>
              </div>

              <button className="btn btn-danger gestion-form-btn" type="submit">
                Guardar cambios de reserva
              </button>
            </form>
          )}

          {mensajeGestion && (
            <div className="alert alert-info mt-3">{mensajeGestion}</div>
          )}
        </div>
      );
    }

    return (
      <div className="gestion-formulario gestion-formulario-vacio">
        <h3>Selecciona una opción de gestión</h3>

        <p>
          Presiona el botón Gestionar en cualquiera de las tarjetas superiores
          para visualizar el formulario correspondiente.
        </p>
      </div>
    );
  };

  return (
    <div className="gestion-page">
      <section className="gestion-hero">
        <div className="container">
          <span className="gestion-etiqueta">Gestión administrativa</span>

          <h1>Panel de gestión del restaurante</h1>

          <p>
            Administra la información principal del sistema, como mesas, platos,
            horarios de atención y reservas realizadas por los clientes.
          </p>
        </div>
      </section>

      <section className="gestion-contenido">
        <div className="container gestion-container">
          <div className="row g-4 justify-content-center">
            {opcionesGestion.map((opcion, index) => (
              <div className="col-md-6" key={opcion.titulo}>
                <div className="gestion-card">
                  <div className="gestion-numero">{index + 1}</div>

                  <h2>{opcion.titulo}</h2>

                  <p>{opcion.descripcion}</p>

                  <ul>
                    {opcion.elementos.map((elemento) => (
                      <li key={elemento}>{elemento}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="btn btn-danger gestion-btn"
                    onClick={() => abrirFormulario(opcion.id)}
                  >
                    Gestionar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="gestion-panel-activo">{mostrarFormulario()}</div>
        </div>
      </section>
    </div>
  );
};

export default GestionAdmin;