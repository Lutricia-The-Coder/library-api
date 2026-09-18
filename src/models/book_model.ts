// Represents a book in the library system.
export interface Book {
    id: number;
    title: string;
    authorId: number;
    year: number;
    dateAdded: string;
}

// In-memory array used to store books.
export const books: Book[] = [];