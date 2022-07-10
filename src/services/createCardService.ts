import {faker} from '@faker-js/faker';
import dayjs from 'dayjs';
import Cryptr from 'cryptr';
const cryptr = new Cryptr('secret');

import * as card from '../repositories/cardRepository.js';
import * as employee from '../repositories/employeeRepository.js';

export function validateType(type: string) {
    const validTypes = ['groceries', 'restaurant', 'transport', 'education', 'health'];
    const isValid = validTypes.some(validType => type === validType);
    if (!isValid) throw {status: 422};
}

export async function validateEmployee(id: number) {
    const isRegistered = await employee.findById(id);
    if (!isRegistered) throw {status: 404};
}

export async function validateTypeByEmployee(type: any, id: number) {
    const haveCard = await card.findByTypeAndEmployeeId(type, id);
    if (haveCard) throw {status: 409};
}

export async function getCardData(type: any, id: number) {
    const cardNumber = faker.finance.creditCardNumber();
    
    const cvv = faker.finance.creditCardCVV();
    const encryptedCvv = cryptr.encrypt(cvv);
    
    const today = new Date();
    const expirationDate = dayjs(today).set('year', today.getFullYear() + 5).format('MM/YY');
    
    const {fullName} = await employee.findById(id);
    const cardHolderName = fullName.split(' ').map((name: string, index: number) => {
        if (index === 0 || index === fullName.split(' ').length - 1) return name;
        if (name.length > 2) return name.slice(0,1);
    }).toString().replace(/,/g, ' ').replace('  ', ' ');

    return {
        employeeId: id,
        number: cardNumber,
        cardholderName: cardHolderName,
        securityCode: encryptedCvv,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type
    }
}

export async function createCard(type: any, id: number) {
    validateType(type);
    await validateEmployee(id);
    await validateTypeByEmployee(type, id);
    
    const cardData = await getCardData(type, id);
    
    card.insert(cardData);
    return cardData;
}