import mongoose, { Schema } from 'mongoose';

// Define the user schema
const UserSchema = new Schema({
     email: {
          type: String,
          required: true,
          unique: true,
     },
     password: {
          type: String,
          required: true,
     }
});

// Create and export the User model
const userModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default userModel;
