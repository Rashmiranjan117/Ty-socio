import mongoose, { model, Schema, Document } from "mongoose";

interface LinkInterface extends Document {
  image: string;
  userId: string;
  comment?: string[];
  description: string;
  like: number;
}

const postSchema: Schema<LinkInterface> = new Schema({
  image: { required: true, type: String },
  userId: { required: true, type: String },
  comment: {
    type: [String],
    default: [],
  },
  like: {
    required: true,
    type: Number,
    default: 0,
  },
  description: String,
});

export const PostModel = model<LinkInterface>("link", postSchema);
