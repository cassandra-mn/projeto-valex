import {Request, Response, NextFunction} from 'express';

import * as companyRepository from '../repositories/companyRepository.js';

export async function apiKeyValidation(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header('x-api-key');
    if (!apiKey) throw {status: 401};

    const apiKeyIsValid = await companyRepository.findByApiKey(apiKey);
    if (!apiKeyIsValid) throw {status: 401}

    next();
}