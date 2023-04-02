import mongoose, { model, Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  credentials: string | number;
  password: string;
}

const authSchema: Schema<UserInterface> = new Schema({
  credentials: { type: String || Number, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<UserInterface>("user", authSchema);
