# Library REST API

A RESTful Library API built with **Node.js, Express, and TypeScript**.

The API manages two resources:

* **Authors**
* **Books**

Each book belongs to an author using an `authorId` relationship.

## Technologies

* Node.js
* Express.js
* TypeScript
* In-memory arrays for data storage
* Postman for API testing

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

Replace `<repository-url>` with the URL of your Git repository and `<project-folder>` with the name of the project folder.

### 2. Install dependencies

Install the project dependencies:

```bash
npm install
```

### 3. Install TypeScript development dependencies

If the dependencies have not already been installed, run:

```bash
npm install -D typescript ts-node-dev @types/node @types/express
```

### 4. Start the development server

Run the application using:

```bash
npm run dev
```

The API should start on:

```text
http://localhost:3000
```

### 5. Test the API

You can test the API using **Postman**.

For example:

```text
GET http://localhost:3000/authors
```

or:

```text
GET http://localhost:3000/books
```

## Project Structure

```text
src/
├── errors/
│   └── AppError.ts
│
├── middleware/
│   ├── errorHandler.ts
│   ├── logger.ts
│   └── validation.ts
│
├── models/
│   ├── author_model.ts
│   └── book_model.ts
│
├── routes/
│   ├── author.routes.ts
│   └── book.routes.ts
│
└── app.ts
```

## API Endpoints

### Authors

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | `/authors`           | Create a new author                |
| GET    | `/authors`           | Get all authors                    |
| GET    | `/authors/:id`       | Get an author by ID                |
| PUT    | `/authors/:id`       | Update an author                   |
| DELETE | `/authors/:id`       | Delete an author                   |
| GET    | `/authors/:id/books` | Get all books written by an author |

### Books

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/books`     | Create a new book |
| GET    | `/books`     | Get all books     |
| GET    | `/books/:id` | Get a book by ID  |
| PUT    | `/books/:id` | Update a book     |
| DELETE | `/books/:id` | Delete a book     |

## Author API

### Create an Author

**POST**

```text
/authors
```

Request body:

```json
{
  "name": "Lutricia Ngomane"
}
```

Example response:

```json
{
  "id": 1,
  "name": "Lutricia Ngomane",
  "dateAdded": "2026-09-18T10:00:00.000Z"
}
```

Status code:

```text
201 Created
```

### Get All Authors

**GET**

```text
/authors
```

Example response:

```json
[
  {
    "id": 1,
    "name": "Lutricia Ngomane",
    "dateAdded": "2026-09-18T10:00:00.000Z"
  }
]
```

Status code:

```text
200 OK
```

### Get Author by ID

**GET**

```text
/authors/1
```

Example response:

```json
{
  "id": 1,
  "name": "Lutricia Ngomane",
  "dateAdded": "2026-09-18T10:00:00.000Z"
}
```

Status code:

```text
200 OK
```

If the author does not exist:

```json
{
  "message": "Author not found"
}
```

Status code:

```text
404 Not Found
```

### Update an Author

**PUT**

```text
/authors/1
```

Request body:

```json
{
  "name": "Lutricia Ngomane Updated"
}
```

Status code:

```text
200 OK
```

### Delete an Author

**DELETE**

```text
/authors/1
```

Status code:

```text
204 No Content
```

### Get Books by Author

**GET**

```text
/authors/1/books
```

Example response:

```json
[
  {
    "id": 1,
    "title": "1984",
    "authorId": 1,
    "year": 1949,
    "dateAdded": "2026-09-18T10:00:00.000Z"
  }
]
```

Status code:

```text
200 OK
```

## Book API

### Create a Book

**POST**

```text
/books
```

Request body:

```json
{
  "title": "1984",
  "authorId": 1,
  "year": 1949
}
```

Example response:

```json
{
  "id": 1,
  "title": "1984",
  "authorId": 1,
  "year": 1949,
  "dateAdded": "2026-09-18T10:00:00.000Z"
}
```

Status code:

```text
201 Created
```

The `authorId` must belong to an existing author.

If the author does not exist:

```json
{
  "message": "Author does not exist"
}
```

Status code:

```text
400 Bad Request
```

### Get All Books

**GET**

```text
/books
```

Status code:

```text
200 OK
```

### Book Filtering, Searching, Sorting and Pagination

Search by title:

```text
GET /books?search=1984
```

Filter by year:

```text
GET /books?year=1949
```

Sort by title:

```text
GET /books?sort=title
```

Sort by year:

```text
GET /books?sort=year
```

Pagination:

```text
GET /books?page=1&limit=2
```

Combined query:

```text
GET /books?search=1984&year=1949&sort=title&page=1&limit=2
```

### Get Book by ID

**GET**

```text
/books/1
```

If the book does not exist:

```json
{
  "message": "Book not found"
}
```

Status code:

```text
404 Not Found
```

### Update a Book

**PUT**

```text
/books/1
```

Request body:

```json
{
  "title": "Animal Farm",
  "authorId": 1,
  "year": 1945
}
```

Status code:

```text
200 OK
```

The `dateAdded` value remains unchanged when a book is updated.

### Delete a Book

**DELETE**

```text
/books/1
```

Status code:

```text
204 No Content
```

## Validation

Book creation and updates require:

* `title`
* `authorId`
* `year`

Example invalid request:

```json
{
  "title": "1984"
}
```

Response:

```json
{
  "message": "Title, authorId and year are required"
}
```

Status code:

```text
400 Bad Request
```

## Error Handling

The API uses centralized error handling.

| Status Code | Meaning                           |
| ----------- | --------------------------------- |
| `200`       | Request successful                |
| `201`       | Resource created                  |
| `204`       | Resource deleted successfully     |
| `400`       | Invalid request or invalid author |
| `404`       | Resource not found                |
| `409`       | Duplicate book                    |
| `500`       | Internal server error             |

### Duplicate Book

A book with the same title and author cannot be added twice.

Response:

```json
{
  "message": "Book already exists"
}
```

Status code:

```text
409 Conflict
```

## Middleware

### Logger Middleware

The logger records the HTTP method and URL for every request.

Example:

```text
GET /books
POST /authors
PUT /books/1
DELETE /authors/1
```

### Validation Middleware

The validation middleware checks that required book fields are provided before the request reaches the book route.

## Data Storage

The project uses **in-memory arrays** to store authors and books.

Data will be lost when the server is restarted.

No external database is required.

## Testing with Postman

The API can be tested using Postman.

### Author Tests

```text
POST   /authors
GET    /authors
GET    /authors/1
PUT    /authors/1
DELETE /authors/1
GET    /authors/1/books
```

### Book Tests

```text
POST   /books
GET    /books
GET    /books/1
PUT    /books/1
DELETE /books/1
```

### Error Tests

Test the following cases:

1. Create a book without required fields.
2. Create a book using an invalid `authorId`.
3. Request an author that does not exist.
4. Request a book that does not exist.
5. Create a duplicate book.
6. Update a book that does not exist.
7. Delete a book that does not exist.

## Project Features

* RESTful API
* TypeScript
* Express.js
* Author CRUD operations
* Book CRUD operations
* Author-book relationship
* Request logging
* Input validation
* Centralized error handling
* `400 Bad Request` handling
* `404 Not Found` handling
* `409 Conflict` handling
* Book searching
* Book filtering by year
* Book sorting
* Book pagination
* In-memory data storage
* Postman testing

