import mongoose, { Schema } from "mongoose";

// Define the car schema
const CarSchema = new Schema({
          model: {
                    type: String,
                    required: true,
                    minlength: 3,
          },
          price: {
                    type: Number,
                    required: true,
          },
          phoneNumber: {
                    type: Number,
                    required: true,
                    match: [/^\d{11}$/, "It should be exactly 11 digits."],
          },
          maxNumberOfCopies: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 10,
          },
          city: {
                    type: String,
                    required: true,
                    enum: ["Lahore", "Karachi"],
          },
          user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
          },
          images: [
               {
                 public_id: {
                   type: String,
                   required: true,
                 },
                 url: {
                   type: String,
                   required: true,
                 },
               },
             ],
});

// Create and export the Car model
const carModel = mongoose.models.Car_Form || mongoose.model("Car_Form", CarSchema);

export default carModel;
