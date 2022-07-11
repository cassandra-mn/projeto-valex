import Cryptr from 'cryptr';
const cryptr = new Cryptr('secret');

import * as cardService from './activateCardService.js';
import * as cards from '../repositories/cardRepository.js';

export function validateLock(card: any) {
    const {isBlocked} = card;
    if (isBlocked) throw {status: 422};
}

export function validatePassword(card: any, password: string) {
    const isValid = cryptr.decrypt(card.password) === password;
    if (!isValid) throw {status: 422};
}

export async function blockCard(id: number, password: string) {
    const card = await cardService.validateRegistration(id);
    cardService.validateExpiration(card);
    validateLock(card);
    validatePassword(card, password);

    const {employeeId, number, cardholderName, securityCode, expirationDate, isVirtual, originalCardId, type} = card;

    const cardData = {
        id,
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: card.password,
        isVirtual,
        originalCardId,
        isBlocked: true,
        type
    }

    await cards.update(id, cardData);
    return cardData;
} 