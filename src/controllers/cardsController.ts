import {Request, Response} from 'express';

import * as cardsService from '../services/cardsService.js';

export async function createCard(req: Request, res: Response) {
    const {type, id}: {type: string, id: number} = req.body;

    cardsService.validateType(type);
    cardsService.validateEmployee(id);
    
    res.sendStatus(201);
}