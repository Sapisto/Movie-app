import mongoose, { Document, Schema } from "mongoose";
import { UserDocument } from "./userModel";

export interface MovieDocument extends Document {
  title: string;
  description: string;
  image: string;
  price: number;
  userId: UserDocument["_id"];
}

const MovieShema = new mongoose.Schema<MovieDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const MovieModel = mongoose.model<MovieDocument>("Movie", MovieShema);
