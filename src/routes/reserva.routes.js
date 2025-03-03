import { Router } from "express";
import { obtenerReservas, crearReserva, actualizarReserva,
  eliminarReserva, } from "../controllers/reserva.controller.js";
import { reservaValidator } from "../validations/reserva.validation.js"; // Importamos validaciones
import { validarCampos } from "../middlewares/validarCampos.js"; // Middleware separado
import { param } from "express-validator";


const router = Router();


// Obtener todas las reservas (GET)
router.get("/", obtenerReservas);


// Crear una nueva reserva (POST)
router.post("/", reservaValidator, validarCampos, crearReserva);


// Actualizar una reserva por ID (PUT)
router.put("/:id",  [param("id").isMongoId().withMessage("ID no válido"), ...reservaValidator],  reservaValidator, validarCampos, actualizarReserva);


// Eliminar una reserva por ID (DELETE)
router.delete("/:id",  param("id").isMongoId().withMessage("ID no válido"), eliminarReserva);


export default router;
