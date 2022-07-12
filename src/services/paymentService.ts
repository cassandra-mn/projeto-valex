import * as businessRepository from '../repositories/businessRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as cardService from '../utils/cardsUtils.js';
import {viewTransactions} from './viewTransactionsService.js';

export async function validateBusinessRegistration(id: number) {
    const business = await businessRepository.findById(id);
    if (!business) throw {status: 404};
    return business;
}

export function validateType(card: any, business: any) {
    const isValid = card.type === business.type;
    if (!isValid) throw {status: 422};
}

export async function payment(cardId: number, password: string, businessId: number, amount: number) {
    if (amount <= 0) throw {status: 422};
    
    const card = await cardService.validateRegistration(cardId);
    cardService.validateActivation(card);
    cardService.validateExpiration(card);
    cardService.validateUnlock(card);
    cardService.validatePassword(card, password);

    const business = await validateBusinessRegistration(businessId);
    validateType(card, business);
    
    const {balance} = await viewTransactions(cardId);
    if (balance < amount) throw {status: 422};

    const payment = {
        cardId,
        businessId,
        amount
    }

    await paymentRepository.insert(payment);
    return payment;
}