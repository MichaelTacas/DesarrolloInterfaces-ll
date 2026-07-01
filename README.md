# Sabor Criollo - Sistema de Reservas

Sistema web desarrollado en React para la gestión de reservas de un restaurante peruano llamado **Sabor Criollo**.

El proyecto permite a los clientes consultar la disponibilidad de mesas, registrarse, iniciar sesión y realizar reservas. Además, cuenta con un panel administrativo para revisar reservas, disponibilidad y reportes importantes del restaurante.

## Tecnologías utilizadas

- React
- Bootstrap
- JavaScript
- Node.js
- Express
- MySQL

## Funcionalidades principales

### Cliente

- Registro de usuario.
- Inicio de sesión.
- Consulta de mesas disponibles.
- Reserva de mesas.
- Visualización de disponibilidad por fecha.
- Formulario de reserva usando los datos de la cuenta del cliente.

### Administrador

- Panel de administración.
- Visualización de mesas ocupadas y disponibles.
- Registro de reservas.
- Listado de reservas activas.
- Eliminación de reservas.
- Reportes administrativos.

## Reportes administrativos

El sistema incluye cuatro reportes principales:

1. Reservas por fecha.
2. Mesas ocupadas.
3. Reservas por horario.
4. Clientes registrados con reservas.

## Estructura del proyecto

```text
WEBPROYECTOSABOR CRIOLLO
│
├── backend
│   └── server.js
│
├── public
│
├── src
│   ├── Components
│   │   ├── Calendario.jsx
│   │   ├── Contacto.jsx
│   │   ├── Footer.jsx
│   │   ├── Inicio.jsx
│   │   ├── ListaReservas.jsx
│   │   ├── Login.jsx
│   │   ├── Navegacion.jsx
│   │   ├── Reservas.jsx
│   │   └── Servicios.jsx
│   │
│   ├── img
│   ├── img_contacto
│   ├── img_reservar
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md