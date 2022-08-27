import mongoose, { Document } from 'mongoose';

export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  lastLoggedInTime: Date;
  refreshToken: string;
}

export type UserDocument = User & Document;

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  lastLoggedInTime: { type: Date, default: Date, required: true },
});
