import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-restaurante">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h4 className="footer-titulo">Sabor Criollo</h4>

            <p>
              Restaurante de comida peruana enfocado en brindar una experiencia
              cálida, organizada y con platos tradicionales.
            </p>

            <p>
              Nuestro sistema permite registrar reservas, consultar disponibilidad
              y mejorar la atención al cliente.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="footer-subtitulo">Enlaces rápidos</h5>

            <ul className="footer-lista">
              <li>
                <Link to="/" className="footer-link">Inicio</Link>
              </li>

              <li>
                <Link to="/servicios" className="footer-link">Especialidades</Link>
              </li>

              <li>
                <Link to="/reservas" className="footer-link">Reservar mesa</Link>
              </li>

              <li>
                <Link to="/calendario" className="footer-link">Calendario</Link>
              </li>

              <li>
                <Link to="/contacto" className="footer-link">Contacto</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="footer-subtitulo">Atención</h5>

            <p><strong>Dirección:</strong> Lima, Perú</p>
            <p><strong>WhatsApp:</strong> 999 999 999</p>
            <p><strong>Correo:</strong> contacto@saborcriollo.com</p>
            <p><strong>Horario:</strong> Lunes a domingo de 12:00 p.m. a 10:00 p.m.</p>
          </div>
        </div>

        <hr className="footer-linea" />

        <div className="footer-copy">
          <p>
            © 2026 Sabor Criollo | Sistema web de reservas desarrollado en React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;