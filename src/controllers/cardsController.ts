import {Request, Response} from 'express';

import * as cardsService from '../services/cardsService.js';

export async function createCard(req: Request, res: Response) {
    const {type, id}: {type: any, id: number} = req.body;
    const response = await cardsService.createCard(type, id);
    res.status(201).send(response);
}