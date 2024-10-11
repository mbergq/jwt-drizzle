import { Router } from "express";

import createUser from "../controllers/user";
import getUser from "../controllers/getUser";

const router = Router();

router.post("/user", createUser);
router.get("/getuser", getUser);
