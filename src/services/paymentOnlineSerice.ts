import * as paymentRepository from '../repositories/paymentRepository.js';
import * as cardRepository from '../repositories/cardRepository.js';
import * as cardService from '../utils/cardsUtils.js';
import {CardInformation} from '../controllers/cardsController.js';

export async function varifyCardInformation(cardInformation: CardInformation) {
    const {number, cardholderName, expirationDate} = cardInformation;
    const card = await cardRepository.findByCardDetails(number, cardholderName, expirationDate);
    if (!card) throw {status: 404};
    return card;
}

export async function paymentOnline(cardInformation: CardInformation, businessId: number, amount: number) {
    if (amount <= 0) throw {status: 422};
    
    const card = await varifyCardInformation(cardInformation);
    cardService.validateCvc(card, cardInformation.securityCode);
    await cardService.validateRegistration(card.id);
    cardService.validateExpiration(card);
    cardService.validateUnlock(card);
    
    const business = await cardService.validateBusinessRegistration(businessId);
    cardService.validateTypeTransaction(card, business);
    await cardService.verifyBalance(card.id, amount);

    const payment = {
        cardId: card.id,
        businessId,
        amount
    }

    await paymentRepository.insert(payment);
    return payment;
}