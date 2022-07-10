import * as card from '../repositories/cardRepository.js';

export async function validateRegistration(id: number) {
    const isRegistered = await card.findById(id);
    if (!isRegistered) throw {status: 404}
}

export async function activateCard(id: number, cvc: string, password: string) {
    await validateRegistration(id);
}