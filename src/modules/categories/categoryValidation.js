import Joi from 'joi'

export const newCategorySchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
})

export const updateCategorySchema = Joi.object({
    name: Joi.forbidden(),//متحطهمش فى الموديل بتاع ال update
    image: Joi.string()

})