import { Router } from "express";

import createUser from "../controllers/createUser";
import getUser from "../controllers/getUser";

const router = Router();

router.post("/createuser", createUser);
router.get("/getuser", getUser);
