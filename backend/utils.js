import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fsPromise from "fs/promises";
import fs from "fs";
import path from "path";

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

export const deleteImage = async (imageUrl) => {
  try {
    const filename = imageUrl.split("/images/")[1];
    const imagePath = path.join(__dirname, "/images/", filename);
    // if the image does not exist, return true
    if (!fs.existsSync(imagePath)) {
      return true;
    }
    await fsPromise.unlink(imagePath);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
