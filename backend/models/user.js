import mongoose from "mongoose";
import { uniqueValidator } from "mongoose-unique-validator";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex, "Invalid email format"], // Email format validation
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);
