import React, { useState } from "react";

const mesas = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5", "Mesa 6"];

const estadosReserva = ["Activa", "Pendiente", "Atendida", "Cancelada"];

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

const formulariosSimples = {
  mesas: {
    titulo: "Gestión de mesas",
    boton: "Guardar mesa",
    campos: [
      {
        name: "nombreMesa",
        label: "Nombre de la mesa",
        placeholder: "Ej: Mesa 1",
        minLength: 3,
      },
      {
        name: "capacidadMesa",
        label: "Capacidad de personas",
        tipo: "number",
        placeholder: "Ej: 4",
        min: 0,
      },
      {
        name: "estadoMesa",
        label: "Estado",
        tipo: "select",
        opciones: ["Disponible", "No disponible"],
      },
      {
        name: "ubicacionMesa",
        label: "Ubicación",
        placeholder: "Ej: Interior, terraza, ventana",
        minLength: 3,
      },
    ],
  },
  platos: {
    titulo: "Gestión de platos",
    boton: "Guardar plato",
    campos: [
      {
        name: "nombrePlato",
        label: "Nombre del plato",
        placeholder: "Ej: Ceviche clásico",
        minLength: 3,
      },
      {
        name: "precioPlato",
        label: "Precio",
        tipo: "number",
        placeholder: "Ej: 28",
        min: 0,
        step: "0.01",
      },
      {
        name: "categoriaPlato",
        label: "Categoría",
        tipo: "select",
        opciones: ["Entrada", "Fondo", "Bebida", "Postre"],
      },
      {
        name: "estadoPlato",
        label: "Estado",
        tipo: "select",
        opciones: ["Disponible", "No disponible"],
      },
      {
        name: "descripcionPlato",
        label: "Descripción",
        tipo: "textarea",
        placeholder: "Descripción del plato",
        minLength: 5,
        col: "col-12 mb-3",
      },
    ],
  },
  horarios: {
    titulo: "Gestión de horarios",
    boton: "Guardar horario",
    campos: [
      {
        name: "diaAtencion",
        label: "Día de atención",
        tipo: "select",
        opciones: [
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ],
      },
      {
        name: "horaApertura",
        label: "Hora de apertura",
        tipo: "time",
        col: "col-md-3 mb-3",
      },
      {
        name: "horaCierre",
        label: "Hora de cierre",
        tipo: "time",
        col: "col-md-3 mb-3",
      },
      {
        name: "estadoDia",
        label: "Estado del día",
        tipo: "select",
        opciones: ["Abierto", "Cerrado"],
      },
      {
        name: "motivoDia",
        label: "Motivo opcional",
        placeholder: "Ej: Feriado, mantenimiento, evento privado",
        required: false,
      },
    ],
  },
};

const GestionAdmin = ({ reservas = [], actualizarReserva }) => {
  const [opcionActiva, setOpcionActiva] = useState("");
  const [idReservaSeleccionada, setIdReservaSeleccionada] = useState("");
  const [reservaEditada, setReservaEditada] = useState(null);
  const [mensajeGestion, setMensajeGestion] = useState("");

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

  const validarHoraReserva = (hora) => {
    const horaValida = hora === "00:00" || (hora >= "12:00" && hora <= "23:59");

    if (!horaValida) {
      const mensaje =
        "La hora de la reserva debe estar entre las 12:00 p. m. y las 12:00 a. m.";

      setMensajeGestion(mensaje);
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
          "La capacidad de la mesa no puede ser negativa.",
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
          "El precio del plato no puede ser negativo.",
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
      (reserva) => String(reserva.id_reserva) === String(idReserva),
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

    if (
      !validarNumeroMayorACero(
        reservaEditada.personas,
        "La cantidad de personas debe ser mayor a 0.",
      )
    ) {
      return;
    }

    if (!validarHoraReserva(reservaEditada.hora)) {
      return;
    }

    if (typeof actualizarReserva !== "function") {
      setMensajeGestion(
        "Falta conectar la función actualizarReserva desde App.js.",
      );
      return;
    }

    const reservaParaActualizar = {
      nombre: reservaEditada.nombre,
      telefono: reservaEditada.telefono,
      fecha: reservaEditada.fecha,
      hora: reservaEditada.hora,
      personas: Number(reservaEditada.personas),
      mesa: reservaEditada.mesa,
      comentario: reservaEditada.comentario,
      estado: reservaEditada.estado,
    };

    const actualizado = await actualizarReserva(
      idReservaSeleccionada,
      reservaParaActualizar,
    );

    setMensajeGestion(
      actualizado
        ? "Reserva actualizada correctamente."
        : "No se pudo actualizar la reserva.",
    );

    setMensajeGestion(
      actualizado
        ? "Reserva actualizada correctamente."
        : "No se pudo actualizar la reserva.",
    );
  };

  const abrirFormulario = (idOpcion) => {
    setOpcionActiva(idOpcion);
    setMensajeGestion("");

    if (idOpcion !== "reservas") {
      setIdReservaSeleccionada("");
      setReservaEditada(null);
    }
  };

  const renderCampoSimple = (campo) => {
    const requerido = campo.required !== false;

    return (
      <div className={campo.col || "col-md-6 mb-3"} key={campo.name}>
        <label className="form-label" htmlFor={campo.name}>
          {campo.label}
        </label>

        {campo.tipo === "select" ? (
          <select
            id={campo.name}
            name={campo.name}
            className="form-select"
            required={requerido}
          >
            <option value="">Seleccionar</option>

            {campo.opciones.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        ) : campo.tipo === "textarea" ? (
          <textarea
            id={campo.name}
            name={campo.name}
            className="form-control"
            rows="3"
            placeholder={campo.placeholder || ""}
            minLength={campo.minLength}
            required={requerido}
          ></textarea>
        ) : (
          <input
            id={campo.name}
            name={campo.name}
            type={campo.tipo || "text"}
            className="form-control"
            placeholder={campo.placeholder || ""}
            min={campo.min}
            step={campo.step}
            minLength={campo.minLength}
            required={requerido}
          />
        )}
      </div>
    );
  };

  const renderFormularioSimple = (config) => (
    <form onSubmit={guardarFormularioSimple} className="gestion-formulario">
      <h3>{config.titulo}</h3>

      <div className="row">{config.campos.map(renderCampoSimple)}</div>

      <button className="btn btn-danger gestion-form-btn" type="submit">
        {config.boton}
      </button>
    </form>
  );

  const renderCampoReserva = ({
    name,
    label,
    tipo = "text",
    opciones = [],
    col = "col-md-6 mb-3",
    placeholder = "",
  }) => (
    <div className={col} key={name}>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>

      {tipo === "select" ? (
        <select
          id={name}
          name={name}
          className="form-select"
          value={reservaEditada[name]}
          onChange={manejarCambioReserva}
          required
        >
          <option value="">Seleccionar</option>

          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      ) : tipo === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className="form-control"
          rows="3"
          value={reservaEditada[name]}
          onChange={manejarCambioReserva}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          id={name}
          name={name}
          type={tipo}
          className="form-control"
          value={reservaEditada[name]}
          onChange={manejarCambioReserva}
          placeholder={placeholder}
          min={name === "personas" ? "1" : undefined}
          minLength={name === "telefono" ? "9" : "3"}
          maxLength={name === "telefono" ? "15" : undefined}
          required
        />
      )}
    </div>
  );

  const renderFormularioReservas = () => {
    const camposReserva = [
      { name: "nombre", label: "Cliente" },
      { name: "telefono", label: "Teléfono" },
      { name: "fecha", label: "Fecha de reserva", tipo: "date" },
      { name: "hora", label: "Hora", tipo: "time" },
      {
        name: "mesa",
        label: "Mesa asignada",
        tipo: "select",
        opciones: mesas,
        col: "col-md-4 mb-3",
      },
      {
        name: "personas",
        label: "Personas",
        tipo: "number",
        col: "col-md-4 mb-3",
      },
      {
        name: "estado",
        label: "Estado",
        tipo: "select",
        opciones: estadosReserva,
        col: "col-md-4 mb-3",
      },
      {
        name: "comentario",
        label: "Comentario",
        tipo: "textarea",
        placeholder: "Ej: Mesa cerca a la ventana",
        col: "col-12 mb-3",
      },
    ];

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
            <div className="row">{camposReserva.map(renderCampoReserva)}</div>

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
  };

  const mostrarFormulario = () => {
    if (opcionActiva === "reservas") {
      return renderFormularioReservas();
    }

    if (formulariosSimples[opcionActiva]) {
      return renderFormularioSimple(formulariosSimples[opcionActiva]);
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
              <div className="col-md-6" key={opcion.id}>
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
