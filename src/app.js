import express from "express";
import cors from "cors";
import reservaRoutes from "./routes/reserva.routes.js";
import conectarDB from "./config/db.js";
import morgan from "morgan";


const app = express();

// Conectar a la base de datos
conectarDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Rutas
app.use("/api/reservas", reservaRoutes);

export default app; // Exportamos la instancia de Express
