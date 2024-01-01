import mongoose from "mongoose";

export async function connectDatabase(){
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully!")
  } catch (error) {
    console.log("Failed to connect to database, " + error.message);
    throw new Error(error.message);
  }
}