import {Router} from 'express';

import {apiKeyValidation} from '../middlewares/apiKeyHeaderMiddleware.js';
import {createCard, activateCard, blockCard, unlockCard, rechargeCard, viewTransactions, paymentPos, paymentOnline} from '../controllers/cardsController.js';

const cardsRouter = Router();

cardsRouter.post('/card/create', apiKeyValidation, createCard);
cardsRouter.post('/card/activate', activateCard);
cardsRouter.post('/card/block', blockCard);
cardsRouter.post('/card/unlock', unlockCard);
cardsRouter.post('/card/recharge', apiKeyValidation, rechargeCard);
cardsRouter.post('/card/view', viewTransactions);
cardsRouter.post('/card/payment/pos', paymentPos);
cardsRouter.post('/card/payment/online', paymentOnline);

export default cardsRouter;