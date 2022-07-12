import Cryptr from 'cryptr';
const cryptr = new Cryptr('secret');

import passwordSchema from '../schemas/passwordSchema.js';
import * as cardService from '../utils/cardsUtils.js';
import * as cards from '../repositories/cardRepository.js';

export function validatePasswordFormat(password: string) {
    const {error} = passwordSchema.validate(password);
    if (error) throw {status: 422};
}

export async function activateCard(id: number, cvc: string, password: string) {
    const card = await cardService.validateRegistration(id);
    cardService.validateExpiration(card);
    cardService.validateNotActivation(card);
    cardService.validateCvc(card, cvc);
    validatePasswordFormat(password);

    const encryptedPassword = cryptr.encrypt(password);
    console.log(encryptedPassword)
    const {employeeId, number, cardholderName, securityCode, expirationDate, isVirtual, originalCardId, type} = card;

    const cardData = {
        id,
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: encryptedPassword,
        isVirtual,
        originalCardId,
        isBlocked: false,
        type
    }

    await cards.update(id, cardData);
    return cardData;
}