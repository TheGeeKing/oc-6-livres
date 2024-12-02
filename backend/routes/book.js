import express from "express";

import auth from "../middleware/auth.js";
import {
  createBook,
  getAllBooks,
  getBestRatedBooks,
  getBook,
  deleteBook,
  addRating,
} from "../controllers/book.js";
import multer from "../middleware/multer.js";
import sharp from "../middleware/sharp.js";

const router = express.Router();

router.get("/", getAllBooks); // Get all books
router.get("/bestrating", getBestRatedBooks); // Get the 3 best rated books
router.get("/:id", getBook); // Get a book
router.post("/:id/rating", auth, addRating); // Add rating to a book
router.post("/", auth, multer, sharp, createBook); // Create a new book
router.delete("/:id", auth, deleteBook); // Delete a book

export default router;
