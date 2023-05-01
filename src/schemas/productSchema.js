import joi from "joi";

export const produtocomnome = joi.object({
    busca: joi.string().required()
});

export const produtocommarca = joi.object(
    {
        brand: joi.string().required().valid('brand1', 'brand2', 'brand3')
    }
)