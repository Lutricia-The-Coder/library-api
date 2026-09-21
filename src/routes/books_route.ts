import { Router, Request, Response, NextFunction } from "express";
import { books, Book } from "../models/book_model";
import { authors } from "../models/author_model";
import { validateBook } from "../middleware/validation";
import { AppError } from "../errors/appError";

const router = Router();

// Create a new book.
router.post(
    "/",
    validateBook,
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, authorId, year } = req.body;

            // Check if the author exists.
            const author = authors.find(
                (author) => author.id === Number(authorId)
            );

            if (!author) {
                throw new AppError("Author does not exist", 400);
            }

            // Check if the book already exists.
            const duplicateBook = books.find(
                (book) =>
                    book.title.toLowerCase() === title.toLowerCase() &&
                    book.authorId === Number(authorId)
            );

            if (duplicateBook) {
                throw new AppError("Book already exists", 409);
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
        } catch (error) {
            next(error);
        }
    }
);

// Get all books.
// Get all books with optional filtering, searching, sorting and pagination.
router.get("/", (req: Request, res: Response) => {
    const { year, search, sort, page, limit } = req.query;
    let result = [...books];

    // Filter books by year.
 if(year !== undefined) {
    const yearValue=Number(year);

    if(!Number.isInteger(yearValue) || yearValue<=0){
        throw new AppError("Year must be a valid positive number", 400)
    }
    result=result.filter((book) =>book.year === yearValue)
 }

    // Search books by title.
if(search !== undefined){
    if(typeof search !== "string" || search.trim() ===""){
        throw new AppError("Search must be a non empty string", 400)
    }
    result=result.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
}

    // Sort books by title or year.
    if (sort === "title") {
        result.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "year") {
        result.sort((a, b) => a.year - b.year);
    }

    // Pagination.
    const currentPage = Number(page) || 1;
    const itemsPerPage = Number(limit) || result.length;
    const startIndex = (currentPage - 1) * itemsPerPage;

    result = result.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    res.status(200).json(result);
});
// Get a book by ID.
router.get(
    "/:id",
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            const book = books.find((book) => book.id === id);

            if (!book) {
                throw new AppError("Book not found", 404);
            }

            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }
);

// Update a book.
router.put(
    "/:id",
    validateBook,
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            const book = books.find((book) => book.id === id);

            if (!book) {
                throw new AppError("Book not found", 404);
            }

            const { title, authorId, year } = req.body;

            // Check if the new author exists.
            const author = authors.find(
                (author) => author.id === Number(authorId)
            );

            if (!author) {
                throw new AppError("Author does not exist", 400);
            }

            // Check for another book with the same title and author.
            const duplicateBook = books.find(
                (existingBook) =>
                    existingBook.id !== id &&
                    existingBook.title.toLowerCase() === title.toLowerCase() &&
                    existingBook.authorId === Number(authorId)
            );

            if (duplicateBook) {
                throw new AppError("Book already exists", 409);
            }

            book.title = title;
            book.authorId = Number(authorId);
            book.year = year;

            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }
);

// Delete a book.
router.delete(
    "/:id",
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            const index = books.findIndex((book) => book.id === id);

            if (index === -1) {
                throw new AppError("Book not found", 404);
            }

            const deletedBook = books.splice(index, 1)[0];

            res.status(200).json(deletedBook);
        } catch (error) {
            next(error);
        }
    }
);

export default router;