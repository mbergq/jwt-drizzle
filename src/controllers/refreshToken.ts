import * as dotenv from "dotenv";
import { type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "../index.ts";
import { user } from "../db/schema";

dotenv.config({ path: "../../.env" });

const refreshAccessToken = async (req: Request, res: Response) => {
  const incomingRefreshToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyOTA2MDM1MiwiZXhwIjoxNzI5MDYzOTUyfQ.hzeMtRfwIU24IPejDnLUABUbreN7EMve5CO-uDhKMyU";
  // req.cookies.createRefreshToken || req.body.createRefreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decodeToken = () => {
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      );

      return {
        //@ts-expect-error missing
        userId: decodedToken.userId as string,
      };
    };
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    const findUser = await db
      .select()
      .from(user)
      .where(eq(user.id, decodedToken.userId));

    if (!findUser) {
      return res.status(401).json({ message: "Refresh token is incorrect" });
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

    return res
      .status(200)
      .cookie("jwt", createAccessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("jwt", createRefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        createAccessToken,
        createRefreshToken,
        message: "Access token refreshed",
      });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default refreshAccessToken;
