import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import helmet from "helmet";
import bodyParser from "body-parser";
import path from "path";

import bookRoutes from "./routes/book.js";
import userRoutes from "./routes/user.js";
import { __dirname } from "./utils.js";

const uri = `mongodb+srv://rw_user:${process.env.DB_PASSWORD}@cluster0.xmggk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

await mongoose.connect(uri);

const app = express();

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(helmet({ crossOriginResourcePolicy: false }), bodyParser.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);

// folder for images of the books
app.use("/images", express.static(path.join(__dirname, "images")));

export default app;
