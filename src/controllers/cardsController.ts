import {Request, Response} from 'express';

import * as createCardService from '../services/createCardService.js';
import * as activateCardService from '../services/activateCardService.js';
import * as blockCardService from '../services/blockCardService.js';
import * as unlockCardService from '../services/unlockCardService.js';
import * as rechargeCardService from '../services/rechargeCardService.js';
import * as viewTransactionsService from '../services/viewTransactionsService.js';
import * as paymentPosService from '../services/paymentPosService.js';
import * as paymentOnlineService from '../services/paymentOnlineSerice.js';

export interface CardInformation {
    number: string;
    cardholderName: string;
    securityCode: string;
    expirationDate: string;
}

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

export async function viewTransactions(req: Request, res: Response) {
    const {id}: {id: number} = req.body;
    const response = await viewTransactionsService.viewTransactions(id);
    res.status(200).send(response);
}

export async function paymentPos(req: Request, res: Response) {
    const {cardId, password, businessId, amount}: {cardId: number, password: string, businessId: number, amount: number} = req.body;
    const response = await paymentPosService.paymentPos(cardId, password, businessId, amount);
    res.status(200).send(response);
}

export async function paymentOnline(req: Request, res: Response) {
    const {card, businessId, amount}: {card: CardInformation, businessId: number, amount: number} = req.body;
    const response = await paymentOnlineService.paymentOnline(card, businessId, amount);
    res.status(200).send(response);
}