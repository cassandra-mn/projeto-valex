import joi from 'joi';

const passwordSchema = joi.string().pattern(new RegExp('^[0-9]{4}$')).required();

export default passwordSchema;