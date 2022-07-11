import {Router} from 'express';

import {apiKeyValidation} from '../middlewares/apiKeyHeaderMiddleware.js';
import {createCard, activateCard, blockCard, unlockCard} from '../controllers/cardsController.js';

const cardsRouter = Router();

cardsRouter.post('/card/create', apiKeyValidation, createCard);
cardsRouter.post('/card/activate', activateCard);
cardsRouter.post('/card/block', blockCard);
cardsRouter.post('/card/unlock', unlockCard);

export default cardsRouter;