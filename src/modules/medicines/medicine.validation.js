import Joi from 'joi'

export const newMedicineSchema = Joi.object({
    name: Joi.string().required(),
    concentration: Joi.number().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().uri().required(),
    mfgDate: Joi.date().required(),
    expDate: Joi.date().required(),
    company: Joi.string().required(),
    activeSubstance: Joi.string().required(),    
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
})

export const updateMedicineSchema = Joi.object({
    name: Joi.string(),
    concentration: Joi.forbidden(),//متحطهمش فى الموديل بتاع ال update
    price: Joi.number().min(0),
    image: Joi.string().uri(),
    mfgDate: Joi.date(),
    expDate: Joi.date(),
    company: Joi.string(),
    activeSubstance: Joi.forbidden(),//متحطهمش فى الموديل بتاع ال update
    category: Joi.forbidden(),//متحطهمش فى الموديل بتاع ال update
    stock: Joi.number().integer().min(0),
})