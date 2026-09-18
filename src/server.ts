import bodyParser from 'body-parser';
import express, {Express} from 'express';
import { loggerMiddleware } from './middleware/logger';

const app: Express = express();
const PORT = process.env.PORT || 3000;
//default middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(loggerMiddleware)
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})