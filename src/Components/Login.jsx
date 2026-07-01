import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Inicio from "./Inicio";

const Login = () => {
  const navigate = useNavigate();
  const [modoRegistro, setModoRegistro] = useState(false);

  const [usuario, setUsuario] = useState({
    nombres: "",
    dni: "",
    telefono: "",
    correo: "",
    contrasena: "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    if (name === "dni") {
      setUsuario({
        ...usuario,
        dni: value.replace(/\D/g, "").slice(0, 8),
      });
      return;
    }

    if (name === "telefono") {
      setUsuario({
        ...usuario,
        telefono: value.replace(/\D/g, "").slice(0, 9),
      });
      return;
    }

    if (name === "nombres") {
      setUsuario({
        ...usuario,
        nombres: value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""),
      });
      return;
    }

    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const limpiarFormulario = () => {
    setUsuario({
      nombres: "",
      dni: "",
      telefono: "",
      correo: "",
      contrasena: "",
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
      const respuesta = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        alert(data.mensaje || "Error al registrar usuario.");
        return;
      }

      alert(data.mensaje || "Cuenta creada correctamente.");
      setModoRegistro(false);
      limpiarFormulario();
    } catch (error) {
      console.log("Error al conectar con el backend:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: usuario.correo,
          contrasena: usuario.contrasena,
        }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        alert(data.mensaje || "Correo o contraseña incorrectos.");
        return;
      }

      localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));

      limpiarFormulario();

      if (data.usuario.rol === "Administrador") {
        navigate("/calendario");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

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
                <div className="login-grupo">
                  <label>Correo</label>
                  <input
                    type="email"
                    name="correo"
                    placeholder="Ej: jose@mail.com"
                    value={usuario.correo}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="login-grupo">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="contrasena"
                    value={usuario.contrasena}
                    onChange={manejarCambio}
                    required
                  />
                </div>

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
                    onClick={() => {
                      limpiarFormulario();
                      setModoRegistro(true);
                    }}
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
                <div className="login-grupo">
                  <label>Nombres y apellidos</label>
                  <input
                    type="text"
                    name="nombres"
                    placeholder="Ej: Juan Pérez"
                    value={usuario.nombres}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="login-grupo">
                  <label>DNI</label>
                  <input
                    type="text"
                    name="dni"
                    placeholder="Ej: 12345678"
                    value={usuario.dni}
                    onChange={manejarCambio}
                    inputMode="numeric"
                    maxLength="8"
                    required
                  />
                </div>

                <div className="login-grupo">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    placeholder="Ej: 999999999"
                    value={usuario.telefono}
                    onChange={manejarCambio}
                    inputMode="numeric"
                    maxLength="9"
                    required
                  />
                </div>

                <div className="login-grupo">
                  <label>Correo</label>
                  <input
                    type="email"
                    name="correo"
                    placeholder="Ej: jose@mail.com"
                    value={usuario.correo}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <div className="login-grupo">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="contrasena"
                    value={usuario.contrasena}
                    onChange={manejarCambio}
                    required
                  />
                </div>

                <button type="submit" className="login-btn-principal">
                  Crear cuenta
                </button>

                <div className="login-registro-texto">
                  <p>¿Ya tienes una cuenta?</p>

                  <button
                    type="button"
                    className="login-btn-registro"
                    onClick={() => {
                      limpiarFormulario();
                      setModoRegistro(false);
                    }}
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