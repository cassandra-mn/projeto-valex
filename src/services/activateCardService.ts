import dayjs from 'dayjs';
import Cryptr from 'cryptr';
const cryptr = new Cryptr('secret');

import * as cards from '../repositories/cardRepository.js';

export async function validateRegistration(id: number) {
    const card = await cards.findById(id);
    if (!card) throw {status: 404};
    return card;
}

export async function validateExpiration(card: any) {
    const {expirationDate} = card;
    const today = dayjs(new Date()).format('MM/YY');
    const isExpired = dayjs(expirationDate).isBefore(dayjs(today));
    if (isExpired) throw {status: 422};
}

export async function validateActivation(card: any) {
    const {password} = card;
    if (password) throw {status: 409};
}

export async function validateCvc(card: any, cvc: string) {
    const {securityCode} = card;
    const isValid = cryptr.decrypt(securityCode) === cvc;
    if (!isValid) throw {status: 422};
}

export async function activateCard(id: number, cvc: string, password: string) {
    const card = await validateRegistration(id);
    await validateExpiration(card);
    await validateActivation(card);
    await validateCvc(card, cvc);
}