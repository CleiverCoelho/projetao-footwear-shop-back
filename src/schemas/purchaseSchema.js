import joi from "joi";

export const purchaseSchema = joi.object({
    name: joi.string().required(),
    quantidade: joi.number().min(1).required(),
    user: joi.string().min(1).required()

});