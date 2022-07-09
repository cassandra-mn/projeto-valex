import {Request, Response} from 'express';

import * as cardsService from '../services/cardsService.js';

export async function createCard(req: Request, res: Response) {
    const {type}: {type: string} = req.body;

    cardsService.validateType(type);
    
    res.sendStatus(201);
}