/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.users;
    const result = await userServices.createUserIntoDb(user);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to created user",
      error: err.message,
    });
  }
};

export const userControllers = {
  createUser,
};
