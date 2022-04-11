import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User';



export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({ data: users, message: 'Users fetched successfully' });
  } catch (error: any) {
    return res.status(400).json({message : error.message})
  }
};

