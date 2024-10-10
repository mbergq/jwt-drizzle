import { type Request, type Response } from "express";

const createUser = async (req: Request, res: Response) => {
  const { name, password }: { name: string; password: string } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Name is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Password is required" });
  }

  return res;
};

export default createUser;
