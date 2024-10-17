import * as dotenv from "dotenv";
import { type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "../index.ts";
import { user } from "../db/schema";

dotenv.config({ path: "../../.env" });

const refreshAccessToken = async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken;
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    const findUser = await db
      .select()
      .from(user)
      //@ts-expect-error missing
      .where(eq(user.id, decodedToken.userId));

    if (!findUser) {
      return res.status(401).json({ message: "Refresh token is incorrect" });
    }

    const accessToken = jwt.sign(
      { userId: findUser[0].id },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      { userId: findUser[0].id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        accessToken,
        refreshToken,
        message: "Access token refreshed",
      });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default refreshAccessToken;
