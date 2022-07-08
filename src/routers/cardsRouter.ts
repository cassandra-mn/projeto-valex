import {Router} from 'express';

import {createCard} from '../controllers/cardsController.js';

const cardsRouter = Router();

cardsRouter.post('/card/creat', createCard);

export default cardsRouter;