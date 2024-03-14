import Joi from 'joi'

export const newPresriptionSchema = Joi.object({
    customerName: Joi.string().required(),
    message: Joi.string().uri().required(),
})

export const updatePresriptionSchema = Joi.object({
    customerName: Joi.string(),
    message: Joi.string(),
})