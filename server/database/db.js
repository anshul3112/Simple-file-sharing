import mongoose from "mongoose";

const DBConnection = async () => {     
    try{
        await mongoose.connect(process.env.MONGO_DB_URI, {  useNewUrlParser: true});
        console.log("Database connected successfully");
    }catch(error)
    {
        console.error("Error while connecting database",error.message);
    }
}

export default DBConnection;