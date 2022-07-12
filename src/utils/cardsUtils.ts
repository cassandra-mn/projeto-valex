import dayjs from 'dayjs';
import Cryptr from 'cryptr';
const cryptr = new Cryptr('secret');

import * as cards from '../repositories/cardRepository.js';
import * as business from '../repositories/businessRepository.js';
import {viewTransactions} from '../services/viewTransactionsService.js';

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

export function validatePassword(card: any, password: string) {
    const isValid = cryptr.decrypt(card.password) === password;
    if (!isValid) throw {status: 422};
}

export function validateCvc(card: any, cvc: string) {
    const {securityCode} = card;
    const isValid = cryptr.decrypt(securityCode) === cvc;
    if (!isValid) throw {status: 422};
}

export function validateActivation(card: any) {
    const {password} = card;
    if (!password) throw {status: 422};
}

export function validateNotActivation(card: any) {
    const {password} = card;
    if (password) throw {status: 409};
}

export function validateLock(card: any) {
    const {isBlocked} = card;
    if (!isBlocked) throw {status: 422};
}

export function validateUnlock(card: any) {
    const {isBlocked} = card;
    if (isBlocked) throw {status: 422};
}

export async function validateBusinessRegistration(id: number) {
    const isRegistered = await business.findById(id);
    if (!isRegistered) throw {status: 404};
    return isRegistered;
}

export function validateTypeTransaction(card: any, business: any) {
    const isValid = card.type === business.type;
    if (!isValid) throw {status: 422};
}

export async function verifyBalance(cardId: number, amount: number) {
    const {balance} = await viewTransactions(cardId);
    if (balance < amount) throw {status: 422};
}