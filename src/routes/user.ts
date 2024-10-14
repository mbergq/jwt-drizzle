import { Router } from "express";

import createUser from "../controllers/createUser";
import loginUser from "../controllers/loginUser";

const userRoutes = Router();

userRoutes.post("/createuser", createUser);
userRoutes.post("/loginuser", loginUser);

export default userRoutes;
