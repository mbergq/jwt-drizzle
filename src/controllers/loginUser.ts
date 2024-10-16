import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { user } from "../db/schema";
import { refreshToken } from "../db/schema";
import { db } from "../index.ts";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../../.env" });

const loginUser = async (req: Request, res: Response) => {
  try {
    const { name, password }: { name: string; password: string } = req.body;
    const findUser = await db
      .select()
      .from(user)
      .where(eq(user.userName, name));
    if (findUser.length === 0) {
      res.status(401).json({ error: "User not found" });
    }
    const matchPassword = await Bun.password.verify(
      password,
      findUser[0].password
    );
    if (!matchPassword) {
      res.status(401).json({ error: "Password is not correct" });
    }
    const createAccessToken = jwt.sign(
      { userId: findUser[0].id },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "15m",
      }
    );
    const createRefreshToken = jwt.sign(
      { userId: findUser[0].id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1h" }
    );
    res.cookie("jwt", createAccessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("jwt", createRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Add refreshtoken to database
    await db
      .insert(refreshToken)
      .values({ userId: findUser[0].id, refreshToken: createRefreshToken });
    res.status(200).json({
      user: findUser[0].userName,
      createAccessToken,
      createRefreshToken,
      message: "You are logged in",
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export default loginUser;
