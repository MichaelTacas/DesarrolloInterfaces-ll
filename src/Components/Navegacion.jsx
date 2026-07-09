import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navegacion = () => {
  const location = useLocation();
  const esInicio = location.pathname === "/";

  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const esAdministrador = usuarioActivo?.rol === "Administrador";

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "/";
  };

  const claseNav = ({ isActive }) =>
    isActive
      ? "nav-link nav-link-restaurante activo"
      : "nav-link nav-link-restaurante";

  const enlacesCliente = [
    {
      texto: "Inicio",
      ruta: "/",
      end: true,
    },
    {
      texto: "Especialidades",
      ruta: "/servicios",
    },
    {
      texto: "Reservar",
      ruta: usuarioActivo ? "/reservas" : "/login",
    },
    {
      texto: "Calendario",
      ruta: "/calendario",
    },
  ];

  const enlacesAdministrador = [
    {
      texto: "Reportes",
      ruta: "/lista-reservas",
    },
    {
      texto: "Gestión",
      ruta: "/gestion-admin",
    },
  ];

  const enlacesMenu = esAdministrador ? enlacesAdministrador : enlacesCliente;

  return (
    <nav
      className={
        esInicio
          ? "navbar navbar-expand-lg navbar-restaurante navbar-home"
          : "navbar navbar-expand-lg navbar-restaurante navbar-interno"
      }
    >
      <div className="container">
        <NavLink className="navbar-brand logo-restaurante" to="/">
          Sabor Criollo
        </NavLink>

        <button
          className="navbar-toggler navbar-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuRestaurante"
          aria-controls="menuRestaurante"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuRestaurante">
          <div className="navbar-nav ms-auto menu-links">
            {enlacesMenu.map((enlace) => (
              <NavLink
                key={enlace.texto}
                to={enlace.ruta}
                end={enlace.end}
                className={claseNav}
              >
                {enlace.texto}
              </NavLink>
            ))}

            {usuarioActivo ? (
              <div className="nav-usuario-activo">
                <span className="usuario-avatar">👤</span>

                <div className="usuario-info">
                  <span className="usuario-nombre">
                    {usuarioActivo.nombres}
                  </span>

                  <button
                    type="button"
                    className="btn-cerrar-sesion"
                    onClick={cerrarSesion}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <>
                <NavLink to="/login" className={claseNav}>
                  <span className="login-icono">👤</span>
                  <span>Iniciar sesión</span>
                </NavLink>

                <NavLink to="/contacto" className={claseNav}>
                  Contacto
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;