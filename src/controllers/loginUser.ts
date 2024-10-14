import { eq } from "drizzle-orm";
import { user } from "../db/schema";
import { db } from "../index.ts";
import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { name, password }: { name: string; password: string } = req.body;
    const findUser = await db.select().from(user).where(eq(user.name, name));
    if (!findUser) {
      res.status(401).json({ error: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, findUser[0].password);
    if (!matchPassword) {
      res.status(401).json({ error: "Password is not correct" });
    }
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      message: "You are logged in",
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export default loginUser;
