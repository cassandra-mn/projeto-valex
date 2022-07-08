import {Router} from 'express';

import {apiKeyValidation} from '../middlewares/apiKeyHeaderMiddleware.js';
import {createCard} from '../controllers/cardsController.js';

const cardsRouter = Router();

cardsRouter.post('/card/creat', apiKeyValidation, createCard);

export default cardsRouter;