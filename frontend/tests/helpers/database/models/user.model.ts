import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new mongoose.Schema({
  accountId: String,
  firstName: String,
  lastName: String,
  balance: Number,
  password: String,
  name: String,
});

export const User: IUser = mongoose.model("User", UserSchema);
