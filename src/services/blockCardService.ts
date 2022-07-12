import * as cardService from '../utils/cardsUtils.js';
import * as cards from '../repositories/cardRepository.js';

export async function blockCard(id: number, password: string) {
    const card = await cardService.validateRegistration(id);
    cardService.validateExpiration(card);
    cardService.validateUnlock(card);
    cardService.validatePassword(card, password);

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