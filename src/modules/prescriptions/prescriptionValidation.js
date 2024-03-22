import Joi from 'joi'

export const newPresriptionSchema = Joi.object({
    customerName: Joi.string().required(),
    message: Joi.string().uri().required(),
    status: Joi.string().valid("pending", "answered").default("pending").forbidden(),
})

export const updatePresriptionSchema = Joi.object({
    customerName: Joi.string(),
    message: Joi.string(),
    status: Joi.string().valid("pending", "answered").forbidden(),
})