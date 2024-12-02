import sharp from "sharp";
import path from "path";
import fs from "fs";

import { __dirname } from "../utils.js";

const processImage = async (req, res, next) => {
  try {
    if (!req.file) {
      req.processedImageUrl = req.body.imageUrl;
      return next();
    }

    const { buffer, originalname: originalFileName } = req.file;

    const timestamp = new Date().valueOf();
    const filename = `${timestamp}-${path.parse(originalFileName).name}.webp`;
    const folderPath = path.join(__dirname, "/images/");
    const filePath = path.join(folderPath, filename);

    const processedBuffer = await sharp(buffer)
      .webp({ quality: 75 })
      .toBuffer();

    // create folder images if it does not exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    await sharp(processedBuffer).toFile(filePath);

    const processedImageUrl = `${req.protocol}://${req.get(
      "host"
    )}/images/${filename}`;
    req.processedImageUrl = processedImageUrl;

    next();
  } catch (error) {
    res
      .status(400)
      .json({ error: "An error occurred while processing the image" });
  }
};

export default processImage;
