import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const isValidEmail = (email) => emailRegex.test(email);

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
