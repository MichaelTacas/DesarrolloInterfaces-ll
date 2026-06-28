import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navegacion = () => {
  const location = useLocation();
  const esInicio = location.pathname === '/';

  return (
    <nav
      className={
        esInicio
          ? 'navbar navbar-expand-lg navbar-restaurante navbar-home'
          : 'navbar navbar-expand-lg navbar-restaurante navbar-interno'
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
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? 'nav-link nav-link-restaurante activo'
                  : 'nav-link nav-link-restaurante'
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/servicios"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link nav-link-restaurante activo'
                  : 'nav-link nav-link-restaurante'
              }
            >
              Especialidades
            </NavLink>

            <NavLink
              to="/reservas"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link nav-link-restaurante activo'
                  : 'nav-link nav-link-restaurante'
              }
            >
              Reservar
            </NavLink>

            <NavLink
              to="/calendario"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link nav-link-restaurante activo'
                  : 'nav-link nav-link-restaurante'
              }
            >
              Calendario
            </NavLink>

            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link nav-link-restaurante activo'
                  : 'nav-link nav-link-restaurante'
              }
            >
              Contacto
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;