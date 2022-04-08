import { Request, Response, NextFunction } from 'express';
import  UserModel  from '../models/User';

export const registerUser = async (req: Request, res: Response) => {
  console.log(req.body, 'reqqqqqqq');
  try {
    const user = await UserModel.create(req.body);

    res.status(200).json({ data: user, message: 'user created successfully' });
  } catch (error: any) {
    throw new Error(error);
  }
};


export const getAccounts = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({ data: users, message: 'Users fetched successfully' });
  } catch (error: any) {
    throw new Error(error);
  }
};