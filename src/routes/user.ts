import { Router } from "express";
import jwt from "jsonwebtoken";
import createUser from "../controllers/createUser";
import loginUser from "../controllers/loginUser";
import verifyToken from "../middleware/protectedMiddleware";

const userRoutes = Router();

userRoutes.post("/createuser", createUser);
userRoutes.post("/loginuser", loginUser);

userRoutes.get("/secret", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

export default userRoutes;
