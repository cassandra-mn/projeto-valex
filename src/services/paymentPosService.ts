import * as paymentRepository from '../repositories/paymentRepository.js';
import * as cardService from '../utils/cardsUtils.js';

export async function paymentPos(cardId: number, password: string, businessId: number, amount: number) {
    if (amount <= 0) throw {status: 422};
    
    const card = await cardService.validateRegistration(cardId);
    cardService.validateActivation(card);
    cardService.validateExpiration(card);
    cardService.validateUnlock(card);
    cardService.validatePassword(card, password);

    const business = await cardService.validateBusinessRegistration(businessId);
    cardService.validateTypeTransaction(card, business);
    cardService.verifyBalance(cardId, amount);

    const payment = {
        cardId,
        businessId,
        amount
    }

    await paymentRepository.insert(payment);
    return payment;
}