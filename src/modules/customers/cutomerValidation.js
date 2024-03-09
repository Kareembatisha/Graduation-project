import Joi from 'joi'

export const newCustomerSchema = Joi.object({
    name:Joi.string().min(3).max(20).required(),
    email:Joi.string().required(),
    password:Joi.string().min(8).max(20).required(),
    address: Joi.object({
        city: Joi.string().valid("Cairo","Giza").required(),
        street: Joi.string().required(),
        buildingNumber: Joi.string().required(),
        floor: Joi.string(),
        apartmentNumber: Joi.string()
    }).required(),
    phones:Joi.array().items(Joi.string().regex(/^01[0125][0-9]{8}$/)).required(),
    TOKEN: Joi.string().forbidden(),  
})

export const updateCustomerSchema = Joi.object({
    name:Joi.string(),
    email:Joi.string().forbidden(),//متحطهمش فى الموديل بتاع ال update
    password:Joi.string().min(8).max(20).required(),
    newPassword:Joi.string().min(8).max(20),
    address: Joi.object({
        city: Joi.string().valid("Cairo","Giza").required(),
        street: Joi.string().required(),
        buildingNumber: Joi.string().required(),
        floor: Joi.string(),
        apartmentNumber: Joi.string()
    }),
    phones:Joi.array().items(Joi.string().regex(/^01[0125][0-9]{8}$/)),
    TOKEN: Joi.string().forbidden(),  

})