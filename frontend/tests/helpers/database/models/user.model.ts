import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  accountId: String,
  firstName: String,
  lastName: String,
  balance: Number,
  password: String,
  name: String,
});

export const User = mongoose.model("User", UserSchema);
