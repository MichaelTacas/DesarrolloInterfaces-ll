import React from 'react';
import { Link } from 'react-router-dom';

import Ceviche from '../img/Ceviche.png';
import LomoSaltado from '../img/LomoSaltado.png';
import AjiDeGallina from '../img/AjiDeGallina.png';
import PolloAlaBrasa from '../img/PolloAlaBrasa.png';

const Servicios = () => {
  const categorias = [
    {
      titulo: 'Criollos',
      descripcion: 'Platos tradicionales con sabor casero peruano.',
      items: [
        {
          nombre: 'Lomo Saltado',
          detalle: 'Carne salteada con cebolla, tomate, papas fritas y arroz blanco.',
          precio: 'S/ 25.00'
        },
        {
          nombre: 'Ají de Gallina',
          detalle: 'Pollo deshilachado en crema de ají amarillo con arroz.',
          precio: 'S/ 22.00'
        },
        {
          nombre: 'Arroz con Pollo',
          detalle: 'Arroz verde acompañado con presa de pollo y salsa criolla.',
          precio: 'S/ 20.00'
        },
        {
          nombre: 'Seco con Frejoles',
          detalle: 'Carne guisada con frejoles, arroz y sabor tradicional.',
          precio: 'S/ 26.00'
        }
      ]
    },
    {
      titulo: 'Brasas y parrillas',
      descripcion: 'Opciones doradas, jugosas y servidas con guarniciones.',
      items: [
        {
          nombre: 'Pollo a la Brasa',
          detalle: 'Pollo dorado con papas fritas, ensalada y cremas.',
          precio: 'S/ 35.00'
        },
        {
          nombre: 'Anticuchos',
          detalle: 'Brochetas tradicionales acompañadas con papa y choclo.',
          precio: 'S/ 18.00'
        },
        {
          nombre: 'Parrilla Criolla',
          detalle: 'Selección de carnes con papas, ensalada y ají de casa.',
          precio: 'S/ 45.00'
        },
        {
          nombre: 'Chicharrón de Cerdo',
          detalle: 'Cerdo crocante acompañado con camote y salsa criolla.',
          precio: 'S/ 28.00'
        }
      ]
    },
    {
      titulo: 'Bebidas peruanas',
      descripcion: 'Bebidas ideales para acompañar nuestros platos criollos.',
      items: [
        {
          nombre: 'Chicha Morada',
          detalle: 'Bebida tradicional preparada con maíz morado y frutas.',
          precio: 'S/ 8.00'
        },
        {
          nombre: 'Maracuyá',
          detalle: 'Refresco natural de maracuyá, fresco y ligeramente ácido.',
          precio: 'S/ 7.00'
        },
        {
          nombre: 'Limonada',
          detalle: 'Bebida fresca preparada con limón natural.',
          precio: 'S/ 6.00'
        },
        {
          nombre: 'Inca Kola',
          detalle: 'Gaseosa peruana clásica para acompañar platos criollos.',
          precio: 'S/ 5.00'
        }
      ]
    },
    {
      titulo: 'Postres',
      descripcion: 'Dulces tradicionales para cerrar la experiencia criolla.',
      items: [
        {
          nombre: 'Mazamorra Morada',
          detalle: 'Postre peruano a base de maíz morado y frutas.',
          precio: 'S/ 8.00'
        },
        {
          nombre: 'Arroz con Leche',
          detalle: 'Postre cremoso con canela y sabor casero.',
          precio: 'S/ 8.00'
        },
        {
          nombre: 'Picarones',
          detalle: 'Aros dulces fritos acompañados con miel de chancaca.',
          precio: 'S/ 10.00'
        },
        {
          nombre: 'Suspiro a la Limeña',
          detalle: 'Postre tradicional limeño, dulce y cremoso.',
          precio: 'S/ 12.00'
        }
      ]
    }
  ];

  const platosDestacados = [
    {
      nombre: 'Lomo Saltado',
      categoria: 'Criollo',
      descripcion: 'Carne salteada con cebolla, tomate, papas fritas y arroz blanco.',
      precio: 'S/ 25.00',
      imagen: LomoSaltado
    },
    {
      nombre: 'Ají de Gallina',
      categoria: 'Criollo',
      descripcion: 'Pollo deshilachado en crema de ají amarillo, acompañado con arroz y huevo.',
      precio: 'S/ 22.00',
      imagen: AjiDeGallina
    },
    {
      nombre: 'Pollo a la Brasa',
      categoria: 'Brasas',
      descripcion: 'Pollo dorado acompañado con papas fritas, ensalada y cremas.',
      precio: 'S/ 35.00',
      imagen: PolloAlaBrasa
    },
    {
      nombre: 'Ceviche Clásico',
      categoria: 'Especial peruano',
      descripcion: 'Pescado fresco con limón, cebolla morada, ají y acompañamiento peruano.',
      precio: 'S/ 28.00',
      imagen: Ceviche
    }
  ];

  return (
    <div className="especialidades-page">
      <section className="especialidades-hero">
        <div className="container">
          <span className="especialidades-etiqueta">
            Sabor peruano
          </span>

          <h1>Nuestras Especialidades</h1>

          <p>
            Conoce los platos más representativos de Sabor Criollo, preparados
            con ingredientes frescos y el sabor tradicional de la cocina peruana.
          </p>
        </div>
      </section>

      <section className="especialidades-categorias">
        <div className="container">
          <div className="especialidades-titulo">
            <span>Especialidades criollas</span>

            <h2>Una carta pensada para disfrutar</h2>

            <p>
              Organizamos nuestras especialidades por categorías, mostrando
              el detalle y precio de cada opción.
            </p>
          </div>

          <div className="row g-4">
            {categorias.map((categoria, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="categoria-especialidad-card">
                  <h3>{categoria.titulo}</h3>

                  <p className="categoria-descripcion">
                    {categoria.descripcion}
                  </p>

                  <div className="categoria-menu-lista">
                    {categoria.items.map((item, i) => (
                      <div className="categoria-menu-item" key={i}>
                        <div>
                          <h4>{item.nombre}</h4>
                          <p>{item.detalle}</p>
                        </div>

                        <strong>{item.precio}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="especialidades-platos">
        <div className="container">
          <div className="especialidades-titulo">
            <span>Recomendados</span>

            <h2>Platos destacados de la casa</h2>

            <p>
              Estas son algunas opciones principales que representan el estilo
              de nuestro restaurante.
            </p>
          </div>

          <div className="row g-4">
            {platosDestacados.map((plato, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="especialidad-plato-card">
                  <div className="especialidad-img-contenedor">
                    <img
                      src={plato.imagen}
                      alt={plato.nombre}
                      className="especialidad-img"
                    />
                  </div>

                  <div className="especialidad-info">
                    <span>{plato.categoria}</span>

                    <h4>{plato.nombre}</h4>

                    <p>{plato.descripcion}</p>

                    <strong>{plato.precio}</strong>

                    <Link to="/reservas" className="btn btn-danger">
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="especialidades-nota">
            <h3>Atención organizada con reservas online</h3>

            <p>
              El cliente puede revisar la disponibilidad, elegir una mesa y
              registrar su reserva para evitar cruces de horarios.
            </p>

            <Link to="/reservas" className="btn btn-warning">
              Hacer una reserva
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicios;