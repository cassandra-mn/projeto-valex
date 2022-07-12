import * as payment from '../repositories/paymentRepository.js';
import * as recharge from '../repositories/rechargeRepository.js';
import * as cardService from '../utils/cardsUtils.js';

export async function viewTransactions(id: number) {
    cardService.validateRegistration(id);

    const transactions = await payment.findByCardId(id);
    const recharges = await recharge.findByCardId(id);

    const balanceTransactions = transactions.reduce((count: number, transaction: any) => count + transaction.amount, 0);
    const balanceRecharges = recharges.reduce((count: number, recharge: any) => count + recharge.amount, 0);

    const balance = balanceRecharges - balanceTransactions;

    const response = {
        balance,
        transactions,
        recharges
    }
    
    return response;
}