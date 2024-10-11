import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { user } from "../db/schema.ts";
import { db } from "../index.ts";

const createUser = async (req: Request, res: Response) => {
  const { name, password }: { name: string; password: string } = req.body;
};

export default createUser;
