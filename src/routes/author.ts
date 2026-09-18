import { Router, Request, Response } from "express";
import { authors, Author } from "../models/model";

const router = Router();

// Create a new author.
router.post("/", (req: Request, res: Response) => {
  const { name } = req.body;

  const author: Author = {
    id: authors.length + 1,
    name,
    dateAdded: new Date().toISOString(),
  };

  authors.push(author);

  res.status(201).json(author);
});

// Get all authors.
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json(authors);
});
