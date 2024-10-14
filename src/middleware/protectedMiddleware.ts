import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.body.userId = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
