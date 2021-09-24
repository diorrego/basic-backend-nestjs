import { Document } from 'mongoose';

export interface UserI extends Document {
  _id: string;
  username: string;
  password: string;
  createdAt?: Date;
}
