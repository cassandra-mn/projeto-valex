import {Request, Response} from 'express';

import * as cardsService from '../services/cardsService.js';

export async function createCard(req: Request, res: Response) {
    const {type, id}: {type: any, id: number} = req.body;

    cardsService.validateType(type);
    cardsService.validateEmployee(id);
    cardsService.validateTypeByEmployee(type, id);
    
    res.sendStatus(201);
}