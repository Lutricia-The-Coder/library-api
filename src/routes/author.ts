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

// Get an author by ID.
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const author = authors.find((author) => author.id === id);

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  res.status(200).json(author);
});

// Update an author.
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const author = authors.find((author) => author.id === id);

  if (!author) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  const { name } = req.body;

  author.name = name;

  res.status(200).json(author);
});

// Delete an author.
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = authors.findIndex((author) => author.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Author not found",
    });
  }

  const deletedAuthor = authors.splice(index, 1)[0];

  res.status(200).json(deletedAuthor);
});

export default router;