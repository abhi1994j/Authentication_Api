import mongoose from "mongoose";
import { log } from "../logger/logger.js";


// || "mongodb://localhost:27017"
// log(process.env.mongoDB_URL);
const connectToDatabase = async () => {
  try {
    const mongoDB_URL = process.env.mongoDB_URL // always process env before dotenv.config
    await mongoose.connect(mongoDB_URL);
    // log(mongoDB_URL)
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
  // finally{
  //   await mongoose.connection.close();
  //   log("Mongoose connection closed successfully")
  // }
}

export { connectToDatabase };
