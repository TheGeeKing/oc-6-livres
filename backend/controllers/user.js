import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { comparePassword, hashPassword, isValidEmail } from "../utils.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if credentials are valid
    if (!email || !password || !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "72h" }
    );

    return res.status(200).json({
      userId: user._id,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if credentials are valid
    if (!email || !password || !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: "created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while signing up",
    });
  }
};
