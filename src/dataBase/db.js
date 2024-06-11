import mongoose from "mongoose";

export const db = async () => {
     try {
          await mongoose.connect(process.env.MONGODB_URI).then(() => {
               console.log("Conntected succssfully to mongoDB");
          });
     } catch (error) {
          console.log(error.message);
     }
}