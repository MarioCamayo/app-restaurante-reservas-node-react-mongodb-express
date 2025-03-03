import mongoose from "mongoose";

const ReservaSchema = new mongoose.Schema({
  nombreCliente: { type: String, required: true }, // Nombre del cliente
  email: { 
    type: String, 
    required: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validar formato de email
  }, 
  telefono: { 
    type: String, 
    required: true, 
    match: /^\d{9,}$/ // Asegurar mínimo 9 dígitos 
  },
  fecha: { 
    type: Date, 
    required: true, 
    validate: {
      validator: function (value) {
        return value > new Date(); // Validar que la fecha sea futura
      },
      message: "La fecha debe ser en el futuro",
    }
  },
  hora: { 
    type: String, 
    required: true, 
    match: /^([01]\d|2[0-3]):([0-5]\d)$/ // Formato 24h (ej: 18:30)
  }, 
  personas: { type: Number, required: true, min: 1 }, // Mínimo 1 persona
  mesa: { type: String, required: false }, // Opcional: Número o identificador de mesa
  estado: { 
    type: String, 
    enum: ["pendiente", "confirmado", "cancelado"], 
    default: "pendiente" // Estados de la reserva
  }, 
  comentarios: { type: String, required: false }, // Notas opcionales del cliente
  servicio: { type: String, required: true } // Campo servicio obligatorio

}); 

const Reserva = mongoose.model("Reserva", ReservaSchema);

export default Reserva;
