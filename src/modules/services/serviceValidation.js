import Joi from 'joi'

export const newServiceSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().uri().required(),
    price: Joi.number().min(0).required(),
})

export const updateServiceSchema = Joi.object({
    name: Joi.string(),
    image: Joi.string().uri(),
    price: Joi.number().min(0)

})