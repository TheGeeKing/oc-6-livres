import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { emailRegex } from "../utils.js";

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
