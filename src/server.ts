import bodyParser from 'body-parser';
import express, {Express} from 'express';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(bodyParser.json())
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})