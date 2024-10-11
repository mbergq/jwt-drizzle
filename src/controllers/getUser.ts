import { type Request, type Response } from "express";

const getUser = async (req: Request, res: Response) => {
  // const { userId } = req.params;
  return res.status(201).json({
    message: "Get request was succesful",
  });
};

export default getUser;
