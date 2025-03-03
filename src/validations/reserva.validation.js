import { body } from "express-validator";
import Joi from "joi";

// Validaciones con express-validator (para las rutas)
export const reservaValidator = [
  body("nombreCliente").notEmpty().withMessage("El nombre del cliente es obligatorio"),
  body("email").isEmail().withMessage("Debe ser un email válido"),
  body("telefono")
    .matches(/^\d{9,}$/)
    .withMessage("Debe ser un teléfono válido con mínimo 9 dígitos"),
  body("fecha").isISO8601().withMessage("Debe ser una fecha válida"),
  body("hora")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Debe ser una hora válida en formato HH:mm"),
  body("personas").isInt({ min: 1 }).withMessage("Debe haber al menos 1 persona"),
  body("mesa").optional().isString(),
  body("comentarios").optional().isString(),
  body("servicio").notEmpty().withMessage("El servicio es obligatorio"),
  body("estado")
    .optional()
    .isIn(["pendiente", "confirmado", "cancelado"])
    .withMessage("Estado inválido"),
];

// Validaciones con Joi (para los servicios antes de guardar en BD)
export const reservaSchema = Joi.object({
  nombreCliente: Joi.string().required(),
  email: Joi.string().email().required(), //  Asegura que email sea válido
  telefono: Joi.string().pattern(/^\d{9,}$/).required(), // Mínimo 9 dígitos
  fecha: Joi.date().min(new Date().toISOString().split("T")[0]).required(), // Permite reservas desde hoy
  hora: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(), //  Formato HH:mm
  personas: Joi.number().min(1).required(), //  Mínimo 1 persona
  mesa: Joi.string().optional(), //  Opcional
  comentarios: Joi.string().optional(), //  Opcional
  servicio: Joi.string().required(), //  Obligatorio
  estado: Joi.string().valid("pendiente", "confirmado", "cancelado").default("pendiente"),
});
