import express from "express";

import auth from "../middleware/auth.js";
import { createBook, getAllBooks, getBook } from "../controllers/book.js";
import multer from "../middleware/multer.js";
import sharp from "../middleware/sharp.js";

const router = express.Router();

router.get("/", getAllBooks); // Read all books
router.get("/:id", getBook); // Read a book
router.post("/", auth, multer, sharp, createBook); // Create a new book.

export default router;
