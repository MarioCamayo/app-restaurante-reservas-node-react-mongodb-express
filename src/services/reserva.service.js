import Reserva from "../models/reserva.model.js";
import { reservaSchema } from "../validations/reserva.validation.js";
import { enviarNotificacionReservaSMS } from "./notificacion.service.js";




//  Obtener todas las reservas
export const obtenerReservasService = async () => {
  try {
    return await Reserva.find();
  } catch (error) {
    throw new Error("Error al obtener las reservas: " + error.message);
  }
};



// Crear una nueva reserva con validación y verificación de disponibilidad
export const crearReservaService = async (reservaData) => {
  try {
    // Validar los datos antes de guardarlos
    await reservaSchema.validateAsync(reservaData);


    const { fecha, hora, mesa, telefono, nombreCliente, servicio  } = reservaData;

    //  Verificar si la mesa ya está reservada en la misma fecha y hora
    const reservaExistente = await Reserva.findOne({ fecha, hora, mesa });

    if (reservaExistente) {
      throw new Error("Ya existe una reserva para esta mesa en la misma fecha y hora.");
    }

    //  Contar cuántas reservas hay en ese horario
    const reservasEnHorario = await Reserva.countDocuments({ fecha, hora });

    const totalMesas = 6; //  Ajusta según la cantidad real de mesas en el restaurante

    if (reservasEnHorario >= totalMesas) {
      throw new Error("No hay mesas disponibles en este horario.");
    }

    //  Si pasa todas las validaciones, guardar la reserva
    const reserva = new Reserva(reservaData);
    await reserva.save();

    // Enviar notificación SMS
    // Convertir la fecha a un objeto Date antes de formatearla
    const fechaObjeto = new Date(fecha); 
    const mensaje = `Hola ${nombreCliente}, tu reserva para ${servicio} el ${fechaObjeto.toISOString().split("T")[0]} a las ${hora} ha sido confirmada.`;
    await enviarNotificacionReservaSMS(telefono, mensaje);

    return reserva;  // Retorna la reserva después del SMS


  } catch (error) {
    throw new Error("Error al crear la reserva: " + error.message);
  }
};




// Actualizar una reserva por ID con validación
export const actualizarReservaService = async (id, data) => {
  try {
    // Validar los datos antes de actualizar
    await reservaSchema.validateAsync(data);

    const reservaActualizada = await Reserva.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!reservaActualizada) {
      throw new Error("Reserva no encontrada");
    }

    // Si la reserva se confirma, enviamos la notificación
    if (data.estado === "confirmado") {
      await enviarWhatsApp(reservaActualizada); // Para WhatsApp
      await enviarSMS(reservaActualizada); // Para SMS (opcional)
    }

    return reservaActualizada;

  } catch (error) {
    throw new Error("Error al actualizar la reserva: " + error.message);
  }
};



/// Eliminar una reserva por ID
export const eliminarReservaService = async (id) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(id);
    if (!reservaEliminada) {
      throw new Error("Reserva no encontrada");
    }
    return reservaEliminada;
  } catch (error) {
    throw new Error("Error al eliminar la reserva: " + error.message);
  }
};


