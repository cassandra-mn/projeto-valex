import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'express-async-errors';

import router from './routers/index.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';

const app = express();
dotenv.config();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});