import { Request, Response, NextFunction } from "express";

// Logs the HTTP method and URL of each request.
export const logger = (req: Request,_res: Response, next: NextFunction): void => {
  console.log(`${req.method} ${req.url}`);
  next();
};