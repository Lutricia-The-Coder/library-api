import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

// Handles all application errors in one place.
export const errorHandler = ( err: AppError, _req: Request, res: Response, _next: NextFunction
): void => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal server error"
    });
};