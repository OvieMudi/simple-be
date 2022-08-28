import mongoose, { Document } from 'mongoose';

class User {
  id: string;
  username: string;
  password: string;
  email: string;
  lastLoggedInTime: Date;
  refreshToken: string;
}

type UserDocument = User & Document;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  lastLoggedInTime: { type: Date, default: Date, required: true },
});

UserSchema.set('toObject', { virtuals: true });

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (_, doc: UserDocument) {
    delete doc._id;
    delete doc.__v;
    delete doc.password;
    delete doc.refreshToken;
  },
});

export { User, UserDocument, UserSchema };
