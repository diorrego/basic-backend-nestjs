import { Document } from 'mongoose';

export interface ProductI extends Document {
  _id: string;
  tittle: string;
  description: string;
  price: number;
  createdAt?: Date;
}
