import {Request, Response} from 'express';

import * as createCardService from '../services/createCardService.js';
import * as activateCardService from '../services/activateCardService.js';
import * as blockCardService from '../services/blockCardService.js';
import * as unlockCardService from '../services/unlockCardService.js';
import * as rechargeCardService from '../services/rechargeCardService.js';
import * as paymentService from '../services/paymentService.js';

export async function createCard(req: Request, res: Response) {
    const {type, id}: {type: any, id: number} = req.body;
    const response = await createCardService.createCard(type, id);
    res.status(201).send(response);
}

export async function activateCard(req: Request, res: Response) {
    const {id, cvc, password}: {id: number, cvc: string, password: string} = req.body;
    const response = await activateCardService.activateCard(id, cvc, password);
    res.status(200).send(response);
}

export async function blockCard(req: Request, res: Response) {
    const {id, password}: {id: number, password: string} = req.body;
    const response = await blockCardService.blockCard(id, password);
    res.status(200).send(response);
}

export async function unlockCard(req: Request, res: Response) {
    const {id, password}: {id: number, password: string} = req.body;
    const response = await unlockCardService.unlockCard(id, password);
    res.status(200).send(response);
}

export async function rechargeCard(req: Request, res: Response) {
    const {id, amount}: {id: number, amount: number} = req.body;
    const response = await rechargeCardService.rechargeCard(id, amount);
    res.status(200).send(response);
}

export async function payment(req: Request, res: Response) {
    const {cardId, password, businessId, amount}: {cardId: number, password: string, businessId: number, amount: number} = req.body;
    const response = await paymentService.payment(cardId, password, businessId, amount);
    res.status(200).send(response);
}