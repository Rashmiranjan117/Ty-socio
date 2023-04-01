import mongoose, { model, Schema, Document } from "mongoose";

export interface PostInterface extends Document {
  name: string;
  image: string;
  imageId: string;
  comment: string[];
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId;
      ref: "User";
    };
    data: number | string;
  };
  like: number;
}

const postSchema: Schema<PostInterface> = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  imageId: { type: String, required: true },
  comment: {
    type: [String],
    required: true,
    default: [],
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  like: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const PostModel = model<PostInterface>("post", postSchema);
