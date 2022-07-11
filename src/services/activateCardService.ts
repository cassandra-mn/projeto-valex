import dayjs from 'dayjs';
import Cryptr from 'cryptr';
const cryptr = new Cryptr('secret');

import * as cards from '../repositories/cardRepository.js';
import passwordSchema from '../schemas/passwordSchema.js';

export async function validateRegistration(id: number) {
    const card = await cards.findById(id);
    if (!card) throw {status: 404};
    return card;
}

export function validateExpiration(card: any) {
    const {expirationDate} = card;
    const today = dayjs(new Date()).format('MM/YY');
    const isExpired = dayjs(expirationDate).isBefore(dayjs(today));
    if (isExpired) throw {status: 422};
}

export function validateActivation(card: any) {
    const {password} = card;
    if (password) throw {status: 409};
}

export function validateCvc(card: any, cvc: string) {
    const {securityCode} = card;
    console.log(cryptr.decrypt(securityCode))
    const isValid = cryptr.decrypt(securityCode) === cvc;
    if (!isValid) throw {status: 422};
}

export function validatePassword(password: string) {
    const {error} = passwordSchema.validate(password);
    if (error) throw {status: 422};
}

export async function activateCard(id: number, cvc: string, password: string) {
    const card = await validateRegistration(id);
    validateExpiration(card);
    validateActivation(card);
    validateCvc(card, cvc);
    validatePassword(password);

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