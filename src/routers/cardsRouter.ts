import {Router} from 'express';

import {apiKeyValidation} from '../middlewares/apiKeyHeaderMiddleware.js';
import {createCard, activateCard, blockCard} from '../controllers/cardsController.js';

const cardsRouter = Router();

cardsRouter.post('/card/create', apiKeyValidation, createCard);
cardsRouter.post('/card/activate', activateCard);
cardsRouter.post('/card/block', apiKeyValidation, blockCard);

export default cardsRouter;