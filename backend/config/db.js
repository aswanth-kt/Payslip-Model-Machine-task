import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {

    const connectionInstance = await mongoose.connect(uri);
    console.log(`DB connected successfully \n DB host: ${connectionInstance.connection.host}`);
    
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

export default connectDB;