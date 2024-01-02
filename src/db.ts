import mongoose from "mongoose";
import { debug } from "./helpers/debugger";

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL);
    debug("Database connected successfully!");
  } catch (error) {
    debug(`Failed to connect to database, ${error.message}`);
    throw new Error(error.message);
  }
}
