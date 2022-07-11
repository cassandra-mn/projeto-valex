import * as cardService from './activateCardService.js';
import * as recharge from '../repositories/rechargeRepository.js';

export function validateActivation(card: any) {
    const {password} = card;
    if (!password) throw {status: 422};
}

export async function rechargeCard(id: number, amount: number) {
    if (amount <= 0) throw {status: 422};

    const card = await cardService.validateRegistration(id);
    validateActivation(card);
    cardService.validateExpiration(card); 
    
    const rechargeData = {
        cardId: id, 
        amount
    };

    await recharge.insert(rechargeData);
    return rechargeData;
} 