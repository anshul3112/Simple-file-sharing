import mongoose from "mongoose";

const DBConnection = async () => {
    
    const MONGODB_URI = `mongodb+srv://user:filesharingalpha@FILE-SHARING.jmxuom9.mongodb.net/?retryWrites=true&w=majority&appName=FILE-SHARING`;
    try{
        await mongoose.connect(MONGODB_URI, {  useNewUrlParser: true});
        console.log("Database connected successfully");
    }catch(error)
    {
        console.error("Error while connecting database",error.message);
    }
}

export default DBConnection;