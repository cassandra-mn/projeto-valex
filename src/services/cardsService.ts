import * as employee from '../repositories/employeeRepository.js';

export async function validateType(type: string) {
    const validTypes = ['groceries', 'restaurants', 'transport', 'education', 'health'];
    const isValid = validTypes.some(validType => type === validType);
    if (!isValid) throw {status: 422};
}

export async function validateEmployee(id: number) {
    const isRegistered = employee.findById(id);
    if (!isRegistered) throw {status: 422};
}