import { obtenerReservasService, crearReservaService, actualizarReservaService,
  eliminarReservaService, } from "../services/reserva.service.js";
import { validationResult } from "express-validator";



//  Obtener todas las reservas
export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await obtenerReservasService();

    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo las reservas",error: error.message});
  }
};


//  Crear una nueva reserva
export const crearReserva = async (req, res) => {
  try {
    // Verificar si hay errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const nuevaReserva = await crearReservaService(req.body);
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ message: "Error creando la reserva", error: error.message });
  }
};


//  Modificar una reserva por ID con validaciones
export const actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si hay errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const reservaActualizada = await actualizarReservaService(id, req.body);

    if (!reservaActualizada) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }

    res.json(reservaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la reserva",error: error.message });
  }
};

//  Eliminar una reserva por ID
export const eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reservaEliminada = await eliminarReservaService(id);

    if (!reservaEliminada) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }

    res.json({ mensaje: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la reserva", error: error.message });
  }
};
