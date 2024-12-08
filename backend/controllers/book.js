import Book from "../models/book.js";
import { deleteImage } from "../utils.js";

export const getAllBooks = async (_, res) => {
  try {
    res.status(200).json(await Book.find());
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving all books",
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the book" });
  }
};

export const getBestRatedBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ averageRating: -1 }).limit(3);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving the best rated books",
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const { _id, _userId, ...bookData } = JSON.parse(req.body.book);
    const book = new Book({
      ...bookData,
      userId: req.auth.userId,
      imageUrl: req.processedImageUrl,
    });
    await book.save();
    res.status(201).json({ message: "added" });
  } catch (error) {
    //TODO: better handle db issue (500) or validation issue (400)
    res.status(400).json({ error });
  }
};

export const addRating = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.ratings.find((rating) => rating.userId === req.auth.userId)) {
      return res.status(400).json({ error: "Rating already added" });
    }
    book.ratings.push({
      userId: req.auth.userId,
      grade: req.body.rating,
    });
    book.averageRating =
      book.ratings.reduce((acc, rating) => acc + rating.grade, 0) /
      book.ratings.length;

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the rating" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (book.userId !== req.auth.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const successfullyDeletedImage = await deleteImage(book.imageUrl);
    if (!successfullyDeletedImage) {
      return res.status(500).json({
        error: "An error occurred while deleting the book image",
      });
    }
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (book.userId !== req.auth.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!req.file) {
      await Book.findByIdAndUpdate(req.params.id, {
        ...req.body,
      });
      return res.status(200).json({ message: "updated" });
    }

    // if there is an image, we delete the old image
    const successfullyDeletedImage = await deleteImage(book.imageUrl);
    if (!successfullyDeletedImage) {
      return res.status(500).json({
        error: "An error occurred while deleting the previous book image",
      });
    }

    if (!req.body.book) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const { book: bookFromUser } = req.body;

    await Book.findByIdAndUpdate(req.params.id, {
      ...JSON.parse(bookFromUser),
      imageUrl: req.processedImageUrl,
    });

    res.status(200).json({ message: "updated" });
  } catch (error) {
    if (req.file) {
      await deleteImage(req.processedImageUrl);
    }
    res
      .status(500)
      .json({ error: "An error occurred while updating the book" });
  }
};
