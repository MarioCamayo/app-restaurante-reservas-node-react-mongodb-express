# Sistema de Reservas para Restaurantes

🍽️ API RESTful para gestionar reservas en restaurantes. Permite crear, consultar, actualizar y cancelar reservas, validando disponibilidad en tiempo real y enviando notificaciones por SMS.

## 🚀 Características principales

- **CRUD de reservas**: Crear, leer, actualizar y eliminar reservas.
- **Validación de disponibilidad**: Evita duplicidad y sobre-reservas.
- **Notificaciones SMS**: Envía confirmaciones de reserva usando Twilio.
- **Autenticación básica**: Seguridad para endpoints sensibles.
- **Estructura profesional**: Separación de rutas, controladores, modelos, servicios y middlewares.

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- MongoDB & Mongoose
- Twilio (SMS)
- Joi & express-validator (validaciones)
- Dotenv (variables de entorno)

## 📁 Estructura del proyecto

```
├── server.js
├── src/
│   ├── app.js
│   ├── config/db.js
│   ├── controllers/reserva.controller.js
│   ├── models/reserva.model.js
│   ├── routes/reserva.routes.js
│   ├── services/notificacion.service.js
│   ├── validations/reserva.validation.js
│   └── middlewares/auth.middleware.js
├── package.json
├── .env
└── README.md
```

## ⚡ Cómo ejecutar

1. Clona el repositorio.
2. Instala dependencias:  
   `npm install`
3. Configura las variables de entorno en `.env`.
4. Inicia el servidor:  
   `npm start`

## Endpoints principales de la API de reservas

**Crear reserva**
- Método: POST
- URL: http://localhost:4000/api/reservas
- Body (JSON):
{
  "nombre": "Juan Pérez",
  "telefono": "+34123456789",
  "fecha": "2025-09-01",
  "hora": "20:00",
  "personas": 4
}

**Listar todas las reservas**
- Método: GET
- URL: http://localhost:4000/api/reservas

**Obtener una reserva por ID**
- Método: GET
- URL: http://localhost:4000/api/reservas/{id}

**Actualizar una reserva**
- Método: PUT
- URL: http://localhost:4000/api/reservas/{id}
- Body (JSON): (igual que crear, puedes modificar campos)

**Eliminar una reserva**
- Método: DELETE
- URL: http://localhost:4000/api/reservas/{id}



## un resumen general basado en la estructura típica del proyecto, aquí tienes:

*server.js:* Inicia el servidor Express y carga las variables de entorno.
*app.js:* Configura middlewares globales, rutas y manejo de errores.
db.js: Conexión y configuración de la base de datos MongoDB.
*reserva.controller.js:* Lógica para manejar las peticiones HTTP relacionadas con reservas.
*reserva.model.js:* Define el esquema y modelo de reservas en MongoDB usando Mongoose.
*reserva.routes.js:* Define las rutas/endpoints para las operaciones de reservas.
*notificacion.service.js:* Lógica para enviar notificaciones SMS usando Twilio.
*reserva.validation.js:* Validaciones de datos de entrada para reservas.
*auth.middleware.js:* Middleware para autenticación y protección de rutas.

## 📌 Estado

En desarrollo. Próximamente interfaz web con React.

---

¿Buscas una API robusta y escalable para reservas? Este proyecto demuestra buenas prácticas y una arquitectura profesional.
