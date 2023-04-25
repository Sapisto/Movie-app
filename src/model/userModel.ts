import mongoose, { Document } from "mongoose";
import { MovieDocument } from "./movieModel";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  movies: MovieDocument[];
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
