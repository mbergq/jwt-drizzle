import { type Request, type Response } from "express";
import { user } from "../db/schema.ts";
import { db } from "../index.ts";

const createUser = async (req: Request, res: Response) => {
  const { name, password }: { name: string; password: string } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "validation_error", message: "Name is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Password is required" });
  }

  try {
    await db.insert(user).values({ name: name, password: password });
    return res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    console.log("Error while creating a user", error);
    return res
      .status(500)
      .json({ error: "server_error", message: "Unable to create user" });
  }
};

export default createUser;
