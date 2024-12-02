import Book from "../models/book.js";

export const getAllBooks = async (_, res) => {
  try {
    res.status(200).json(await Book.find());
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving all books",
    });
  }
};

export const createBook = async (req, res, _) => {
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
