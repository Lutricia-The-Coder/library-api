import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { loggerMiddleware } from './middleware/logger';
import authorRoutes from './routes/author';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Default middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Author routes
app.use("/authors", authorRoutes);

// Starts the Express server.
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});