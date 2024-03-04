import mongoose from "mongoose"

const connectToMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected To DB");

    }catch(error){
        console.log("Error connection to DB",error.message);
    }
}

export default connectToMongoDB