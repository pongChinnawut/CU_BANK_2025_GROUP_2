import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};

export const mongoUrl = "mongodb+srv://chinnawutkpong_db_user:HYK71Rx1ySuphpuS@cubankclustertest.s9bsp9r.mongodb.net/?appName=CUBankClusterTest";
