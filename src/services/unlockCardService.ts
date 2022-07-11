import {validatePassword} from './blockCardService.js';
import * as cardService from './activateCardService.js';
import * as cards from '../repositories/cardRepository.js';

export function validateLock(card: any) {
    const {isBlocked} = card;
    if (!isBlocked) throw {status: 422};
}

export async function unlockCard(id: number, password: string) {
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
        isBlocked: false,
        type
    }

    await cards.update(id, cardData);
    return cardData;
} 