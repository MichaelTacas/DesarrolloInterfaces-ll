import React from 'react';
import { Link } from 'react-router-dom';

import BannerGif from '../img/gilf/123.gif';
import Ceviche from '../img/Ceviche.png';
import LomoSaltado from '../img/LomoSaltado.png';
import AjiDeGallina from '../img/AjiDeGallina.png';
import PolloAlaBrasa from '../img/PolloAlaBrasa.png';

const Inicio = () => {
  const experiencias = [
    {
      icono: '🍽️',
      titulo: 'Platos criollos',
      descripcion: 'Comidas peruanas tradicionales con excelente sabor y buena presentación.'
    },
    {
      icono: '📅',
      titulo: 'Reserva rápida',
      descripcion: 'Separa tu mesa indicando fecha, hora y cantidad de personas en pocos pasos.'
    },
    {
      icono: '✅',
      titulo: 'Sin conflictos',
      descripcion: 'El sistema evita reservas repetidas en la misma fecha y hora.'
    },
    {
      icono: '🕒',
      titulo: 'Disponibilidad',
      descripcion: 'Consulta el calendario y revisa qué mesas están ocupadas.'
    }
  ];

  const platos = [
    {
      nombre: 'Ceviche',
      descripcion: 'Pescado fresco con limón, cebolla morada, ají y acompañamiento peruano.',
      precio: 'S/ 28.00',
      imagen: Ceviche
    },
    {
      nombre: 'Lomo Saltado',
      descripcion: 'Carne salteada con cebolla, tomate, papas fritas y arroz blanco.',
      precio: 'S/ 25.00',
      imagen: LomoSaltado
    },
    {
      nombre: 'Ají de Gallina',
      descripcion: 'Pollo deshilachado en crema de ají amarillo, acompañado con arroz y huevo.',
      precio: 'S/ 22.00',
      imagen: AjiDeGallina
    },
    {
      nombre: 'Pollo a la Brasa',
      descripcion: 'Pollo dorado acompañado con papas fritas, ensalada y cremas.',
      precio: 'S/ 35.00',
      imagen: PolloAlaBrasa
    },
    
  ];

  return (
    <div className="inicio-page">
      <section className="inicio-hero inicio-hero-video">
        <img
          className="inicio-video-fondo"
          src={BannerGif}
          alt="Banner animado Sabor Criollo"
        />

        <div className="inicio-video-overlay"></div>

        <div className="container">
          <div className="inicio-hero-contenido">
            <span className="inicio-etiqueta">Cocina peruana</span>

            <h1>Sabor Criollo</h1>

            <p>
              Vive una experiencia peruana auténtica con platos criollos,
              atención cálida y reservas rápidas desde nuestra web.
            </p>

            <div className="inicio-botones">
              <Link to="/reservas" className="btn btn-warning">
                Reservar mesa
              </Link>

              <Link to="/servicios" className="btn btn-outline-light">
                Ver especialidades
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="inicio-experiencias">
        <div className="container">
          <div className="inicio-titulo-centro">
            <span className="inicio-subtitulo-seccion">
              Nuestras experiencias
            </span>

            <h2>Vive una experiencia criolla completa</h2>

            <p>
              Combinamos sabor, ambiente y tecnología para mejorar la atención
              del restaurante.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {experiencias.map((item, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="experiencia-card">
                  <div className="experiencia-icono">
                    {item.icono}
                  </div>

                  <h4>{item.titulo}</h4>

                  <p>{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inicio-platos">
        <div className="container">
          <div className="inicio-titulo-centro">
            <span className="inicio-subtitulo-seccion">
              Nuestra carta
            </span>

            <h2>Platos destacados</h2>

            <p>
              Pasa el mouse sobre cada carta para descubrir el plato, su
              descripción y precio.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {platos.map((plato, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="plato-flip-card">
                  <div className="plato-flip-inner">
                    <div className="plato-flip-front">
                      <div className="logo-comida">
                        <div className="logo-vapor">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>

                        <div className="logo-plato">
                          🍲
                        </div>
                      </div>

                      <h4>Sabor Criollo</h4>

                      <p>Carta especial</p>

                      <span className="plato-boton-front">
                        Ver plato
                      </span>
                    </div>

                    <div className="plato-flip-back">
                      <div className="plato-imagen-contenedor">
                        <img
                          src={plato.imagen}
                          alt={plato.nombre}
                          className="plato-flip-img"
                        />
                      </div>

                      <div className="plato-flip-info">
                        <h4>{plato.nombre}</h4>

                        <p>{plato.descripcion}</p>

                        <strong>{plato.precio}</strong>

                        <Link
                          to="/reservas"
                          className="btn btn-danger btn-sm mt-3"
                        >
                          Reservar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;