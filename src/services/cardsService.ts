export async function validateType(type: string) {
    const validTypes = ['groceries', 'restaurants', 'transport', 'education', 'health'];
    const isValid = validTypes.some(validType => type === validType);
    if (!isValid) throw {status: 422};
}