import { DocumentDefinition, FilterQuery } from 'mongoose';
import UserModel, { UserDocument } from '../models/User';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    const user = await UserModel.create(input);

    return user.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}
