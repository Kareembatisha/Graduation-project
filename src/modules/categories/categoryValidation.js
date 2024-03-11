import Joi from 'joi'

export const newCategorySchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
})

export const updateCategorySchema = Joi.object({
    name: Joi.string(),
    image: Joi.string().uri()

})