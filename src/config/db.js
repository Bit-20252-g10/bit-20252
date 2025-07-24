import mongoose  from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_URI,)
        console.log("MongoDB conectado satisfactoriamente");
    } catch (error) {
        console.log("MongoDB atlas connection failed | Error:", error);
    }

}

export default connectDB;