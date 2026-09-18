import { Router, Request, Response } from "express";
import { books, Book } from "../models/book_model";
import { authors } from "../models/author_model";
import { validateBook } from "../middleware/validation";

const router = Router();

// Create a new book.
router.post("/", validateBook, (req: Request, res: Response) => {
    const { title, authorId, year } = req.body;
    const author = authors.find((author) => author.id === Number(authorId));

    if (!author) {
        res.status(400).json({ message: "Author does not exist"});
        return;
    }

    const book: Book = {
        id: books.length + 1,
        title,
        authorId: Number(authorId),
        year,
        dateAdded: new Date().toISOString()
    };

    books.push(book);
    res.status(201).json(book);
});

// Get all books.
router.get("/", (_req: Request, res: Response) => {
    res.status(200).json(books);
});

// Get a book by ID.
router.get("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const book = books.find((book) => book.id === id);

    if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
    }

    res.status(200).json(book);
});

// Update a book.
router.put("/:id", validateBook, (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const book = books.find((book) => book.id === id);

    if (!book) {
        res.status(404).json({ message: "Book not found"});
        return;
    }

    const { title, authorId, year } = req.body;
    const author = authors.find((author) => author.id === Number(authorId));

    if (!author) {
        res.status(400).json({ message: "Author does not exist" });
        return;
    }

    book.title = title;
    book.authorId = Number(authorId);
    book.year = year;
    res.status(200).json(book);
});

// Delete a book.
router.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
        res.status(404).json({  message: "Book not found" });
        return;
    }
    const deletedBook = books.splice(index, 1)[0];
    res.status(200).json(deletedBook);
});

export default router;