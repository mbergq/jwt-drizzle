import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "Access denied" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    req.body.userId = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
