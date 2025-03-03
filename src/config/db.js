import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      
    });
    console.log("✅ Base de datos conectada con éxito");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1); // Finaliza la aplicación si hay error
  }
};

export default conectarDB;
