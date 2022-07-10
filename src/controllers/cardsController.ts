import {Request, Response} from 'express';

import * as createCardService from '../services/createCardService.js';
import * as activateCardService from '../services/activateCardService.js';

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