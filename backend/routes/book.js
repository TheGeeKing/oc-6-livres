import express from "express";

import auth from "../middleware/auth.js";
import { createBook, getAllBooks } from "../controllers/book.js";

const router = express.Router();

router.get("/", getAllBooks); // Read all books
router.post("/", auth, createBook); // Create a new book

export default router;
