import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB=async()=>{
    try{
        const mongoURL=process.env.MONGO_URI
        await mongoose.connect(mongoURL)
        console.log("mongo connected")
    }
    catch(err){
        console.log("error connect",err.message)
        process.exit(1)
    }
}