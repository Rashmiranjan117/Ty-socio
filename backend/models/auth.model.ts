import mongoose, { model, Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  email?: string;
  phoneNumber?: number;
  password: string;
}

const authSchema: Schema<UserInterface> = new Schema({
  email: { type: String, unique: true, sparse: true },
  phoneNumber: { type: Number, unique: true, sparse: true },
  password: { type: String, required: true },
});

export const UserModel = model<UserInterface>("user", authSchema);
