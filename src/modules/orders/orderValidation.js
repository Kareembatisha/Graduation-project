import Joi from 'joi';

const itemSchema = Joi.object({
    itemId: Joi.string().required(),
    quantity: Joi.number().required()
});

export const newOrderSchema = Joi.object({
    customerId: Joi.string().required(),
    items: Joi.array().items(itemSchema.required()),
    total: Joi.number().forbidden(),
    status: Joi.string().valid("pending", "approved", "denied").default("pending").forbidden(),
});

export const updateOrderSchema = Joi.object({
    customerId: Joi.string().forbidden(),
    items: Joi.array().items(itemSchema.required()),
    total: Joi.number().forbidden(),
    status: Joi.string().valid("pending", "approved", "denied"),
});
