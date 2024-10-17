import { Router } from "express";
import createUser from "../controllers/createUser";
import loginUser from "../controllers/loginUser";
import verifyToken from "../middleware/protectedMiddleware";
import refreshAccessToken from "../controllers/refreshToken";

const userRoutes = Router();

userRoutes.post("/createuser", createUser);
userRoutes.post("/loginuser", loginUser);

userRoutes.get("/secret", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

userRoutes.post("/refresh-token", refreshAccessToken);

export default userRoutes;
