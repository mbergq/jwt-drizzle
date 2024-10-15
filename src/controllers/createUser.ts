import { type Request, type Response } from "express";
import { user } from "../db/schema";
import { db } from "../index.ts";

const createUser = async (req: Request, res: Response) => {
  const { name, password }: { name: string; password: string } = req.body;

  try {
    const hashedPassword = await Bun.password.hash(password, "argon2d");
    await db.insert(user).values({ userName: name, password: hashedPassword });
    res.status(201).json({ message: "A new user has been added" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "server_error", message: "Unable to create user" });
  }
};

export default createUser;
