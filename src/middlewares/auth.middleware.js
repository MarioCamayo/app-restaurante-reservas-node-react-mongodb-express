import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Acceso denegado, no hay token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token no válido" });
  }
};
