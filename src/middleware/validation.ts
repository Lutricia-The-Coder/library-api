import { Request, Response, NextFunction } from "express";

// Validates the required fields for a book.
export const validateBook = ( req: Request, res: Response,next: NextFunction): void => {
    const { title, authorId, year } = req.body;

    if (!title || !authorId || !year) {
        res.status(400).json({
            message: "Title, authorId and year are required"
        });
        return;
    }

    next();
};