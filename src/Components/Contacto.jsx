import React, { useState } from 'react';

import ContactoRestaurante from '../img_contacto/ContactoRestaurante.png';

const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMensajeEnviado(true);

    setFormulario({
      nombre: '',
      correo: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });

    setTimeout(() => {
      setMensajeEnviado(false);
    }, 3500);
  };

  return (
    <div className="contacto-page">
      <section className="contacto-hero">
        <div className="container">
          <span className="contacto-etiqueta">
            Atención al cliente
          </span>

          <h1>Contáctanos</h1>

          <p>
            Estamos listos para atender tus consultas, reservas y pedidos
            especiales en Sabor Criollo.
          </p>
        </div>
      </section>

      <section className="contacto-contenido">
        <div className="container">
          <div className="contacto-info-grid">
            <div className="contacto-info-card">
              <div className="contacto-icono">📍</div>

              <h4>Dirección</h4>

              <p>Av. Principal 123, Lima</p>
            </div>

            <div className="contacto-info-card">
              <div className="contacto-icono">📱</div>

              <h4>WhatsApp</h4>

              <p>999 999 999</p>
            </div>

            <div className="contacto-info-card">
              <div className="contacto-icono">✉️</div>

              <h4>Correo</h4>

              <p>contacto@saborcriollo.com</p>
            </div>

            <div className="contacto-info-card">
              <div className="contacto-icono">🕒</div>

              <h4>Horario</h4>

              <p>Lunes a domingo de 12:00 p.m. a 10:00 p.m.</p>
            </div>
          </div>

          <div className="row g-5 align-items-center contacto-bloque-principal">
            <div className="col-lg-6">
              <div className="contacto-imagen-card">
                <img
                  src={ContactoRestaurante}
                  alt="Restaurante Sabor Criollo"
                  className="contacto-imagen"
                />

                <div className="contacto-imagen-info">
                  <h3>Estamos cerca de ti</h3>

                  <p>
                    Escríbenos para consultas, reservas especiales o información
                    sobre nuestros platos criollos.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contacto-form-card">
                <h2>Enviar consulta</h2>

                <p className="contacto-form-descripcion">
                  Completa el formulario y nos comunicaremos contigo lo antes posible.
                </p>

                {mensajeEnviado && (
                  <div className="alert alert-success contacto-alerta">
                    Tu mensaje fue enviado correctamente.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre completo</label>

                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      className="form-control"
                      placeholder="Escribe tu nombre"
                      value={formulario.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo electrónico</label>

                    <input
                      id="correo"
                      type="email"
                      name="correo"
                      className="form-control"
                      placeholder="correo@ejemplo.com"
                      value={formulario.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>

                    <input
                      id="telefono"
                      type="text"
                      name="telefono"
                      className="form-control"
                      placeholder="Ej: 999999999"
                      value={formulario.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="asunto" className="form-label">Asunto</label>

                    <select
                      id="asunto"
                      name="asunto"
                      className="form-select"
                      value={formulario.asunto}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccionar asunto</option>
                      <option value="Consulta general">Consulta general</option>
                      <option value="Reserva especial">Reserva especial</option>
                      <option value="Pedido para evento">Pedido para evento</option>
                      <option value="Sugerencia">Sugerencia</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>

                    <textarea
                      id="mensaje"
                      name="mensaje"
                      className="form-control"
                      rows="4"
                      placeholder="Escribe tu mensaje"
                      value={formulario.mensaje}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-danger contacto-btn">
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="contacto-mapa">
            <div>
              <span>Ubicación referencial</span>

              <h3>Sabor Criollo - Lima, Perú</h3>

              <p>
                Visítanos y disfruta una experiencia criolla en un ambiente cálido,
                familiar y organizado.
              </p>
            </div>
          </div>

          <div className="contacto-redes">
            <h3>Síguenos en redes sociales</h3>

            <div className="contacto-redes-links">
              <a href="https://www.facebook.com" aria-label="Facebook">Facebook</a>
              <a href="https://www.instagram.com" aria-label="Instagram">Instagram</a>
              <a href="https://www.tiktok.com" aria-label="TikTok">TikTok</a>
              <a href="https://wa.me/999999999" aria-label="WhatsApp">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;