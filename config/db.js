import mongoose from "mongoose";
const conectDb= async()=>{
    await mongoose.connect(`mongodb+srv://rishwan:${process.env.MONGO}@test.hriy3.mongodb.net/imit`).then(()=>console.log("MongoDB Connected..."));
}
export default conectDb;