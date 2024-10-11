import { type Request, type Response } from "express";
import { user } from "../db/schema";
import { db } from "../index.ts";

const getUser = async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(user);

    return res.status(200).json({ length: allUsers.length, data: allUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "server_error", message: "Internal server error" });
  }
};

export default getUser;
