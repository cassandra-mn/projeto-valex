import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(json());
app.use(cors());

const port = +process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});