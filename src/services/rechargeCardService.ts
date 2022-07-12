import * as cardService from '../utils/cardsUtils.js';
import * as recharge from '../repositories/rechargeRepository.js';

export async function rechargeCard(id: number, amount: number) {
    if (amount <= 0) throw {status: 422};

    const card = await cardService.validateRegistration(id);
    cardService.validateActivation(card);
    cardService.validateExpiration(card); 
    
    const rechargeData = {
        cardId: id, 
        amount
    };

    await recharge.insert(rechargeData);
    return rechargeData;
} 