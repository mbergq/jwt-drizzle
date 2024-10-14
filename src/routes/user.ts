import { Router } from "express";

import createUser from "../controllers/createUser";
import getUser from "../controllers/getUser";
import loginUser from "../controllers/loginUser";

const userRoute = Router();

userRoute.post("/createuser", createUser);
userRoute.get("/getuser", getUser);
userRoute.post("/loginuser", loginUser);

export default userRoute;
