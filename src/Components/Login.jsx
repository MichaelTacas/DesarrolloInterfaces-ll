import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Inicio from "./Inicio";

const usuarioInicial = {
  nombres: "",
  dni: "",
  telefono: "",
  correo: "",
  contrasena: "",
};

const camposLogin = [
  {
    name: "correo",
    label: "Correo",
    type: "email",
    placeholder: "Ej: jose@mail.com",
  },
  {
    name: "contrasena",
    label: "Contraseña",
    type: "password",
  },
];

const camposRegistro = [
  {
    name: "nombres",
    label: "Nombres y apellidos",
    type: "text",
    placeholder: "Ej: Juan Pérez",
  },
  {
    name: "dni",
    label: "DNI",
    type: "text",
    placeholder: "Ej: 12345678",
    inputMode: "numeric",
    maxLength: "8",
  },
  {
    name: "telefono",
    label: "Teléfono",
    type: "text",
    placeholder: "Ej: 999999999",
    inputMode: "numeric",
    maxLength: "9",
  },
  {
    name: "correo",
    label: "Correo",
    type: "email",
    placeholder: "Ej: jose@mail.com",
  },
  {
    name: "contrasena",
    label: "Contraseña",
    type: "password",
  },
];

const Login = () => {
  const navigate = useNavigate();

  const [modoRegistro, setModoRegistro] = useState(false);
  const [usuario, setUsuario] = useState(usuarioInicial);

  const limpiarFormulario = () => {
    setUsuario(usuarioInicial);
  };

  const cambiarModo = (registro) => {
    limpiarFormulario();
    setModoRegistro(registro);
  };

  const limpiarValorCampo = (name, value) => {
    if (name === "dni") {
      return value.replace(/\D/g, "").slice(0, 8);
    }

    if (name === "telefono") {
      return value.replace(/\D/g, "").slice(0, 9);
    }

    if (name === "nombres") {
      return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    return value;
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setUsuario({
      ...usuario,
      [name]: limpiarValorCampo(name, value),
    });
  };

  const validarRegistro = () => {
    const nombresLimpios = usuario.nombres.trim().replace(/\s+/g, " ");
    const partesNombre = nombresLimpios.split(" ");

    if (partesNombre.length < 2) {
      alert("Ingresa nombres y apellidos completos.");
      return false;
    }

    if (!/^\d{8}$/.test(usuario.dni)) {
      alert("El DNI debe tener exactamente 8 números.");
      return false;
    }

    if (!/^\d{9}$/.test(usuario.telefono)) {
      alert("El teléfono debe tener exactamente 9 números.");
      return false;
    }

    if (usuario.contrasena.length < 4) {
      alert("La contraseña debe tener como mínimo 4 caracteres.");
      return false;
    }

    return true;
  };

  const enviarPeticion = async (url, datos) => {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      data,
    };
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();

    if (!validarRegistro()) {
      return;
    }

    const nuevoUsuario = {
      nombres: usuario.nombres.trim().replace(/\s+/g, " "),
      dni: usuario.dni,
      telefono: usuario.telefono,
      correo: usuario.correo,
      contrasena: usuario.contrasena,
    };

    try {
      const { ok, data } = await enviarPeticion(
        "http://localhost:3001/usuarios",
        nuevoUsuario
      );

      if (!ok) {
        alert(data.mensaje || "Error al registrar usuario.");
        return;
      }

      alert(data.mensaje || "Cuenta creada correctamente.");
      cambiarModo(false);
    } catch (error) {
      console.log("Error al conectar con el backend:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const { ok, data } = await enviarPeticion("http://localhost:3001/login", {
        correo: usuario.correo,
        contrasena: usuario.contrasena,
      });

      if (!ok) {
        alert(data.mensaje || "Correo o contraseña incorrectos.");
        return;
      }

      localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));

      limpiarFormulario();

      if (data.usuario.rol === "Administrador") {
        navigate("/lista-reservas");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  const renderCampo = (campo) => (
    <div className="login-grupo" key={campo.name}>
      <label>{campo.label}</label>

      <input
        type={campo.type}
        name={campo.name}
        placeholder={campo.placeholder || ""}
        value={usuario[campo.name]}
        onChange={manejarCambio}
        inputMode={campo.inputMode}
        maxLength={campo.maxLength}
        required
      />
    </div>
  );

  return (
    <>
      <Inicio />

      <div className="login-overlay">
        <div className="login-modal">
          <Link to="/" className="login-cerrar">
            ×
          </Link>

          {!modoRegistro ? (
            <>
              <h2>Iniciar sesión</h2>

              <form onSubmit={iniciarSesion}>
                {camposLogin.map(renderCampo)}

                <button type="button" className="login-olvido">
                  Olvidé mi contraseña
                </button>

                <button type="submit" className="login-btn-principal">
                  Ingresar
                </button>

                <div className="login-separador">
                  <span></span>
                  <p>o inicia sesión con</p>
                  <span></span>
                </div>

                <div className="login-opciones">
                  <button type="button" className="login-btn-secundario">
                    <strong>G</strong> Google
                  </button>

                  <button type="button" className="login-btn-secundario">
                    Recibir clave de acceso rápido
                  </button>
                </div>

                <div className="login-registro-texto">
                  <p>¿No tienes una cuenta?</p>

                  <button
                    type="button"
                    className="login-btn-registro"
                    onClick={() => cambiarModo(true)}
                  >
                    Regístrate
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2>Crear cuenta</h2>

              <form onSubmit={registrarUsuario}>
                {camposRegistro.map(renderCampo)}

                <button type="submit" className="login-btn-principal">
                  Crear cuenta
                </button>

                <div className="login-registro-texto">
                  <p>¿Ya tienes una cuenta?</p>

                  <button
                    type="button"
                    className="login-btn-registro"
                    onClick={() => cambiarModo(false)}
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;